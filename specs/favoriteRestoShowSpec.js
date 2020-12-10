import FavoriteRestoSearchView from '../src/scripts/view/pages/liked-movies/favorite-resto-search-view.js';
import FavoriteRestoShowPresenter from '../src/scripts/view/pages/liked-movies/favorite-resto-show-presenter.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';

describe('Showing all favorite restos', () => {
    let view;
    const renderTemplate = () => {
        view = new FavoriteRestoSearchView();
        document.body.innerHTML = view.getTemplate();
    };
    
    beforeEach(() => {
        renderTemplate();
    });
    
    describe('When no restos have been liked', () => {

        it('should ask for the favorite restos', () => {
            const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
      
            new FavoriteRestoShowPresenter({
              view,
              favoriteRestos,
            });
      
            expect(favoriteRestos.getAllMovies).toHaveBeenCalledTimes(1);
          });

        it('should show the information that no restos have been liked', (done) => {
          document.getElementById('restos').addEventListener('restos:updated', () => {
            expect(document.querySelectorAll('.resto-item__not__found').length)
              .toEqual(1);
         
            done();
          });
         
          const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
          favoriteRestos.getAllMovies.and.returnValues([]);
         
          new FavoriteRestoShowPresenter({
            view,
            favoriteRestos,
          });
        });
    });

    describe('When favorite restos exist', () => {

      it('should show the restos', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.cards_item').length).toEqual(2);
          done();
        });
       
        const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
        favoriteRestos.getAllMovies.and.returnValues([
          {
            id: 11, title: 'A', vote_average: 3, overview: 'Sebuah resto A',
          },
          {
            id: 22, title: 'B', vote_average: 4, overview: 'Sebuah resto B',
          },
        ]);
       
        new FavoriteRestoShowPresenter({
          view,
          favoriteRestos,
        });
      });
    });

});