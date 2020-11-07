import LikeButtonInitiator from '../../src/scripts/utils/like-button-inititator.js';
import FavoriteRestoIdb from '../../src/scripts/data/favouriteresto-idb.js';
 
const createLikeButtonPresenterWithResto = async (detil) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestos: FavoriteRestoIdb,
    detil,
  });
};
 
export { createLikeButtonPresenterWithResto };