import { inject, injectable } from 'inversify';

import {
    FAKE_USER_ADMIN,
    FAKE_USER_REGULAR,
    type JWTManager,
    type UCAuth,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { SignUpInput, SignUpOPI0 } from './SignUpUCD.js';

@injectable()
export class SignUpServerMain implements UCMain<SignUpInput, SignUpOPI0> {
    constructor(
        @inject('JWTManager')
        private jwtManager: JWTManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SignUpInput, SignUpOPI0>): Promise<UCOutput<SignUpOPI0>> {
        const role = uc.reqVal0('role');

        // DO NOT USE THIS IN PRODUCTION !!!
        // TODO: In production, validate email format and password strength
        // TODO: Check if email already exists in database
        // TODO: Hash password before storing
        // In a real implementation, you would:
        // 1. Validate email format and password strength
        // 2. Check if email already exists
        // 3. Hash the password before storing
        // 4. Store user data in a database
        // 5. Return appropriate error messages

        // For this demo, we'll just create a JWT based on the role
        let auth!: UCAuth;
        switch (role) {
            case 'admin':
                auth = FAKE_USER_ADMIN;
                break;
            case 'regular':
                auth = FAKE_USER_REGULAR;
                break;
            default:
                role satisfies never;
        }
        const jwt = await this.jwtManager.encode(auth);

        return new UCOutputBuilder<SignUpOPI0>()
            .add({ id: auth.user.id, jwt })
            .get();
    }
}
