import { createRestaurantItemTemplate } from '../../templates/template-creator.js';

class FavoriteRestoSearchView {
    getTemplate() {
      return `
          <div class="content">
              <input id="query" type="text">
              <h2 class="content__heading">Your Liked Movie</h2>
                  <div id="restos"class="restos">
                  </div>
          </div>
          `;
    }
  
    runWhenUserIsSearching(callback) {
      document.getElementById('query').addEventListener('change', (event) => {
        callback(event.target.value);
      });
    }

    _getEmptyRestoTemplate() {
      return '<div class="resto-item__not__found">Resto tidak ditemukan</div>';
    }

    showFavoriteRestos(restos = []) {
      let html;
      if (restos.length) {
        html = restos.reduce((carry, resto) => carry.concat(createRestaurantItemTemplate(resto)), '');
      } else {
        html = this._getEmptyRestoTemplate();
      }
      document.getElementById('restos').innerHTML = html;

      document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
    }
  }

  export default FavoriteRestoSearchView;