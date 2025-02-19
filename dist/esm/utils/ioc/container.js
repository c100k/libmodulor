export const CONTAINER_OPTS = {
    /**
     * Allows us to avoid binding concrete classes
     *
     * @see https://github.com/inversify/InversifyJS/issues/1302
     * @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#autobindinjectable
     */
    autoBindInjectable: true,
};
