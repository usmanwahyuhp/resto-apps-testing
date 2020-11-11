class FavoriteRestoSearchPresenter {
    constructor({favoriteRestos}) {
        this._listenToSearchRequestByUser();
        this._favoriteRestos = favoriteRestos;
      }
     
      _listenToSearchRequestByUser() {
        this._queryElement = document.getElementById('query');
        this._queryElement.addEventListener('change', (event) => {
          this._searchRestos(event.target.value);
        });
      }

      async _searchRestos(latestQuery) {
        this._latestQuery = latestQuery.trim();

        let foundRestos;
        if (this.latestQuery.length > 0) {
          foundRestos = await this._favoriteRestos.searchRestos(this.latestQuery);
        } else {
          foundRestos = await this._favoriteRestos.getAllMovies();
        }
       
        this._showFoundRestos(foundRestos);
      }

      _showFoundRestos(restos) {
        console.log(restos);
        const html = restos.reduce(
          (carry, resto) => carry.concat(`<li class="resto"><span class="resto__title">${resto.title || '-'}</span></li>`),
          '',
        );

        document.querySelector('.restos').innerHTML = html;

        document.getElementById('resto-search-container')
        .dispatchEvent(new Event('restos:searched:updated'));
      }
   
      get latestQuery() {
        return this._latestQuery;
      }
  }
   
  export default FavoriteRestoSearchPresenter;