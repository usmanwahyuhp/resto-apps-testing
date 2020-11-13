import { itActsAsFavoriteMovieModel } from './contract/favoriteRestoContract.js';
let favoriteRestos = [];
const FavoriteRestoArray = {
  getMovie(id) {
    if (!id) {
      return;
    }
    return favoriteRestos.find((resto) => resto.id === id);
  },
  getAllMovies() {
    return favoriteRestos;
  },
  putMovie(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }
    // pastikan id ini belum ada dalam daftar favoriterestos
    if (this.getMovie(resto.id)) {
      return;
    }
    favoriteRestos.push(resto);
  },
  deleteMovie(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestos = favoriteRestos.filter((resto) => resto.id !== id);
  },

  searchRestos(query) {
    return this.getAllMovies()
      .filter((resto) => {
        const loweredCaseRestoTitle = (resto.title || '-').toLowerCase();
        const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestoTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestos = []);
    itActsAsFavoriteMovieModel(FavoriteRestoArray);
});