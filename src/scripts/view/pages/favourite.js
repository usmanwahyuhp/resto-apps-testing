import FavoriteRestoIdb from '../../data/favouriteresto-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favourite = {
    async render() {
        return `
        <div class="main">
            <h1>Restaurant Favourite</h1>
            <ul class="cards">
            </ul>
        </div>
        `;
    },
    async afterRender() {
        const listsContainer = document.querySelector('.cards');
        const movies = await FavoriteRestoIdb.getAllMovies();
        try {
            movies.forEach((list) => {
                listsContainer.innerHTML += createRestaurantItemTemplate(list);
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    },
};

export default Favourite;
