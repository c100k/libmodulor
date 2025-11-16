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
import type { SignInInput, SignInOPI0 } from './SignInUCD.js';

@injectable()
export class SignInServerMain implements UCMain<SignInInput, SignInOPI0> {
    constructor(
        @inject('JWTManager')
        private jwtManager: JWTManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SignInInput, SignInOPI0>): Promise<UCOutput<SignInOPI0>> {
        const role = uc.reqVal0('role');

        // DO NOT USE THIS IN PRODUCTION !!!

        // >=> Compute the JWT
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

        return new UCOutputBuilder<SignInOPI0>()
            .add({ id: auth.user.id, jwt })
            .get();
    }
}
