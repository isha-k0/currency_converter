const API_KEY = "cur_live_0Su86SrCfeIofe68Iq58JCpTIhcSMtGBbT5JIOKs";
const BASE_URL = "https://api.currencyapi.com/v3/latest";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
  for (code in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = code;
    newOpt.value = code;
    if (select.name === "from" && code === "USD") {
      newOpt.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOpt.selected = "selected";
    }

    select.append(newOpt);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateAmt();
});
const updateAmt = async () => {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = 1;
  }

  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}`;

  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  //let rate = data[toCurr.value.toLowerCase()];
  let rate = data.data[toCurr.value.toUpperCase()].value;
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateAmt();
});
