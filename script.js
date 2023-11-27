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
  const img = document.createElement("img");
  img.src = recievedData.image_uris.normal;
  img.classList.add("cardImg");
  mtgCard.appendChild(img);
  const cardName = document.createElement("h1");
  cardName.classList.add("cardHeader");
  cardName.textContent = recievedData.name;
  mtgCard.appendChild(cardName);
};
