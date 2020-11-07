import 'regenerator-runtime'; /* for async await transpile */
import App from './view/app';
import '../styles/global.scss';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#mobile-menu'),
  close: document.querySelector('.nav-item'),
  drawer: document.querySelector('.nav'),
  content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
