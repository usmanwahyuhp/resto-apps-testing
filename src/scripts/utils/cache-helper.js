import CONFIG from '../globals/config';

const CacheHelper = {
    async cachingAppShell(requests) {
        const cache = await this._openCache();
        cache.addAll(requests);
        const asset = [
            ...requests,
            'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://fonts.googleapis.com/css?family=Quicksand:400,700',
        ];
        await cache.addAll(asset);
    },

    async deleteOldCache() {
        const cacheNames = await caches.keys();
        cacheNames
            .filter((name) => name !== CONFIG.CACHE_NAME)
            .map((filteredName) => caches.delete(filteredName));
    },

    async revalidateCache(request) {
        const response = await caches.match(request);

        if (response) {
            return response;
        }
        return this._fetchRequest(request);
    },

    async _openCache() {
        return caches.open(CONFIG.CACHE_NAME);
    },

    async _fetchRequest(request) {
        const response = await fetch(request);

        if (!response || response.status !== 200) {
            return response;
        }

        await this._addCache(request);
        return response;
    },

    async _addCache(request) {
        const cache = await this._openCache();
        cache.add(request);
    },
};

export default CacheHelper;
