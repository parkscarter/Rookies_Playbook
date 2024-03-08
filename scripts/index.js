fetch("../data/data.json")
    .then(response => response.json())
    .then(myIcons => loadIcons(myIcons.icons));

function loadIcons(icons) {
    var mainContainer = document.getElementById("icons");

    console.log(icons);
    for (let i = 0; i < icons.length; i++) {
        let title = icons[i].title;
        let desc = icons[i].desc;
        let url = icons[i].url;
        let division = document.createElement("div");
        division.className = "icon-card";
        division.innerHTML = `
            <h3>${title}</h3>
            <img src="${url}" class="icon-image"/>
            <p>${desc}</p>
        `;

        mainContainer.appendChild(division);
    }
}
