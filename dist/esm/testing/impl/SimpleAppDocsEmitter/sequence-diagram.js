import { UC_MAIN_STEP_PREFIX_REGULAR } from '../../../convention.js';
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
export function ucSequenceDiagram(item) {
    // Debugger : https://mermaid.live/edit
    // Messages : https://mermaid.js.org/syntax/sequenceDiagram.html#messages
    const client = 'Client';
    const server = 'Server';
    const user = 'User';
    const lines = [`actor ${user}`];
    const { ioIFields, ioOPI0Fields, ioOPI1Fields, lifecycleClientPolicy, lifecycleClientSteps, lifecycleServerPolicy, lifecycleServerSteps, metadataSensitive, } = item;
    let req = TRIGGER;
    if (ioIFields && ioIFields.length > 0) {
        // TODO : Include only fields to fill manually ?
        // Not sure though, as for CLI for example (i.e. noContext), one needs to provide all of them
        req = `${FILL}${LB}${fields(item.ioIFields)}`;
    }
    lines.push(`${user}->>+${client}: ${req}`);
    lines.push(`${user}->>${client}: ${SUBMIT}`);
    if (metadataSensitive?.value) {
        lines.push(...clientConfirm(client, user));
    }
    if (lifecycleClientPolicy) {
        lines.push(...policy(client, user, lifecycleClientPolicy));
    }
    if (lifecycleClientSteps) {
        lines.push(...mainSteps(client, lifecycleClientSteps));
    }
    // This is an approximation. Might need to improve it.
    const hasServer = item.lifecycleServerPolicy?.value;
    if (hasServer) {
        req = SEND;
        if (ioIFields && ioIFields.length > 0) {
            req = `${req}${LB}${fields(item.ioIFields)}`;
        }
        lines.push(`${client}->>+${server}: ${req}`);
        if (lifecycleServerPolicy) {
            lines.push(...policy(server, user, lifecycleServerPolicy));
        }
        if (lifecycleServerSteps) {
            lines.push(...mainSteps(server, lifecycleServerSteps));
        }
        let res = '';
        if (ioOPI0Fields && ioOPI0Fields.length > 0) {
            res += `${res}${LB}${fields(item.ioOPI0Fields)}`;
        }
        if (ioOPI1Fields && ioOPI1Fields?.length > 0) {
            res += `${res}${LB}${fields(item.ioOPI1Fields)}`;
        }
        lines.push(`${server}-->>-${client}: ${OK}${res}`);
    }
    lines.push(`${client}-->>-${user}: ${OK}`);
    return `\`\`\`mermaid
sequenceDiagram
    ${lines.join('\n    ')}
\`\`\``;
}
function clientConfirm(participant, caller) {
    return [
        `${participant}->>${caller}: ${CLIENT_CONFIRM_Q}`,
        `${caller}->>${participant}: ${CLIENT_CONFIRM_Y}`,
        `break ${CLIENT_CONFIRM_N_COND}`,
        `    ${participant}-->${caller}: ${CLIENT_CONFIRM_N_COND_ACTION}`,
        'end',
    ];
}
function fields(fields) {
    return (fields?.map((f) => `${f.value.name}: ${f.value.dataType}`).join(LB) ||
        '');
}
function mainSteps(participant, field) {
    return field.map((f) => `${participant}->>${participant}: ${f.value.replace(UC_MAIN_STEP_PREFIX_REGULAR, '').trim()}`);
}
function policy(participant, caller, lifecyclePolicyField) {
    return [
        `${participant}->>${participant}: ${CHECK_POLICY} "${lifecyclePolicyField.value}"`,
        `break ${CHECK_POLICY_COND}`,
        `    ${participant}-->${caller}: ${CHECK_POLICY_COND_ACTION}`,
        'end',
    ];
}
