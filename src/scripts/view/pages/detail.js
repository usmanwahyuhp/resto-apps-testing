import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import LikeButtonInitiator from '../../utils/like-button-inititator';
import {
    createRestaurantCommentsTemplate,
    createRestaurantDetailTemplate,
    createRestaurantFoodsTemplate,
} from '../templates/template-creator';
import FavoriteRestoIdb from '../../data/favouriteresto-idb';

const Detail = {
    async render() {
        return `
            <div id="detail" class="detail"></div>
            <div id="categories" class="categories">
                <h3>Categories</h3>
                <p class="category"></p>
            </div>
            <div id="menu" class="menu">
                <div class="menu-foods">
                    <h4 id="food">Drinks</h4>
                </div>
                <div class="menu-drinks">
                    <h4 id="drink">Foods</h4>
                </div>
            </div>
            <section class="all">
            <div class="info">
                <div class="total">
                    <span>2</span> Comments
                </div>
                <div class="btn">
                    <button>Add Comment</button>
                </div>
            </div>
        
        
            <div class="list">
            <div class="mask"></div>
            <section class="first">
        
        
            </section>    
            </div>
            </section>
            <div id="likeButtonContainer"></div>
        `;
    },
    async afterRender() {
        // akan dipanggil setelah render
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const detail = await RestaurantSource.detailRestaurant(url.id);
        const detil = detail.restaurant;
        const movieContainer = document.querySelector('#detail');
        movieContainer.innerHTML = createRestaurantDetailTemplate(detail.restaurant);

        const categoriesContainer = document.querySelector('.category');
        const category = detail.restaurant.categories;
        category.forEach((menus) => {
            categoriesContainer.innerHTML += createRestaurantFoodsTemplate(menus);
        });

        const menuContainer = document.querySelector('.menu-foods');
        const menu = detail.restaurant.menus.drinks;
        menu.forEach((menus) => {
            menuContainer.innerHTML += createRestaurantFoodsTemplate(menus);
        });

        const foodContainer = document.querySelector('.menu-drinks');
        const food = detail.restaurant.menus.foods;
        food.forEach((foods) => {
            foodContainer.innerHTML += createRestaurantFoodsTemplate(foods);
        });

        const commentContainer = document.querySelector('.first');
        const comment = detail.restaurant.customerReviews;
        comment.forEach((comments) => {
            commentContainer.innerHTML += createRestaurantCommentsTemplate(comments);
        });

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            detil,
            favoriteRestos: FavoriteRestoIdb,
            menu,
            food,
            comment,
        });
    },
};

export default Detail;
