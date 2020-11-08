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

      _searchRestos(latestQuery) {
        this._latestQuery = latestQuery;
        this._favoriteRestos.searchRestos(this.latestQuery);
      }
   
      get latestQuery() {
        return this._latestQuery;
      }
  }
   
  export default FavoriteRestoSearchPresenter;