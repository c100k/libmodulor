import { DIContextProvider, StyleContextProvider } from 'libmodulor/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App.js';
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
                <App />
            </StyleContextProvider>
        </DIContextProvider>
    </StrictMode>,
);
