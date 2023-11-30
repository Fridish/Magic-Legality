let api = "https://api.scryfall.com/cards/";
let cardName = document.getElementById("searchCard");
let randomButton = document.getElementById("getRandom");

randomButton.addEventListener("click", fetchRandom);

//Fetch random card data from scryfall api
async function fetchRandom() {
  let data = api + "/random";
  const response = await fetch(data);
  const receivedData = await response.json();
  displayCard(receivedData);
  displayLegality(receivedData);
  console.log(receivedData);
}

//display img and card name
const displayCard = (recievedData) => {
  const img = document.getElementById("mtgImg");
  img.src = recievedData.image_uris.normal;
  mtgCard.appendChild(img);
  const cardHeader = document.getElementById("cardHeader");
  cardHeader.textContent = recievedData.name;
};

//display in which formats the cards is legal
const displayLegality = (recievedData) => {
  const legality = document.getElementById("ulLabel");
  const ul = document.getElementById("ul");
  legality.textContent = "Legal formats:";
  for (const legalities in recievedData) {
    if (legalities == "legalities") {
      for (const key in recievedData.legalities) {
        const value = recievedData.legalities[key];
        {
          if (value === "legal") {
            const legalFormat = document.createElement("li");
            legalFormat.textContent = key;
            ul.appendChild(legalFormat);
          }
        }
      }
    }
  }
};
