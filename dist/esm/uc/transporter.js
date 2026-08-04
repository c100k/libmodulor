import { ucMountingPoint, } from './utils/ucMountingPoint.js';
const ACTION_HTTP_METHOD_MAPPING = {
    Create: 'POST',
    Delete: 'DELETE',
    List: 'GET',
    Search: 'POST',
    Update: 'PUT',
    View: 'GET',
};
const METHODS_WITH_NO_BODY = ['DELETE', 'GET', 'HEAD'];
export const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX = '/api/v1';
export const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS = 'api.v1';
export const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS_PARTS = UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS.split('.');
export function ucTransportContract(uc) {
    const mountingPoint = ucMountingPoint(uc);
    return {
        grpc: grpc(mountingPoint),
        http: http(uc, mountingPoint),
        mountingPoint,
    };
}
function grpc(mountingPoint) {
    const path = `/${UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS}.${mountingPoint.replace('_', '/')}`;
    return {
        path,
    };
}
function http(uc, mountingPoint) {
    const { ext, metadata: { action }, } = uc.def;
    const hasMediaInInput = uc.hasMediaInInput();
    const contentType = hasMediaInInput
        ? 'multipart/form-data'
        : 'application/json';
    const path = ext?.http?.mountAt ??
        `${UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX}/${mountingPoint}`;
    const pathAliases = [];
    if (ext?.http?.mountAlsoAt) {
        pathAliases.push(...ext.http.mountAlsoAt);
    }
    const method = ext?.http?.method ?? ACTION_HTTP_METHOD_MAPPING[action];
    let envelope = METHODS_WITH_NO_BODY.includes(method)
        ? 'query-params'
        : 'json';
    if (hasMediaInInput) {
        envelope = 'form-data';
    }
    return {
        contentType,
        envelope,
        method,
        path,
        pathAliases,
    };
}
