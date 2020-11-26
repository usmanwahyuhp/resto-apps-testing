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
  const likedRestoTitle = await I.grabTextFrom('.card_title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('searching restos', async ({ I }) => {
  I.see('Resto tidak ditemukan', '.resto-item__not__found');
 
  I.amOnPage('/');
 
  I.seeElement('.card_content a');
 
  const titles = [];
 
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.card_content a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.resto_title'));
    I.amOnPage('/');
  }
 
  I.amOnPage('/#/favourite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestos = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  
  const visibleLikedRestos = await I.grabNumberOfVisibleElements('.cards_item');
  assert.strictEqual(matchingRestos.length, visibleLikedRestos);
  
  matchingRestos.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.card_title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});