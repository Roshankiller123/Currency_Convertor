const url =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ojlGGTGmFG8aEzWcHInzD4SsuPThK5SDv4GsMVnS";
const dropdowns = document.querySelectorAll(".display-flex select");
const btn = document.querySelector(".show_exchange button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (select of dropdowns) {
  for (curr in filteredObject) {
    let newOption = document.createElement("option");
    newOption.innerText = curr;
    newOption.value = curr;

    if (select.name === "from" && curr === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && curr === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlags(evt.target);
  });
}

const updateFlags = (event) => {
  let curr = event.value;
  let countryCode = filteredObject[curr];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = event.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateRate = async (evt) => {
  let amount = document.querySelector(".input input");
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 0) {
    alert("Invalid Amount");
  }

  let response = await fetch(url);
  let data = await response.json();
  let rate = data.data[to.value];

  let finalRate = amtVal * rate;
  msg.innerText = `${amtVal} ${from.value} = ${finalRate} ${to.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateRate();
});
