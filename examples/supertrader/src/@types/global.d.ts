declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_RUNTIME?: string;
            readonly NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

export {};
