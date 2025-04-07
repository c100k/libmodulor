import { inject, injectable } from 'inversify';
import {
    CustomError,
    type EnvironmentManager,
    InternalServerError,
    type Logger,
    type Worker,
} from 'libmodulor';

interface Input {
    error: Error;
}

interface Output {
    error: CustomError;
}

// TODO : Use the impl from libmodulor once exposed

@injectable()
export class CustomerFacingErrorBuilder implements Worker<Input, Output> {
    constructor(
        @inject('EnvironmentManager')
        private environmentManager: EnvironmentManager,
        @inject('Logger') private logger: Logger,
    ) {}

    public exec({ error }: Input): Output {
        if (error instanceof CustomError) {
            // It's already ready to be sent as is
            return {
                error,
            };
        }

        this.logger.error(error);

        // Create a specific generic error to avoid leaking potentially sensitive error
        // We all know the infamous "Cannot connect to MySQL database"...
        return {
            error: new InternalServerError(
                this.environmentManager.isProd()
                    ? undefined
                    : `[DEV-mode] ${(error as Error).message}`,
            ),
        };
    }
}
