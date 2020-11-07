import data from '../DATA.json';

let Card = '';

data.restaurants.forEach((resto) => {
    Card += `
          <li class='cards_item'>
              <div class='card'>
                  <div class='card_image'>
                      <img src='${resto.pictureId}' alt='${resto.name}'/>
                      </div>
                  <div class='card_content'>
                      <h4 class='card_title'>Rating: ${resto.rating}</h4>
                      <h2 class='card_title'>${resto.name} - ${resto.city}</h2>
                      <p class='card_text'>${resto.description}</p>
                      <button class='btn card_btn'>Read More</button>
                  </div>
              </div>
          </li>
  `;
    document.getElementById('cards').innerHTML = Card;
});
