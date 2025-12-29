import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import {
    DIContextProvider,
    StyleContextProvider,
} from '../../../../../dist/esm/index.react.js';
import Root from './components/Root.js';
import container from './container.js';
import { style } from './style.js';

const rootElt = document.getElementById('root');
if (!rootElt) {
    throw new Error('Add a div#root in index.html');
}

ReactDOM.createRoot(rootElt).render(
    <StrictMode>
        <DIContextProvider container={container}>
            <StyleContextProvider {...style}>
                <Root />
            </StyleContextProvider>
        </DIContextProvider>
    </StrictMode>,
);
