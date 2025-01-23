export interface ExternalResourceManager {
    create(autoGenerate: boolean): Promise<void>;
    delete(): Promise<void>;
    exists(): Promise<boolean>;
    name(): string;
}
