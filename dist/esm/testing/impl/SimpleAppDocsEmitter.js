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
import { APP_DOCS_FILE_NAME, UC_INPUT_FIELD_PATTERN, UC_MAIN_STEP_PREFIX_REGULAR, } from '../../convention.js';
import { OUTPUT_ITEM_FIELDS, } from '../UCDefASTParser.js';
let SimpleAppDocsEmitter = class SimpleAppDocsEmitter {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, ucDefSourcesCheckerOutput, }) {
        const outPath = this.fsManager.path(appPath, APP_DOCS_FILE_NAME);
        const tpl = template(OUTPUT_ITEM_FIELDS, ucDefSourcesCheckerOutput.items);
        await this.fsManager.touch(outPath, tpl);
        return {
            outPath,
        };
    }
};
SimpleAppDocsEmitter = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], SimpleAppDocsEmitter);
export { SimpleAppDocsEmitter };
const template = (cols, items) => `<!---
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
-->

# App

## Use Cases

${items
    .map((item) => `### ${item.metadataName?.value}

${diagram(item)}`)
    .join('\n\n')}

## Technical Summary

|#|${cols.map((c) => c).join('|')}|
|---|${cols.map((_c) => '---').join('|')}|
${items.map((item, idx) => ['', idx + 1, ...cols.map((c) => fmtTechSummaryField(item[c])), ''].join('|')).join('\n')}
`;
const CHECK_POLICY = '🔐 Check policy';
const CHECK_POLICY_COND = 'when any validation fails';
const CHECK_POLICY_COND_ACTION = 'show failure';
const CLIENT_CONFIRM_N_COND = 'when does not confirm';
const CLIENT_CONFIRM_N_COND_ACTION = 'stop everything';
const CLIENT_CONFIRM_Q = '❓ Sure';
const CLIENT_CONFIRM_Y = 'Yes';
const FILL = '✏️ Fill';
const LB = '<br/>';
const OK = '👍 OK';
const SEND = '📤 Send';
const SUBMIT = '↩️ Submit';
const TRIGGER = '⤴️ Trigger';
function diagram(item) {
    const client = 'Client';
    const server = 'Server';
    const user = 'User';
    const lines = [`actor ${user}`];
    const { ioIFields, ioOPI0Fields, ioOPI1Fields, lifecycleClientPolicy, lifecycleClientSteps, lifecycleServerPolicy, lifecycleServerSteps, metadataSensitive, } = item;
    let req = TRIGGER;
    if (ioIFields && ioIFields.length > 0) {
        req = `${FILL}${LB}${diagramUCFields(item.ioIFields)}`;
    }
    lines.push(`${user}->>+${client}: ${req}`);
    lines.push(`${user}->>${client}: ${SUBMIT}`);
    if (metadataSensitive?.value) {
        lines.push(...diagramUCClientConfirm(client, user));
    }
    if (lifecycleClientPolicy) {
        lines.push(...diagramUCPolicy(client, user, lifecycleClientPolicy));
    }
    if (lifecycleClientSteps) {
        lines.push(...diagramUCMainSteps(client, lifecycleClientSteps));
    }
    const hasServer = item.lifecycleServerPolicy?.value;
    if (hasServer) {
        req = SEND;
        if (ioIFields && ioIFields.length > 0) {
            req = `${req}${LB}${diagramUCFields(item.ioIFields)}`;
        }
        lines.push(`${client}->>+${server}: ${req}`);
        if (lifecycleServerPolicy) {
            lines.push(...diagramUCPolicy(server, user, lifecycleServerPolicy));
        }
        if (lifecycleServerSteps) {
            lines.push(...diagramUCMainSteps(server, lifecycleServerSteps));
        }
        let res = '';
        if (ioOPI0Fields && ioOPI0Fields.length > 0) {
            res += `${res}${LB}${diagramUCFields(item.ioOPI0Fields)}`;
        }
        if (ioOPI1Fields && ioOPI1Fields?.length > 0) {
            res += `${res}${LB}${diagramUCFields(item.ioOPI1Fields)}`;
        }
        lines.push(`${server}-->>-${client}: ${OK}${res}`);
    }
    lines.push(`${client}-->>-${user}: ${OK}`);
    return `\`\`\`mermaid
sequenceDiagram
    ${lines.join('\n    ')}
\`\`\``;
}
function diagramUCClientConfirm(participant, caller) {
    return [
        `${participant}->>${caller}: ${CLIENT_CONFIRM_Q}`,
        `${caller}->>${participant}: ${CLIENT_CONFIRM_Y}`,
        `break ${CLIENT_CONFIRM_N_COND}`,
        `    ${participant}-->${caller}: ${CLIENT_CONFIRM_N_COND_ACTION}`,
        'end',
    ];
}
function diagramUCFields(fields) {
    return (fields
        ?.map((f) => f.value.replace(new RegExp(UC_INPUT_FIELD_PATTERN.slice(1)), '$1'))
        .join(LB) || '');
}
function diagramUCMainSteps(participant, field) {
    return field.map((f) => `${participant}->>${participant}: ${f.value.replace(UC_MAIN_STEP_PREFIX_REGULAR, '').trim()}`);
}
function diagramUCPolicy(participant, caller, lifecyclePolicyField) {
    return [
        `${participant}->>${participant}: ${CHECK_POLICY} "${lifecyclePolicyField.value}"`,
        `break ${CHECK_POLICY_COND}`,
        `    ${participant}-->${caller}: ${CHECK_POLICY_COND_ACTION}`,
        'end',
    ];
}
function fmtTechSummaryField(field) {
    if (!field) {
        return '';
    }
    const values = Array.isArray(field) ? field : [field];
    return values.map(fmtTechSummaryFieldVal).join('<br>');
}
function fmtTechSummaryFieldVal(field) {
    const { err, value } = field;
    let res = value;
    if (err) {
        res += `❌ ${err}`;
    }
    res = res.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
    res = res.replaceAll('|', '\\|');
    return res;
}
