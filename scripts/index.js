fetch("../data/data.json")
    .then(response => response.json())
    .then(myIcons => loadIcons(myIcons.icons));

function loadIcons(icons) {
    var mainContainer = document.getElementById("icons");

    console.log(icons);
    for (let i = 0; i < icons.length; i++) {
        let title = icons[i].title;
        let year = ""; // Year is not provided in the JSON
        let url = icons[i].url;
        let division = document.createElement("div");
        division.innerHTML = `
            <h3>${title}</h3>
            <p>${year}</p>
            <img src="${url}" />
        `;

        mainContainer.appendChild(division);
    }
}
