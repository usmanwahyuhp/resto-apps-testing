import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';
import * as TestFactories from './helpers/testFactories.js';
 
const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};
 
describe('Unliking A Resto', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putMovie({ id: 1 });
  });
 
  afterEach(async () => {
    await FavoriteRestoIdb.deleteMovie(1);
  });
 
  it('should display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
 
    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeTruthy();
  });
 
  it('should not display like widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
 
    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeFalsy();
  });
});