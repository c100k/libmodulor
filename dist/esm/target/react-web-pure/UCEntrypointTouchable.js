import { jsx as _jsx } from "react/jsx-runtime";
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCEntrypointTouchable({ path, wording }) {
    const { entrypointTouchable } = useStyleContext();
    return (_jsx("a", { className: entrypointTouchable?.className, href: path, style: entrypointTouchable?.style, title: wording.desc ?? undefined, children: wording.label }));
}
