import { ucMountingPoint } from './ucMountingPoint.js';
const ACTION_HTTP_METHOD_MAPPING = {
    Create: 'POST',
    Delete: 'DELETE',
    List: 'GET',
    Search: 'POST',
    Update: 'PUT',
    View: 'GET',
};
const METHODS_WITH_NO_BODY = ['DELETE', 'GET', 'HEAD'];
export const UC_CONTRACT_DEFAULT_PREFIX = '/api/v1';
export const UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS = 'api.v1';
export const UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS_PARTS = UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS.split('.');
export function ucHTTPContract(uc) {
    const { ext, metadata } = uc.def;
    const { action } = metadata;
    const hasMediaInInput = uc.hasMediaInInput();
    const contentType = hasMediaInInput
        ? 'multipart/form-data'
        : 'application/json';
    const method = ext?.http?.method ?? ACTION_HTTP_METHOD_MAPPING[action];
    let envelope = METHODS_WITH_NO_BODY.includes(method)
        ? 'query-params'
        : 'json';
    if (hasMediaInInput) {
        envelope = 'form-data';
    }
    const mountingPoint = ucMountingPoint(uc);
    const path = ext?.http?.mountAt ?? `${UC_CONTRACT_DEFAULT_PREFIX}/${mountingPoint}`;
    const pathAliases = [];
    if (ext?.http?.mountAlsoAt) {
        pathAliases.push(...ext.http.mountAlsoAt);
    }
    // TODO : Make this in a cleaner way
    const pathForGRPC = `/${UC_CONTRACT_DEFAULT_PREFIX_WITH_DOTS}.${mountingPoint.replace('_', '/')}`;
    return {
        contentType,
        envelope,
        method,
        mountingPoint,
        path,
        pathAliases,
        pathForGRPC,
    };
}
