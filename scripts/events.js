//https://the-odds-api.com/liveapi/guides/v4/#overview

let apikey = "900d1f183fb4804e64c67f9341640819";

const basketballUrl = "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=" + apikey + "&bookmakers=draftkings&markets=spreads,h2h&oddsFormat=american";
const mmaUrl = "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?apiKey=" + apikey + "&bookmakers=unibet&markets=h2h&oddsFormat=american";
const mlsUrl = "https://api.the-odds-api.com/v4/sports/soccer_usa_mls/odds/?apiKey=" + apikey + "&bookmakers=draftkings&markets=h2h&oddsFormat=american";
const champsUrl = "https://api.the-odds-api.com/v4/sports/soccer_uefa_european_championship/odds/?apiKey=" + apikey + "&bookmakers=draftkings&markets=spreads,h2h&oddsFormat=american";

var bbObjects;
var mlsObjects;
var champsObjects;
var mmaObjects;

fetch(basketballUrl)
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
    bbObjects = data;
    generateBasketball(bbObjects);
    
    //arrayOfObjects = JSON.parse(data)
  })
  .catch(error => {
    // Log any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

  fetch(mlsUrl)
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
    mlsObjects = data;

    generateMLS(mlsObjects);
    //arrayOfObjects = JSON.parse(data)
  })
  .catch(error => {
    // Log any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

  fetch(mmaUrl)
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
    mmaObjects = data;

    generateMMA(mmaObjects);
    //arrayOfObjects = JSON.parse(data)
  })
  .catch(error => {
    // Log any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });


  function generateBasketball(arrayOfObjects) {
    const cardsContainer = document.getElementById('basketballContainer');
    arrayOfObjects.forEach(event => {
      let awayTeam = event.away_team;
      let homeTeam = event.home_team;
      var spread_away;
      var spread_home;
      var ml_away;
      var ml_home;
      var time;
      
      if(event.bookmakers[0].markets.length == 2){
        if (event.bookmakers[0].markets[1].outcomes[0].name == awayTeam){
          spread_away = event.bookmakers[0].markets[1].outcomes[0].point;
          spread_home = event.bookmakers[0].markets[1].outcomes[1].point;
        }
        else{
          spread_away = event.bookmakers[0].markets[1].outcomes[1].point;
          spread_home = event.bookmakers[0].markets[1].outcomes[0].point;
        }

        if (event.bookmakers[0].markets[0].outcomes[0].name == awayTeam){
          ml_away = event.bookmakers[0].markets[1].outcomes[0].price;
          ml_home = event.bookmakers[0].markets[1].outcomes[1].price;
        }
        else{
          ml_away = event.bookmakers[0].markets[1].outcomes[1].price;
          ml_home = event.bookmakers[0].markets[1].outcomes[0].price;
        }

        time = new Date(event.commence_time).toLocaleString();

        const ul = document.createElement('ul');
        ul.classList.add('list-unstyled');

        // Create list items for each team
        const timeStart = document.createElement('li');
        const timeP = document.createElement('p');
        timeP.textContent = time;
        timeStart.appendChild(timeP);
        timeStart.classList.add('game-time');


        const liTeam1 = document.createElement('li');
        const liTeam2 = document.createElement('li'); 

        liTeam1.classList.add('team-item');
        liTeam2.classList.add('team-item');

        const t1 = document.createElement('p');
        t1.textContent = awayTeam;
        t1.classList.add('colH');

        const s1 = document.createElement('button');
        s1.textContent = spread_away;
        s1.classList.add('btn-primary');

        const m1 = document.createElement('button');
        m1.textContent = ml_away;
        m1.classList.add('btn-primary');

        const t2 = document.createElement('p');
        t2.textContent = homeTeam;
        t2.classList.add('colH');

        const s2 = document.createElement('button');
        s2.textContent = spread_home;
        s2.classList.add('btn-primary')

        const m2 = document.createElement('button');
        m2.textContent = ml_home;
        m2.classList.add('btn-primary');


        liTeam1.appendChild(t1);
        liTeam1.appendChild(s1);
        liTeam1.appendChild(m1);
        liTeam2.appendChild(t2);
        liTeam2.appendChild(s2);
        liTeam2.appendChild(m2);

        // Append list items to the unordered list
        ul.appendChild(timeStart);
        ul.appendChild(liTeam1);
        ul.appendChild(liTeam2);

        const card = document.createElement('div');
        card.classList.add('card', 'mt-3');
        card.appendChild(ul);
        cardsContainer.appendChild(card);
      }
    });
  }

  function generateMLS(arrayOfObjects) {
    const cardsContainer = document.getElementById('mlsContainer');
        
    arrayOfObjects.forEach(event => {
      let awayTeam = event.away_team;
      let homeTeam = event.home_team;
      var ml_away;
      var ml_home;
      var time;

      if (event.bookmakers[0].markets[0].outcomes[0].name == awayTeam){
        ml_away = event.bookmakers[0].markets[0].outcomes[0].price;
        ml_home = event.bookmakers[0].markets[0].outcomes[1].price;
      }
      else{
        ml_away = event.bookmakers[0].markets[0].outcomes[1].price;
        ml_home = event.bookmakers[0].markets[0].outcomes[0].price;
      }

      time = new Date(event.commence_time).toLocaleString();

      const ul = document.createElement('ul');
      ul.classList.add('list-unstyled');

      const timeStart = document.createElement('li');
      const timeP = document.createElement('p');
      timeP.textContent = time;
      timeStart.appendChild(timeP);
      timeStart.classList.add('game-time');

      // Create list items for each team
      const liTeam1 = document.createElement('li');
      const liTeam2 = document.createElement('li'); 

      liTeam1.classList.add('team-item');
      liTeam2.classList.add('team-item');

      const t1 = document.createElement('p');
      t1.textContent = awayTeam;
      t1.classList.add('socH');

      const m1 = document.createElement('button');
      m1.textContent = ml_away;
      m1.classList.add('btn-soccer');

      const t2 = document.createElement('p');
      t2.textContent = homeTeam;
      t2.classList.add('socH');

      const m2 = document.createElement('button');
      m2.textContent = ml_home;
      m2.classList.add('btn-soccer');

      liTeam1.appendChild(t1);
      liTeam1.appendChild(m1);
      liTeam2.appendChild(t2);
      liTeam2.appendChild(m2);

      // Append list items to the unordered list
      ul.appendChild(timeStart);
      ul.appendChild(liTeam1);
      ul.appendChild(liTeam2);

      const card = document.createElement('div');
      card.classList.add('card', 'mt-3');
      card.appendChild(ul);
      cardsContainer.appendChild(card);
    });
  }

  function generateMMA(arrayOfObjects) {
    const cardsContainer = document.getElementById('mmaContainer');
    
    const firstDay = new Date(arrayOfObjects[0].commence_time).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    for (const event of arrayOfObjects){

      const eventDay = new Date(event.commence_time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      if (firstDay != eventDay){
        //skip
      }

      else{
        let awayTeam = event.away_team;
          let homeTeam = event.home_team;
          var ml_away;
          var ml_home;
          var time;

          if (event.bookmakers[0].markets[0].outcomes[0].name == awayTeam){
            ml_away = event.bookmakers[0].markets[0].outcomes[0].price;
            ml_home = event.bookmakers[0].markets[0].outcomes[1].price;
          }
          else{
            ml_away = event.bookmakers[0].markets[0].outcomes[1].price;
            ml_home = event.bookmakers[0].markets[0].outcomes[0].price;
          }

          time = new Date(event.commence_time).toLocaleString();

          const ul = document.createElement('ul');
          ul.classList.add('list-unstyled');

          const timeStart = document.createElement('li');
          const timeP = document.createElement('p');
          timeP.textContent = time;
          timeStart.appendChild(timeP);
          timeStart.classList.add('game-time');

          // Create list items for each team
          const liTeam1 = document.createElement('li');
          const liTeam2 = document.createElement('li'); 

          liTeam1.classList.add('team-item');
          liTeam2.classList.add('team-item');

          const t1 = document.createElement('p');
          t1.textContent = awayTeam;
          t1.classList.add('socH');

          const m1 = document.createElement('button');
          m1.textContent = ml_away;
          m1.classList.add('btn-soccer');

          const t2 = document.createElement('p');
          t2.textContent = homeTeam;
          t2.classList.add('socH');

          const m2 = document.createElement('button');
          m2.textContent = ml_home;
          m2.classList.add('btn-soccer');

          liTeam1.appendChild(t1);
          liTeam1.appendChild(m1);
          liTeam2.appendChild(t2);
          liTeam2.appendChild(m2);

          // Append list items to the unordered list
          ul.appendChild(timeStart);
          ul.appendChild(liTeam1);
          ul.appendChild(liTeam2);

          const card = document.createElement('div');
          card.classList.add('card', 'mt-3');
          card.appendChild(ul);
          cardsContainer.appendChild(card);
        };
      }

      
  }
  //basketball_nba, soccer_usa_mls, mma_mixed_martial_arts