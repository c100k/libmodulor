var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import typescript, { isClassDeclaration, isObjectLiteralExpression, isPropertyAssignment, } from 'typescript';
// To avoid the following error when used in a consumer :
// SyntaxError: Named export 'ModuleKind' not found. The requested module 'typescript' is a CommonJS module, which may not support all module.exports as named exports.
// CommonJS modules can always be imported via the default export
const { ModuleKind, ModuleResolutionKind, ScriptTarget, createProgram, flattenDiagnosticMessageText, forEachChild, getPreEmitDiagnostics, isIdentifier, isImportDeclaration, isPropertySignature, isStringLiteral, isTypeReferenceNode, isVariableStatement, } = typescript;
import { UC_MAIN_CLIENT_SUFFIX, UC_MAIN_SERVER_SUFFIX, UC_MAIN_STEP_PREFIX_REGULAR, UC_MAIN_SUFFIX, UC_POLICY_SUFFIX, } from '../../convention.js';
const ERR_TS_CONFIG_INVALID = (configFileName) => `The root ${configFileName} could not be opened or parsed`;
const ERR_TS_CONFIG_COMP_OPTS = (configFileName) => `The root ${configFileName} must contain compilerOptions`;
const ERR_UCD_TOO_MANY_GENERICS = () => 'There are more generics than expected in the UCD';
let TypeScriptLibUCDefASTParser = class TypeScriptLibUCDefASTParser {
    fsManager;
    logger;
    compilerOptions;
    opts;
    program;
    typeChecker;
    constructor(fsManager, logger) {
        this.fsManager = fsManager;
        this.logger = logger;
    }
    async init(opts, ucdsPaths) {
        this.opts = opts;
        this.logger.trace('TypeScriptLibUCDefASTParser Initializing compiler options');
        await this.initCompilerOptions();
        this.logger.trace('TypeScriptLibUCDefASTParser Creating program');
        this.program = createProgram(ucdsPaths, this.compilerOptions);
        this.logger.trace('TypeScriptLibUCDefASTParser Creating type checker');
        this.typeChecker = this.program.getTypeChecker();
    }
    async processFile(path, onImport, onVariable, onInputType, onOPIType, onMainStep, onPolicy, onMetadata) {
        const srcFile = this.program.getSourceFile(path);
        if (!srcFile) {
            return;
        }
        forEachChild(srcFile, (node) => {
            if (isImportDeclaration(node)) {
                forEachChild(node, (node1) => {
                    if (isStringLiteral(node1)) {
                        onImport(node1.text);
                    }
                });
            }
            if (isVariableStatement(node)) {
                this.processVariable(node, onVariable, onInputType, onOPIType, onMainStep, onPolicy, onMetadata);
            }
        });
    }
    async transpile() {
        const diagnostics = getPreEmitDiagnostics(this.program);
        if (diagnostics.length === 0) {
            return;
        }
        const errors = diagnostics.map((d) => flattenDiagnosticMessageText(d.messageText, '\n'));
        throw new Error(errors[0]);
    }
    async initCompilerOptions() {
        const { ts: { configFileName, module, moduleResolution, noCheck, skipLibCheck, target, }, } = this.opts.source;
        const tsConfigPath = this.fsManager.path(configFileName);
        let tsConfig;
        try {
            tsConfig = JSON.parse(await this.fsManager.cat(tsConfigPath));
        }
        catch (_err) {
            throw new Error(ERR_TS_CONFIG_INVALID(configFileName));
        }
        const compilerOptionsBase = tsConfig.compilerOptions;
        if (!compilerOptionsBase) {
            throw new Error(ERR_TS_CONFIG_COMP_OPTS(configFileName));
        }
        this.compilerOptions = {
            ...compilerOptionsBase,
            module: ModuleKind[(compilerOptionsBase.module ??
                module)],
            moduleResolution: ModuleResolutionKind[(compilerOptionsBase.moduleResolution ??
                moduleResolution)],
            noCheck: compilerOptionsBase.noCheck ?? noCheck,
            skipLibCheck: compilerOptionsBase.skipLibCheck ?? skipLibCheck,
            target: ScriptTarget[(compilerOptionsBase.target ??
                target)],
        };
        this.compilerOptions.incremental = false; // Otherwise it triggers the following error : Option '--incremental' can only be specified using tsconfig, emitting to single file or when option '--tsBuildInfoFile' is specified.
        // @ts-ignore
        this.compilerOptions.jsx = undefined; // Otherwise it triggers the following error since TS 5.5 : jsx is a string value; tsconfig JSON must be parsed with parseJsonSourceFileConfigFileContent or getParsedCommandLineOfConfigFile before passing to createProgram
        // @ts-ignore
        this.compilerOptions.lib = undefined; // Otherwise it triggers errors saying it does not find them
    }
    getTypeFields(node) {
        const type = this.typeChecker.getTypeAtLocation(node);
        const fields = type.getProperties().map((p) => {
            const field = {
                err: null,
                value: p.getName(),
            };
            const declarations = p.getDeclarations();
            if (declarations) {
                const [first] = declarations;
                if (first && isPropertySignature(first)) {
                    field.value = first
                        .getText()
                        .replaceAll('\n', '')
                        .replaceAll(';', '');
                }
            }
            return field;
        });
        return fields;
    }
    processConstDeclaration(node, onMainStep, onPolicy, onMetadata) {
        // TODO : Improve this whole pattern by making it more robust
        // I think there is a risk of it to break in some cases (e.g. if there are other properties named main, policy, etc.)
        const metadataPropertyName = 'metadata';
        const nodes = [];
        const populateNodes = (node1) => {
            // "main: SendClientMain" => "main", ":", "SendClientMain" => 3
            if (isPropertyAssignment(node1) && node1.getChildCount() === 3) {
                const propertyName = node1.getChildAt(0).getText();
                if (propertyName === UC_MAIN_SUFFIX.toLocaleLowerCase() ||
                    propertyName === UC_POLICY_SUFFIX.toLocaleLowerCase() ||
                    propertyName === metadataPropertyName) {
                    nodes.push(node1);
                }
            }
            node1.forEachChild(populateNodes);
        };
        populateNodes(node);
        for (const node1 of nodes) {
            const text = node1.getText();
            if (text.endsWith(UC_MAIN_CLIENT_SUFFIX)) {
                this.processLifecycleMain('client', node1, onMainStep);
            }
            else if (text.endsWith(UC_MAIN_SERVER_SUFFIX)) {
                this.processLifecycleMain('server', node1, onMainStep);
            }
            else if (text.endsWith(UC_POLICY_SUFFIX)) {
                const parent = node1.parent.getText(); // { main: X(Client|Server)Main, policy: XUCPolicy }
                if (parent.includes(UC_MAIN_CLIENT_SUFFIX)) {
                    this.processLifecyclePolicy('client', node1, onPolicy);
                }
                else if (parent.includes(UC_MAIN_SERVER_SUFFIX)) {
                    this.processLifecyclePolicy('server', node1, onPolicy);
                }
            }
            else if (text.startsWith(metadataPropertyName)) {
                this.processMetadata(node1, onMetadata);
            }
        }
    }
    processConstType(node, onInputType, onOPIType) {
        let idx = 0;
        forEachChild(node, (node2) => {
            if (isTypeReferenceNode(node2)) {
                forEachChild(node2, (node3) => {
                    if (isIdentifier(node3)) {
                        const typeName = node3.getText();
                        const fields = this.getTypeFields(node3);
                        if (idx === 0) {
                            onInputType(typeName, fields);
                        }
                        else if (idx === 1 || idx === 2) {
                            onOPIType(typeName, fields, (idx - 1));
                        }
                        else {
                            throw new Error(ERR_UCD_TOO_MANY_GENERICS());
                        }
                    }
                });
                idx += 1;
            }
        });
    }
    processLifecycleMain(lifecycle, node, onMainStep) {
        const type = this.typeChecker.getTypeAtLocation(node.getChildAt(2));
        const classDeclaration = type
            .getSymbol()
            ?.getDeclarations()
            ?.find((d) => isClassDeclaration(d));
        if (!classDeclaration) {
            return;
        }
        const lines = classDeclaration.getFullText().split('\n');
        for (const l of lines) {
            const trimmed = l.trim();
            if (!trimmed.startsWith(UC_MAIN_STEP_PREFIX_REGULAR)) {
                continue;
            }
            onMainStep(lifecycle, trimmed);
        }
    }
    processLifecyclePolicy(lifecycle, node, onPolicy) {
        const node1 = node.getChildAt(2);
        onPolicy(lifecycle, node1.getText());
    }
    processMetadata(node, onMetadata) {
        const metadataLike = {};
        const type = this.typeChecker.getTypeAtLocation(node);
        for (const p of type.getProperties()) {
            const declarations = p.getDeclarations();
            if (!declarations) {
                continue;
            }
            for (const d of declarations) {
                const k = d.getChildAt(0).getText();
                const v = d.getChildAt(2).getText();
                let value = v;
                if (value === 'true' || value === 'false') {
                    value = Boolean(value);
                }
                else {
                    value = value.substring(1, v.length - 1); // To remove the single quotes
                }
                metadataLike[k] = value;
            }
        }
        onMetadata(metadataLike);
    }
    processVariable(node, onVariable, onInputType, onOPIType, onMainStep, onPolicy, onMetadata) {
        const { declarationList: { declarations }, } = node;
        const [firstDeclaration] = declarations;
        if (!firstDeclaration) {
            return;
        }
        forEachChild(firstDeclaration, (node1) => {
            if (isIdentifier(node1)) {
                onVariable(node1.getText());
            }
            if (isTypeReferenceNode(node1)) {
                this.processConstType(node1, onInputType, onOPIType);
            }
            if (isObjectLiteralExpression(node1)) {
                this.processConstDeclaration(node1, onMainStep, onPolicy, onMetadata);
            }
        });
    }
};
TypeScriptLibUCDefASTParser = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('Logger')),
    __metadata("design:paramtypes", [Object, Object])
], TypeScriptLibUCDefASTParser);
export { TypeScriptLibUCDefASTParser };
