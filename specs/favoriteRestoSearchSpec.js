import FavoriteRestoSearchPresenter from '../src/scripts/view/pages/liked-movies/favorite-movies-search-initiator.js';
import FavoriteRestoIdb from '../src/scripts/data/favouriteresto-idb.js';

describe('Searching restos', () => {
    let presenter;
    let favoriteRestos;

    const searchRestos = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };
 
    const setRestoSearchContainer = () => {
      document.body.innerHTML = `
          <div id="resto-search-container">
              <input id="query" type="text">
              <div class="resto-result-container">
                  <ul class="restos">
                  </ul>
              </div>
          </div>
          `;
    };

    const constructPresenter = () => {
      favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb);
      presenter = new FavoriteRestoSearchPresenter({
        favoriteRestos,
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

        it('should show the found restos', () => {
          presenter._showFoundRestos([{ id: 1, title: 'Satu' }]);
          expect(document.querySelectorAll('.resto__title').item(0).textContent)
            .toEqual('Satu');
        
          presenter._showFoundRestos(
            [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
          );
        
          const restoTitles = document.querySelectorAll('.resto__title');
          expect(restoTitles.item(0).textContent).toEqual('Satu');
          expect(restoTitles.item(1).textContent).toEqual('Dua');
        
          // kemudian tes film di atas ditampilkan
        });

        it('should show - for found resto without title', () => {
          presenter._showFoundRestos([{ id: 1 }]);
        
          expect(document.querySelectorAll('.resto__title').item(0).textContent)
            .toEqual('-');
        });

        it('should show the Restos found by Favorite Restos', (done) => {
          document.getElementById('resto-search-container')
          .addEventListener('restos:searched:updated', () => {
            expect(document.querySelectorAll('.resto').length).toEqual(3);
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
          document.getElementById('resto-search-container').addEventListener('restos:searched:updated', () => {
            const restoTitles = document.querySelectorAll('.resto__title');
            expect(restoTitles.item(0).textContent).toEqual('film abc');
            expect(restoTitles.item(1).textContent).toEqual('ada juga film abcde');
            expect(restoTitles.item(2).textContent).toEqual('ini juga boleh film a');
        
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
   
});