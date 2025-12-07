import ts from 'typescript';
import { UC_DEF_SUFFIX, UC_LIFECYCLE_PROP_NAME, UC_LIFECYCLE_SERVER_PROP_NAME, } from '../../convention.js';
export function transform(code, fileName) {
    const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.ESNext);
    const result = ts.transform(sourceFile, [transformer()]);
    const transformed = result.transformed[0];
    if (!transformed) {
        throw new Error(`Could not transform file : ${fileName}`);
    }
    const printer = ts.createPrinter();
    return printer.printFile(transformed);
}
function transformer() {
    return (context) => {
        return (sourceFile) => {
            const { factory } = context;
            function visit(node) {
                if (!isUCDDeclaration(sourceFile, node)) {
                    return ts.visitEachChild(node, visit, context);
                }
                const rootObj = node.initializer;
                const lifecycle = findLifecycleProp(sourceFile, rootObj);
                if (!lifecycle) {
                    return ts.visitEachChild(node, visit, context);
                }
                const lifecycleObj = lifecycle.initializer;
                const server = findServerProp(sourceFile, lifecycleObj);
                if (!server) {
                    return ts.visitEachChild(node, visit, context);
                }
                // Nodes are immutable so we need to re-create the whole tree
                const newServer = factory.updatePropertyAssignment(server, server.name, factory.createTrue());
                const newLifecycleObj = factory.updateObjectLiteralExpression(lifecycleObj, lifecycleObj.properties.map((p) => p === server ? newServer : p));
                const newLifecycle = factory.updatePropertyAssignment(lifecycle, lifecycle.name, newLifecycleObj);
                const newRootObj = factory.updateObjectLiteralExpression(rootObj, rootObj.properties.map((p) => p === lifecycle ? newLifecycle : p));
                return factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, newRootObj);
            }
            return ts.visitNode(sourceFile, visit);
        };
    };
}
function isUCDDeclaration(sourceFile, node) {
    if (!ts.isVariableDeclaration(node)) {
        return false;
    }
    const name = node.name.getText(sourceFile);
    return (name.endsWith(UC_DEF_SUFFIX) &&
        !!node.initializer &&
        ts.isObjectLiteralExpression(node.initializer));
}
function findLifecycleProp(sourceFile, rootObj) {
    return rootObj.properties.find((p) => ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.getText(sourceFile) === UC_LIFECYCLE_PROP_NAME &&
        ts.isObjectLiteralExpression(p.initializer));
}
function findServerProp(sourceFile, lifecycleObj) {
    return lifecycleObj.properties.find((p) => ts.isPropertyAssignment(p) &&
        ts.isIdentifier(p.name) &&
        p.name.getText(sourceFile) === UC_LIFECYCLE_SERVER_PROP_NAME);
}
