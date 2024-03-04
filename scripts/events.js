//https://the-odds-api.com/liveapi/guides/v4/#overview

let apikey = "af272dc561d07b336a57f10c633655dd";

const apiUrl = "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=" + apikey + "&bookmakers=draftkings&markets=spreads&oddsFormat=american";

var arrayOfObjects;

fetch(apiUrl)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse the JSON in the response
    return response.json();
  })
  .then(data => {
    // Log the JSON response
    arrayOfObjects = data;
    generateCards(arrayOfObjects);
    
    console.log(arrayOfObjects);
    //arrayOfObjects = JSON.parse(data)
  })
  .catch(error => {
    // Log any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });


  function generateCards(arrayOfObjects) {
    const cardsContainer = document.getElementById('basketballContainer');
    arrayOfObjects.forEach(event => {
      const team1 = event.away_team;
      const team2 = event.home_team;

      //TODO The odds arent always matched to the correct team
      const spread_away = event.bookmakers[0].markets[0].outcomes[0].point;
      const spread_home = event.bookmakers[0].markets[0].outcomes[1].point;

      const ul = document.createElement('ul');
      ul.classList.add('list-unstyled');

      // Create list items for each team
      const liTeam1 = document.createElement('li');
      const liTeam2 = document.createElement('li'); 

      const t1 = document.createElement('p');
      t1.textContent = team1 + " " + spread_away;
      t1.classList.add('custom-text-color');

      const t2 = document.createElement('p');
      t2.textContent = team2 + " " + spread_home;
      t2.classList.add('custom-text-color');

      liTeam1.appendChild(t1);
      liTeam2.appendChild(t2);

      // Append list items to the unordered list
      ul.appendChild(liTeam1);
      ul.appendChild(liTeam2);

      const card = document.createElement('div');
      card.classList.add('card', 'mt-3');

      card.appendChild(ul);

      cardsContainer.appendChild(card);

    });
  }
  //basketball_nba, soccer_usa_mls, mma_mixed_martial_arts