declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_RUNTIME?: string;
        }
    }
}

export {};
