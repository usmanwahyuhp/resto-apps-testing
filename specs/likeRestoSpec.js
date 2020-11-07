import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';
import * as TestFactories from './helpers/testFactories.js';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
 
  beforeEach(() => {
    addLikeButtonContainer();
  });
  
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
   
    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeTruthy();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
   
    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeFalsy();
  });

  it('should be able to like the movie', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
 
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestoIdb.getMovie(1);
 
    expect(resto).toEqual({ id: 1 });

    FavoriteRestoIdb.deleteMovie(1);
  });

  it('should not add a movie when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});
   
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
   
    expect(await FavoriteRestoIdb.getAllMovies()).toEqual([]);
  });
});