import { itActsAsFavoriteMovieModel } from './contract/favoriteRestoContract.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';
 
describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllMovies()).forEach(async (detil) => {
      await FavoriteRestoIdb.deleteMovie(detil.id);
    });
  });
 
  itActsAsFavoriteMovieModel(FavoriteRestoIdb);
});