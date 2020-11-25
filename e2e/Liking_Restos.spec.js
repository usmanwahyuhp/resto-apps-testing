const assert = require('assert');

Feature('Liking Restos');
 
Before(({ I }) => {
  I.amOnPage('/#/favourite');
});
 
Scenario('showing empty liked restos', ({ I }) => {
  I.seeElement('#query');
  I.see('Resto tidak ditemukan', '.resto-item__not__found');
});

Scenario('liking one movie', async ({ I }) => {
  I.see('Resto tidak ditemukan', '.resto-item__not__found');
 
  I.amOnPage('/');
  
  I.seeElement('.card_content a');
  const firstResto = locate('.card_content a').first();
  const firstRestoTitle = await I.grabTextFrom('.card_title');
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');
 
  I.amOnPage('/#/favourite');
  I.seeElement('.card_content');
  // pause();
  const likedRestoTitle = await I.grabTextFrom('.card_title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});