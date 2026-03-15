export const UCDataStoreMode = {
    NONE: 'NONE',
    READ: 'READ',
    READ_WRITE: 'READ_WRITE',
    WRITE: 'WRITE',
};
export function assertCan(op, mode) {
    switch (mode) {
        case 'NONE':
            if (op === 'read') {
                throw new Error('err_uc_data_store_data_not_readable');
            }
            if (op === 'write') {
                throw new Error('err_uc_data_store_data_not_writable');
            }
            break;
        case 'READ':
            if (op === 'write') {
                throw new Error('err_uc_data_store_data_not_writable');
            }
            break;
        case 'READ_WRITE':
            break;
        case 'WRITE':
            if (op === 'read') {
                throw new Error('err_uc_data_store_data_not_readable');
            }
            break;
        default:
            mode;
    }
}
