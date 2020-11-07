/* eslint-disable no-console */
console.log('drawer');
const DrawerInitiator = {
  init({ button, drawer, close }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    close.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    drawer.classList.toggle('mobile-nav');
    event.stopPropagation();
    console.log('togleDrawer');
  },

  _closeDrawer(event, drawer) {
    drawer.classList.remove('mobile-nav');
    event.stopPropagation();
    console.log('closeDrawer');
  },
};

export default DrawerInitiator;
