export const DEFAULT_APP_TESTER_OPTS = {
    logger_level: 'error', // Having 'debug' makes the test output bloated so it's opt-in
    source: {
        imports: {
            external: {
                aliasPrefix: '@',
                allowed: ['inversify', 'libmodulor'],
            },
            internal: {
                maxDepth: '../../',
                startChar: '.',
            },
        },
        ts: {
            configFileName: 'tsconfig.json',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            noCheck: true,
            skipLibCheck: true,
            target: 'ESNext',
        },
    },
};
export function optsAllSet(opts) {
    const { logger_level, source: { imports: { external: { aliasPrefix, allowed }, internal: { maxDepth, startChar }, }, ts: { configFileName, module, moduleResolution, noCheck, skipLibCheck, target, }, }, } = DEFAULT_APP_TESTER_OPTS;
    return {
        logger_level: opts?.logger_level ?? logger_level,
        source: {
            imports: {
                external: {
                    aliasPrefix: opts?.source?.imports?.external?.aliasPrefix ??
                        aliasPrefix,
                    allowed: opts?.source?.imports?.external?.allowed ?? allowed,
                },
                internal: {
                    maxDepth: opts?.source?.imports?.internal?.maxDepth ?? maxDepth,
                    startChar: opts?.source?.imports?.internal?.startChar ?? startChar,
                },
            },
            ts: {
                configFileName: opts?.source?.ts?.configFileName ?? configFileName,
                module: opts?.source?.ts?.module ?? module,
                moduleResolution: opts?.source?.ts?.moduleResolution ?? moduleResolution,
                noCheck: opts?.source?.ts?.noCheck ?? noCheck,
                skipLibCheck: opts?.source?.ts?.skipLibCheck ?? skipLibCheck,
                target: opts?.source?.ts?.target ?? target,
            },
        },
    };
}
