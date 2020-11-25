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
  
  I.seeElement('.card_content a');
  I.click(locate('.card_content a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');
 
  I.amOnPage('/#/favourite');
  I.seeElement('.cards_item');
});