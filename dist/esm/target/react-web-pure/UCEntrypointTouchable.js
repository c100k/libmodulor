import React, {} from 'react';
export function UCEntrypointTouchable({ className, path, wording, }) {
    return (React.createElement("a", { className: className, href: path, title: wording.desc ?? undefined }, wording.label));
}
