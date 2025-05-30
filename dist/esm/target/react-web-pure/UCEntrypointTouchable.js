import React, {} from 'react';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCEntrypointTouchable({ path, wording }) {
    const { entrypointTouchable } = useStyleContext();
    return (React.createElement("a", { className: entrypointTouchable?.className, href: path, style: entrypointTouchable?.style, title: wording.desc ?? undefined }, wording.label));
}
