const dataAl = async () => {
  const button = document.getElementById("button");
  const URL = `https://restcountries.com/v3/all`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      alert(data.message);
    } else {
      menu(data);
      //   ulkeListe(data);
      // if(res.ok){
      // }
    }
  } catch (error) {
    console.error("Veri çekerken hata oluştu:", error);
  }
};
const ulkeListe = (ulkeler) => {
  const cards = document.getElementById("card");
  cards.innerHTML = "";
  ulkeler.forEach(
    ({
      name,
      flags,
      maps,
      population,
      region,
      capital,
      languages,
      currencies,
      borders,
    }) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";

      card.innerHTML += ` 
          <div class="card" style="width: 18rem;">
          <img src="${flags[1]}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name.common}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><i class="bi bi-globe-europe-africa"></i>Region:${region}</li>
            <li class="list-group-item">Capitals: ${capital || "capital yok"}</li>
            <li class="list-group-item">${Object.values(languages)|| "yok"}</li>
            <li class="list-group-item">${Object.values(currencies).map(
              (currency) => currency.name
            ) || "yok"}</li>
            <li class="list-group-item">Population:${population || "yok"}</li>
            <li class="list-group-item">${borders|| "no borders"}</li>          
          </ul>
          <div class="card-body">
            <a href="MAP:${
              Object.values(maps)[0]
            }" class="card-link">Go to google map</a>          
          </div>
        </div>     
          `;
      card.addEventListener("click", () => {
        event.stopPropagation();
      });

      cards.appendChild(card);
    }
  );
};
const menu = (ulkeler) => {
  const button = document.getElementById("button");
  // const select = document.createElement("select");
  let select = button.querySelector("select");
  if (!select) {
    select = document.createElement("select");
    button.appendChild(select);
  } else {
    select.innerHTML = "";
  }
  ulkeler.forEach(({ name }) => {
    const option = document.createElement("option");
    option.value = name.common;
    option.textContent = name.common;
    select.appendChild(option);

    select.addEventListener("change", async () => {
      
      const selectedIndex = event.target.selectedIndex;
      const selectedCountry = ulkeler[selectedIndex];     
        
      

      ulkeListe([selectedCountry]);
    });
  });
};

document.getElementById("button").addEventListener("click", dataAl);
