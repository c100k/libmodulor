export const I18n = {
    en: {
        err_unknown_app: 'Unknown app : {{appPath}}',
        uc_DeleteGeneratedAppsTests_desc: 'Delete the automated test suite generated for each app',
        uc_DeleteGeneratedAppsTests_label: 'Delete generated apps tests',
        uc_GenerateAppsTests_desc: 'Generate an automated test suite for each app',
        uc_GenerateAppsTests_label: 'Generate apps tests',
        uc_TestApp_desc: 'Test an app and generate coverage report',
        uc_TestApp_label: 'Test app',
        ucif_appPath_desc: 'The path of the app',
        ucif_appsPath_desc: 'The path to the directory containing all the apps',
        ucif_monkeyTestingTimeoutInMs_desc: 'These tests can take longer than the usual default of 5000ms because they try lots of possibilities',
        ucif_depsMapping_desc: 'The mapping of dependencies in case some of them need a specific pattern (e.g. one directory above the default)',
        ucif_serverPortRangeStart_desc: 'The port number to start with when generating the server to test (incremented by 1) for each app',
        ucif_skipCoverage_desc: 'Whether to skip coverage or not',
        ucif_updateSnapshots_desc: "Whether to update the snapshots or not. Typically, update them if the tests fail because the snapshots don't match, the reason being that you changed the implementation",
    },
};
