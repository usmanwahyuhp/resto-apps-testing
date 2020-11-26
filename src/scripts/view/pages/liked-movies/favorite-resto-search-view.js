import { createRestaurantItemTemplate } from '../../templates/template-creator.js';

class FavoriteRestoSearchView {
    getTemplate() {
      return `
          <div class="content main">
              <input id="query" type="text">
              <h1 class="content__heading">Restaurant Favorite</h1>
                  <ul id="restos" class="cards restos">
                  </ul>
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
        console.log(html);
      } else {
        html = this._getEmptyRestoTemplate();
      }
      document.getElementById('restos').innerHTML = html;

      document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
    }
  }

  export default FavoriteRestoSearchView;