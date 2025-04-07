import { DIContextProvider } from 'libmodulor/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from '../_lib/react/web/App.js';
import container from './container.js';

const rootElt = document.getElementById('root');
if (!rootElt) {
    throw new Error('Add a div#root in index.html');
}

ReactDOM.createRoot(rootElt).render(
    <StrictMode>
        <DIContextProvider container={container}>
            <App />
        </DIContextProvider>
    </StrictMode>,
);
