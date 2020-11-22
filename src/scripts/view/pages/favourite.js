import FavoriteRestoIdb from '../../data/favouriteresto-idb';
import FavoriteRestoSearchView from './liked-movies/favorite-resto-search-view.js';
import FavoriteRestoShowPresenter from './liked-movies/favorite-resto-show-presenter.js';
import FavoriteRestoSearchPresenter from './liked-movies/favorite-movies-search-initiator.js';

const view = new FavoriteRestoSearchView();

const Favourite = {
    async render() {
        return view.getTemplate();
    },
    // async render() {
    //     return `
    //     <div class="main">
    //         <h1>Restaurant Favourite</h1>
    //         <ul class="cards">
    //         </ul>
    //     </div>
    //     `;
    // },
    async afterRender() {
        new FavoriteRestoShowPresenter({ view, favoriteRestos: FavoriteRestoIdb });
        new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestoIdb });
    },
    // async afterRender() {
    //     const listsContainer = document.querySelector('.cards');
    //     const movies = await FavoriteRestoIdb.getAllMovies();
    //     try {
    //         movies.forEach((list) => {
    //             listsContainer.innerHTML += createRestaurantItemTemplate(list);
    //         });
    //     } catch (err) {
    //         // eslint-disable-next-line no-console
    //         console.log(err);
    //     }
    // },
};

export default Favourite;
