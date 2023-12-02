let api = "https://api.scryfall.com/cards/";
let cardName = document.getElementById("searchCard");
let randomButton = document.getElementById("getRandom");
seachEnter = document.getElementById("searchCard");

randomButton.addEventListener("click", fetchRandom);
getSpecific.addEventListener("click", fetchSpecific);

seachEnter.addEventListener("keypress", function (pressKey) {
  // If the user presses the "Enter" key on the keyboard
  if (pressKey.key === "Enter") {
    fetchSpecific();
  }
});

//Fetch random card data from scryfall api
async function fetchRandom() {
  let data = api + "/random";
  const response = await fetch(data);
  const receivedData = await response.json();
  displayCard(receivedData);
  displayLegality(receivedData);
}

//Fetch specific card data from the scryfall api
async function fetchSpecific() {
  let encoded = encodeURIComponent(cardName.value);
  let data = api + "named?fuzzy=" + encoded;
  const response = await fetch(data);
  const receivedData = await response.json();
  displayCard(receivedData);
  displayLegality(receivedData);
}
//display img and card name
const displayCard = (recievedData) => {
  document.getElementById("resultContainer").style.backgroundColor = "#2f3543";
  const img = document.getElementById("mtgImg");
  img.src = recievedData.image_uris.normal;
  mtgCard.appendChild(img);
  const cardHeader = document.getElementById("cardHeader");
  cardHeader.textContent = recievedData.name;
};

//display in which formats the cards is legal
const displayLegality = (recievedData) => {
fetch-specific
  const ulLabel = document.getElementById("ulLabel");

  while (ulLabel.firstChild) {
    ulLabel.removeChild(ulLabel.firstChild);
  }
  ulLabel.textContent = "Legal formats:";
  for (const legalities in recievedData) {
    if (legalities == "legalities") {
      for (const key in recievedData.legalities) {
        const value = recievedData.legalities[key];
        {
          if (value === "legal") {
            const legalFormat = document.createElement("li");
            legalFormat.textContent = key;
            ulLabel.appendChild(legalFormat);
          }
        }
      }
    }
  }
};
