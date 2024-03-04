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
      const awayTeam = event.away_team;
      const homeTeam = event.home_team;
      var spread_away;
      var spread_home;

      if (event.bookmakers[0].markets[0].outcomes[0].name == awayTeam){
        spread_away = event.bookmakers[0].markets[0].outcomes[0].point;
        spread_home = event.bookmakers[0].markets[0].outcomes[1].point;
      }
      else{
        spread_away = event.bookmakers[0].markets[0].outcomes[1].point;
        spread_home = event.bookmakers[0].markets[0].outcomes[0].point;
      }
      
      const ul = document.createElement('ul');
      ul.classList.add('list-unstyled');

      // Create list items for each team
      const liTeam1 = document.createElement('li');
      const liTeam2 = document.createElement('li'); 

      liTeam1.classList.add('team-item');
      liTeam2.classList.add('team-item');

      const t1 = document.createElement('p');
      t1.textContent = awayTeam;
      t1.classList.add('custom-text-color');

      const b1 = document.createElement('button');
      b1.textContent = spread_away;
      b1.classList.add('btn-primary')

      const t2 = document.createElement('p');
      t2.textContent = homeTeam;
      t2.classList.add('custom-text-color');

      const b2 = document.createElement('button');
      b2.textContent = spread_home;
      b2.classList.add('btn-primary')

      liTeam1.appendChild(t1);
      liTeam1.appendChild(b1);
      liTeam2.appendChild(t2);
      liTeam2.appendChild(b2);

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