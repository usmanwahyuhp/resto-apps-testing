import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/liked-movies/favorite-movies-search-initiator.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';

describe('Searching movies', () => {
    let presenter;

    const searchMovies = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };
 
    const setMovieSearchContainer = () => {
      document.body.innerHTML = `
          <div id="movie-search-container">
              <input id="query" type="text">
              <div class="movie-result-container">
                  <ul class="movies">
                  </ul>
              </div>
          </div>
          `;
    };

    const constructPresenter = () => {
      spyOn(FavoriteRestoIdb, 'searchRestos');
      presenter = new FavoriteRestoSearchPresenter({
        favoriteRestos: FavoriteRestoIdb,
      });
    };
   

    beforeEach(() => {
        setMovieSearchContainer();
        constructPresenter();
    });
   
    it('should be able to capture the query typed by the user', () => {
        searchMovies('film a');
        
        expect(presenter.latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
        searchMovies('film a');
       
        expect(FavoriteRestoIdb.searchRestos)
          .toHaveBeenCalledWith('film a');
      });
});