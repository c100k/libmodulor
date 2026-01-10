import { inject, injectable } from 'inversify';

import {
    FAKE_USER_ADMIN,
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
        const role = uc.reqVal0('role');

        // DO NOT USE THIS IN PRODUCTION !!!
        // TODO: In production, validate email format and password strength
        // TODO: Check if email already exists in database
        // TODO: Hash password before storing

        /// Persist the use case first to get aggregateId
        const { aggregateId } = await this.ucManager.persist(uc);

        // For this demo, we'll just create a JWT based on role
        // but use the aggregateId as the user ID
        let auth!: UCAuth;
        switch (role) {
            case 'admin':
                auth = {
                    ...FAKE_USER_ADMIN,
                    user: {
                        ...FAKE_USER_ADMIN.user,
                        id: aggregateId,
                    },
                };
                break;
            case 'regular':
                auth = {
                    ...FAKE_USER_REGULAR,
                    user: {
                        ...FAKE_USER_REGULAR.user,
                        id: aggregateId,
                    },
                };
                break;
            default:
                role satisfies never;
        }
        const jwt = await this.jwtManager.encode(auth);

        return new UCOutputBuilder<SignUpOPI0>()
            .add({
                id: aggregateId,
                jwt,
            })
            .get();
    }
}
