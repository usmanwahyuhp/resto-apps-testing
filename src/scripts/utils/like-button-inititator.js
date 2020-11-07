import { createLikeButtonTemplate, createLikedButtonTemplate } from '../view/templates/template-creator';

const LikeButtonInitiator = {
    async init({
        likeButtonContainer,
        detil,
        favoriteRestos,
        menu,
        food,
        comment,
    }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = detil;
        this._favoriteRestos = favoriteRestos;
        this._menu = menu;
        this._food = food;
        this._comment = comment;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isMovieExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isMovieExist(id) {
        const movie = await this._favoriteRestos.getMovie(id);
        return !!movie;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestos.putMovie(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestos.deleteMovie(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
