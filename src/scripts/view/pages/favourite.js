/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/favouriteresto-idb';
import FavoriteRestoSearchView from './liked-movies/favorite-resto-search-view';
import FavoriteRestoShowPresenter from './liked-movies/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './liked-movies/favorite-movies-search-initiator';

const view = new FavoriteRestoSearchView();

const Favourite = {
    async render() {
        return view.getTemplate();
    },
    async afterRender() {
        new FavoriteRestoShowPresenter({ view, favoriteRestos: FavoriteRestoIdb });
        new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestoIdb });
    },
};

export default Favourite;
