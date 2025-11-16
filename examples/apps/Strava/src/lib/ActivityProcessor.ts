import type { CreateActivityInput } from '../ucds/CreateActivityUCD.js';

export interface ActivityProcessor {
    dispatch(input: CreateActivityInput): Promise<void>;
}
