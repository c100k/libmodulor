import { ucMountingPoint } from './ucMountingPoint.js';
const ACTION_HTTP_METHOD_MAPPING = {
    Create: 'POST',
    Delete: 'DELETE',
    List: 'GET',
    Search: 'POST',
    Update: 'PUT',
    View: 'GET',
};
const METHODS_WITH_NO_BODY = ['GET'];
export function ucHTTPContract(uc, pathPrefix = '/api/v1') {
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
    const path = ext?.http?.mountAt ?? `${pathPrefix}/${mountingPoint}`;
    const pathAliases = [];
    if (ext?.http?.mountAlsoAt) {
        pathAliases.push(...ext.http.mountAlsoAt);
    }
    return {
        contentType,
        envelope,
        method,
        mountingPoint,
        path,
        pathAliases,
    };
}
