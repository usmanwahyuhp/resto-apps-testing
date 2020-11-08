import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/liked-movies/favorite-movies-search-initiator.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';

describe('Searching movies', () => {
    beforeEach(() => {
      document.body.innerHTML = `
          <div id="movie-search-container">
              <input id="query" type="text">
              <div class="movie-result-container">
                  <ul class="movies">
                  </ul>
              </div>
          </div>
          `;
    });
   
    it('should be able to capture the query typed by the user', () => {
        spyOn(FavoriteRestoIdb, 'searchRestos');
        const presenter = new FavoriteRestoSearchPresenter({
            favoriteRestos: FavoriteRestoIdb,
        });

        const queryElement = document.getElementById('query');
        queryElement.value = 'film a';
        queryElement.dispatchEvent(new Event('change'));
        
        expect(presenter.latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
        spyOn(FavoriteRestoIdb, 'searchRestos');
        const presenter = new FavoriteRestoSearchPresenter({ favoriteRestos: FavoriteRestoIdb });
       
        const queryElement = document.getElementById('query');
        queryElement.value = 'film a';
        queryElement.dispatchEvent(new Event('change'));
       
        expect(FavoriteRestoIdb.searchRestos)
          .toHaveBeenCalledWith('film a');
      });
});