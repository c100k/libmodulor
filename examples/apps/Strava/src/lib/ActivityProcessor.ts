import type {
    SideEffectable,
    UCInputValue,
} from '../../../../../dist/esm/index.js';
import type { CreateActivityInput } from '../ucds/CreateActivityUCD.js';

export interface ActivityProcessor extends SideEffectable {
    dispatch(input: UCInputValue<CreateActivityInput>): Promise<void>;
}
