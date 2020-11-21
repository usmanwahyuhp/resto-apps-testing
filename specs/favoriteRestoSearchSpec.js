import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/liked-movies/favorite-movies-search-initiator.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';
import FavoriteRestoSearchView from '../src/scripts/view/pages/liked-movies/favorite-resto-search-view.js';


describe('Searching restos', () => {
    let presenter;
    let favoriteRestos;
    let view;

    const searchRestos = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };
 
    const setRestoSearchContainer = () => {
      view = new FavoriteRestoSearchView();
      document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
      favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
      presenter = new FavoriteRestoSearchPresenter({
        favoriteRestos,
        view,
      });
    };
   

    beforeEach(() => {
        setRestoSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
      // ... Pemangkasan
      it('should be able to capture the query typed by the user', () => {
        searchRestos('film a');
        
        expect(presenter.latestQuery).toEqual('film a');
      });

      it('should ask the model to search for liked restos', () => {
          searchRestos('film a');
        
          expect(favoriteRestos.searchRestos)
            .toHaveBeenCalledWith('film a');
        });

        it('should show - when the resto returned does not contain a title', (done) => {
          document.getElementById('restos').addEventListener('restos:updated', () => {
            const restoTitles = document.querySelectorAll('.resto__title');
            expect(restoTitles.item(0).textContent).toEqual('- - -');
         
            done();
          });
         
          favoriteRestos.searchRestos.withArgs('film a').and.returnValues([
            { id: 444 },
          ]);
         
          searchRestos('film a');
        });

        it('should show the Restos found by Favorite Restos', (done) => {
          document.getElementById('restos')
          .addEventListener('restos:updated', () => {
            expect(document.querySelectorAll('.cards_item').length).toEqual(3);
            done();
          });

        favoriteRestos.searchRestos.withArgs('film a').and.returnValues([
          { id: 111, title: 'film abc' },
          { id: 222, title: 'ada juga film abcde' },
          { id: 333, title: 'ini juga boleh film a' },
        ]);

        searchRestos('film a');
        });

        it('should show the name of the restos found by Favorite Restos', (done) => {
          document.getElementById('restos').addEventListener('restos:updated', () => {
            const restoTitles = document.querySelectorAll('.resto__title');
            expect(restoTitles.item(0).textContent).toEqual('- - -');
            expect(restoTitles.item(1).textContent).toEqual('- - -');
            expect(restoTitles.item(2).textContent).toEqual('- - -');
        
            done();
          });
        
          favoriteRestos.searchRestos.withArgs('film a').and.returnValues([
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ]);
        
          searchRestos('film a');
        });
    } );

    describe('When query is empty', () => {
      it('should capture the query as empty', () => {
        searchRestos(' ');
        expect(presenter.latestQuery.length).toEqual(0);
       
        searchRestos('    ');
        expect(presenter.latestQuery.length).toEqual(0);
       
        searchRestos('');
        expect(presenter.latestQuery.length).toEqual(0);
       
        searchRestos('\t');
        expect(presenter.latestQuery.length).toEqual(0);
      });

      it('should show all favorite movies', () => {
        searchRestos('    ');
       
        expect(favoriteRestos.getAllMovies)
          .toHaveBeenCalled();
      });
    });

    describe('When no favorite restos could be found', () => {
      it('should show the empty message', (done) => {
        document.getElementById('restos')
          .addEventListener('restos:updated', () => {
            expect(document.querySelectorAll('.resto-item__not__found').length)
              .toEqual(1);

            done();
          });
       
        favoriteRestos.searchRestos.withArgs('film a').and.returnValues([]);
       
        searchRestos('film a');
      });

      it('should not show any resto', (done) => {
        document.getElementById('restos').addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.cards_item').length).toEqual(0);
          done();
        });
       
        favoriteRestos.searchRestos.withArgs('film a').and.returnValues([]);
       
        searchRestos('film a');
      });
    });
   
});