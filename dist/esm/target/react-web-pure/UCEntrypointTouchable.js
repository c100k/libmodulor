import React, {} from 'react';
export function UCEntrypointTouchable({ path, wording }) {
    return (React.createElement("a", { href: path, title: wording.desc ?? undefined }, wording.label));
}
