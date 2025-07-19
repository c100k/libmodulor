import type { Color, Email, URL } from 'libmodulor';

export interface LinkManagerOpenOpts {
    onClose?: (openable: LinkManagerOpenable | undefined) => Promise<void>;
    style?: {
        barTintColor?: Color;
        controlTintColor?: Color;
    };
    /**
     * Defines whether the link is opened in the current context or in a separate one.
     * For example in RN, if this is true, it will open the link in an in-app browser.
     * Otherwise, it will open it by launching the default browser installed on the phone.
     *
     * On some targets, this can be completely ignored (e.g. on CLI)
     * Unless I find a way to display a webpage in a Terminal.
     */
    withinContext?: boolean; // Default is false
}

export type LinkManagerOpenable = URL | `mailto:${Email}`;

export interface LinkManager {
    open(
        openable: LinkManagerOpenable,
        opts?: LinkManagerOpenOpts,
    ): Promise<void>;
}
