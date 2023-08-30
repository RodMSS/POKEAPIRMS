document.addEventListener("DOMContentLoaded", function () {
    const tipoSelector = document.getElementById("tipoSelector");
    const filtrarTipoButton = document.getElementById("filtrarTipo");
    const pokemonesTipoList = document.getElementById("pokemonesTipo");
  
    const nombreInput = document.getElementById("nombreInput");
    const filtrarNombreButton = document.getElementById("filtrarNombre");
    const pokemonNombreDiv = document.getElementById("pokemonNombre");
  
    filtrarTipoButton.addEventListener("click", function () {
      const selectedType = tipoSelector.value;
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((response) => response.json())
        .then((data) => {
          pokemonesTipoList.innerHTML = "";
          const columnWrapper = document.createElement("div");
          columnWrapper.classList.add("column-wrapper");
  
          data.pokemon.forEach((entry) => {
            const listItem = document.createElement("div");
            listItem.classList.add("pokemon-item");
  
            const img = document.createElement("img");
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.pokemon.url.split("/")[6]}.png`;
            img.alt = entry.pokemon.name;
  
            listItem.appendChild(img);
  
            const nameSpan = document.createElement("span");
            nameSpan.textContent = entry.pokemon.name;
  
            listItem.appendChild(nameSpan);
  
            listItem.addEventListener("click", function () {
              mostrarInfoPokemon(entry.pokemon.name);
            });
  
            listItem.addEventListener("mouseover", function () {
              listItem.classList.add("hovered");
            });
  
            listItem.addEventListener("mouseout", function () {
              listItem.classList.remove("hovered");
            });
  
            columnWrapper.appendChild(listItem);
          });
  
          pokemonesTipoList.appendChild(columnWrapper);
        });
    });
  
  
    filtrarNombreButton.addEventListener("click", function () {
      const pokemonName = nombreInput.value.toLowerCase();
      mostrarInfoPokemon(pokemonName);
    });
  
    function mostrarInfoPokemon(pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
          pokemonNombreDiv.innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
            <p>Tipos: ${data.types.map((type) => type.type.name).join(", ")}</p>
            <img src="${data.sprites.front_default}" alt="${data.name}">
          `;
        })
        .catch((error) => {
          pokemonNombreDiv.innerHTML = `No se encontró un Pokémon con el nombre ${pokemonName}`;
        });
    }
  });
  