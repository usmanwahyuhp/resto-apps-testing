import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const List = {
    async render() {
        return `
        <div class="main">
            <h1>Restaurant Catalogue</h1>
            <ul class="cards">
            </ul>
        </div>
        `;
    },
    async afterRender() {
        const listsContainer = document.querySelector('.cards');
        // akan dipanggil setelah render
        try {
            const lists = await RestaurantSource.list();
            lists.forEach((list) => {
                listsContainer.innerHTML += createRestaurantItemTemplate(list);
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    },
};

export default List;
