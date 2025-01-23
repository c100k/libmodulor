export interface AppInstaller {
    setupFixtures(): Promise<void>;
    setupSeeds(): Promise<void>;
}
