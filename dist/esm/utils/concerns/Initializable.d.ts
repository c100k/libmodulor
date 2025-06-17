export interface Initializable {
    init(): Promise<void>;
    initSync(): void;
}
