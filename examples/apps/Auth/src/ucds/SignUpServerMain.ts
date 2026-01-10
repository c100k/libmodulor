import { inject, injectable } from 'inversify';

import {
    FAKE_USER_REGULAR,
    type JWTManager,
    type UCAuth,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { SignUpInput, SignUpOPI0 } from './SignUpUCD.js';

@injectable()
export class SignUpServerMain implements UCMain<SignUpInput, SignUpOPI0> {
    constructor(
        @inject('JWTManager')
        private jwtManager: JWTManager,
        @inject('UCManager')
        private ucManager: UCManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SignUpInput, SignUpOPI0>): Promise<UCOutput<SignUpOPI0>> {
        // DO NOT USE THIS IN PRODUCTION !!!
        // TODO: In production, validate email format and password strength
        // TODO: Check if email already exists in database
        // TODO: Hash password before storing

        /// Persist the use case first to get aggregateId
        const { aggregateId } = await this.ucManager.persist(uc);

        // Always create a regular user for signup (no role selection)
        const auth: UCAuth = {
            ...FAKE_USER_REGULAR,
            user: {
                ...FAKE_USER_REGULAR.user,
                id: aggregateId,
            },
        };

        const jwt = await this.jwtManager.encode(auth);

        return new UCOutputBuilder<SignUpOPI0>()
            .add({
                id: aggregateId,
                jwt,
            })
            .get();
    }
}
