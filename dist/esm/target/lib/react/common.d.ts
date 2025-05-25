export interface Stylable {
    /**
     * Although it's not applicable to all the targets (e.g. React Native), we generalize `className` to make it more convenient for targets that accept it as it is a pretty common and standard property
     */
    className?: string;
}
