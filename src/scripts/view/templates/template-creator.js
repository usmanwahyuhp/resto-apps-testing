/* eslint-disable object-curly-newline */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h1>${restaurant.name}</h1>
  <div class="detail-info">
    <img crossorigin="anonymous" class="restaurant_image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="movie__info">
    <h3>Information</h3>
      <h4>Kota</h4>
      <p>${restaurant.city}</p>
      <h4>Alamat</h4>
      <p>${restaurant.address}</p>
      <h4>Rating</h4>
      <p>${restaurant.rating} stars</p>
    </div>
  </div>
  
  <div class="detail-description">
  <h3>Description</h3>
  <p>${restaurant.description}</p>
  </div>
`;

const createRestaurantFoodsTemplate = (menus) => `
    <p>${menus.name}</p>
`;

const createRestaurantCommentsTemplate = (comment) => ` 
    <img src="#" alt="profile" crossorigin="anonymous" />

    <div class="comments">
    <h3>${comment.name}</h3>
    <p>${comment.review}</p>
    </div>
`;

const createRestaurantItemTemplate = (list) => `
    <li class="cards_item">
    <div class="card">
        <div class="card_image"><img crossorigin="anonymous" src="${CONFIG.BASE_IMAGE_URL + list.pictureId}"></div>
        <div class="card_content">
        <h4 class='card_title'>Rating: ${list.rating || '-'}</h4>
        <h2 class="card_title resto__title">${list.name || '-'} - ${list.city || '-'}</h2>
        <p class="card_text">${list.description || '-'}</p>
        <a href="${`/#/detail/${list.id}`}" class="btn card_btn">Read More</a href="">
        </div>
    </div>
    </li>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantCommentsTemplate,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantFoodsTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
