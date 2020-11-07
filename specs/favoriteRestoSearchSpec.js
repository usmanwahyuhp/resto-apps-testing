import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/liked-movies/favorite-movies-search-initiator.js';

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
        const presenter = new FavoriteRestoSearchPresenter();
        const queryElement = document.getElementById('query');
        queryElement.value = 'film a';
        queryElement.dispatchEvent(new Event('change'));
        
        expect(presenter.latestQuery).toEqual('film a');
        });
});