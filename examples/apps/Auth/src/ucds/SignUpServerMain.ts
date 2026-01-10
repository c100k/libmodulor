import { inject, injectable } from 'inversify';

import {
    type CryptoManager,
    type UCAuth,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type { SignUpInput, SignUpOPI0 } from './SignUpUCD.js';
import { UCAuth } from '../uc/auth/consts.js';

@injectable()
export class SignUpServerMain implements UCMain<SignUpInput, SignUpOPI0> {
    constructor(
        @inject('JWTManager')
        private jwtManager: JWTManager,
        @inject('UCManager')
        private ucManager: UCManager,
        @inject('CryptoManager')
        private cryptoManager: CryptoManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<SignUpInput, SignUpOPI0>): Promise<UCOutput<SignUpOPI0>> {
        const email = uc.reqVal0('email');
        const password = uc.reqVal0('password');

        // DO NOT USE THIS IN PRODUCTION !!!
        // TODO: In production, validate email format and password strength
        // TODO: Check if email already exists in database  
        // TODO: Hash password before storing

        /// Persist the use case first to get aggregateId
        const { aggregateId } = await this.ucManager.persist(uc);

        // Always create a regular user for signup (no role selection)
        const auth = FAKE_USER_REGULAR;

        const jwt = await this.jwtManager.encode(auth);

        return new UCOutputBuilder<SignUpOPI0>()
            .add({ 
                id: aggregateId, 
                jwt 
            })
            .get();
    }
}

        // Hash password using CryptoManager
        const hashedPassword = await this.cryptoManager.hash(
            password,
            'sha256',
        );

        // Create auth object with proper structure
        const auth: UCAuth = {
            organizationId,
            user: {
                id: aggregateId,
                name,
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
