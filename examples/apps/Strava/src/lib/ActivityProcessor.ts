import type { SideEffectable } from '../../../../../dist/esm/index.js';
import type { CreateActivityInput } from '../ucds/CreateActivityUCD.js';

export interface ActivityProcessor extends SideEffectable {
    dispatch(input: CreateActivityInput): Promise<void>;
}
