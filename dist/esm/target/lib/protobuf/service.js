import { Field, Method, Service } from 'protobufjs';
import { UC_OPI0_SUFFIX, UC_OPI1_SUFFIX, UC_OUTPUT_PART0_SUFFIX, UC_OUTPUT_PART1_SUFFIX, } from '../../../convention.js';
import { UC_OUTPUT_PARTS_FIELD_1, } from '../../../uc/index.js';
import { ucEmptyType } from './field.js';
import { ucInputType } from './input.js';
import { ucOPIType, ucOutputPartPaginationType, ucOutputPartsType, ucOutputPartType, ucOutputType, } from './output.js';
const METHOD_TYPE = 'rpc';
export function service(appName) {
    return new Service(appName);
}
export function serviceMethod(ucd, serviceTypes, contract) {
    const { input, output } = serviceTypes;
    const [requestStream, responseStream] = serviceMethodStream(ucd);
    return new Method(ucd.metadata.name, METHOD_TYPE, input.name, output.name, requestStream, responseStream, {
        contract,
    });
}
export function serviceMethodStream(ucd) {
    const transportType = ucd.ext?.http?.transportType ?? 'standard';
    switch (transportType) {
        case 'standard':
            return [false, false];
        case 'stream':
            return [false, true];
        default:
            transportType;
            return [false, false];
    }
}
export function serviceTypes(ucd) {
    const emptyType = ucEmptyType();
    const res = {
        input: ucInputType(ucd) ?? emptyType,
        op0: null,
        op1: null,
        opi0: null,
        opi1: null,
        output: emptyType,
        outputParts: null,
    };
    const { metadata: { name }, io: { o }, } = ucd;
    const part0 = o?.parts?._0;
    if (!part0) {
        return res;
    }
    const pagination = ucOutputPartPaginationType();
    res.opi0 = ucOPIType(`${name}${UC_OPI0_SUFFIX}`, part0);
    res.op0 = ucOutputPartType(`${name}${UC_OUTPUT_PART0_SUFFIX}`, res.opi0, pagination);
    res.outputParts = ucOutputPartsType(name, res.op0);
    res.output = ucOutputType(name, res.outputParts);
    const part1 = o.parts?._1;
    if (!part1) {
        return res;
    }
    res.opi1 = ucOPIType(`${name}${UC_OPI1_SUFFIX}`, part1);
    res.op1 = ucOutputPartType(`${name}${UC_OUTPUT_PART1_SUFFIX}`, res.opi1, pagination);
    res.outputParts.add(new Field(UC_OUTPUT_PARTS_FIELD_1, 2, res.op1.name));
    return res;
}
