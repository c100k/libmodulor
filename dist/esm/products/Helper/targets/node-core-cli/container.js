import { Container } from 'inversify';
import { NodeSpawnShellCommandExecutor } from '../../../../std/impl/NodeSpawnShellCommandExecutor.js';
import { VitestAppTestSuiteEmitter } from '../../../../testing/impl/VitestAppTestSuiteEmitter.js';
import { VitestAppTestSuiteRunner } from '../../../../testing/impl/VitestAppTestSuiteRunner.js';
import { CONTAINER_OPTS } from '../../../../utils/index.js';
import { bindCommon } from '../../../../utils/ioc/bindCommon.js';
import { bindNodeCLI } from '../../../../utils/ioc/bindNodeCLI.js';
import { bindNodeCore } from '../../../../utils/ioc/bindNodeCore.js';
import { bindProduct } from '../../../../utils/ioc/bindProduct.js';
import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';
const container = new Container(CONTAINER_OPTS);
bindCommon(container);
bindNodeCore(container);
bindNodeCLI(container);
bindProduct(container, Manifest, I18n);
container
    .bind('AppTestSuiteEmitter')
    .to(VitestAppTestSuiteEmitter);
container
    .bind('AppTestSuiteRunner')
    .to(VitestAppTestSuiteRunner);
container
    .bind('ShellCommandExecutor')
    .to(NodeSpawnShellCommandExecutor);
export default container;
