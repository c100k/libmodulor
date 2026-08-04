import { Namespace, Type, } from 'protobufjs';
import { UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS } from '../../../uc/index.js';
const INDENT_L1 = ' '.repeat(4);
const SYNTAX = 'proto3';
const ERR_UNSUPPORTED_TYPE = (name) => `The type ${name} is not supported yet`;
export function protoFile(root, services) {
    const lines = [
        `syntax = "${SYNTAX}";`,
        `package ${UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS};`,
    ];
    for (const [name, { service: s }] of services) {
        lines.push(...service(name, s));
    }
    for (const obj of root.nestedArray) {
        if (obj instanceof Type) {
            lines.push(...message(obj));
        }
        else if (obj instanceof Namespace) {
            // Ignore
        }
        else {
            throw new Error(ERR_UNSUPPORTED_TYPE(obj.name));
        }
    }
    return lines.join('\n');
}
function message(message) {
    const { fieldsArray, name } = message;
    const parts = [`message ${name} {`];
    for (const field of fieldsArray) {
        parts.push(`${INDENT_L1}${messageField(field).join(' ')}`);
    }
    parts.push('}');
    return parts;
}
function messageField(field) {
    const parts = [];
    const { id, name, optional, repeated, required, type } = field;
    if (repeated) {
        parts.push('repeated');
    }
    else if (optional) {
        parts.push('optional');
    }
    else if (required) {
        parts.push('required');
    }
    parts.push(type, name, '=', `${id.toString()};`);
    return parts;
}
function service(name, service) {
    const { methodsArray } = service;
    const parts = [`service ${name} {`];
    for (const method of methodsArray) {
        parts.push(`${INDENT_L1}${serviceMethod(method).join(' ')};`);
    }
    parts.push('}');
    return parts;
}
function serviceMethod(method) {
    return [
        'rpc',
        method.name,
        `(${serviceReq(method).join(' ')})`,
        'returns',
        `(${serviceRes(method).join(' ')})`,
    ];
}
function serviceReq(method) {
    const parts = [];
    const { requestStream, requestType } = method;
    if (requestStream) {
        parts.push('stream');
    }
    parts.push(requestType);
    return parts;
}
function serviceRes(method) {
    const parts = [];
    const { responseStream, responseType } = method;
    if (responseStream) {
        parts.push('stream');
    }
    parts.push(responseType);
    return parts;
}
