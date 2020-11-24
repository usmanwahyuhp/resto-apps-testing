Feature('Liking Restos');
 
Before(({ I }) => {
  I.amOnPage('/#/favourite');
});
 
Scenario('showing empty liked restos', ({ I }) => {
  I.seeElement('#query');
  I.see('Resto tidak ditemukan', '.resto-item__not__found');
});

Scenario('liking one movie', ({ I }) => {
  I.see('Resto tidak ditemukan', '.resto-item__not__found');
 
  I.amOnPage('/');
  // … kita akan mengisi uji coba berikutnya …
});