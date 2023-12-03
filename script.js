let api = "https://api.scryfall.com/cards/";
let cardName = document.getElementById("input_CardName");
let randomButton = document.getElementById("button_GetRandom");
seachEnter = document.getElementById("input_CardName");
button_GetSpecific = document.getElementById("button_GetSpecific");

randomButton.addEventListener("click", fetchRandom);
button_GetSpecific.addEventListener("click", fetchSpecific);

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
  document.getElementById("display_Container").style.backgroundColor =
    "#2f3543";
  const img = document.getElementById("display_MtgImg");
  img.src = recievedData.image_uris.normal;
  display_MtgCard.appendChild(img);
  const cardHeader = document.getElementById("display_CardHeader");
  cardHeader.textContent = recievedData.name;
};

//display in which formats the cards is legal
const displayLegality = (recievedData) => {
  const ulLabel = document.getElementById("display_UlLabel");

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
