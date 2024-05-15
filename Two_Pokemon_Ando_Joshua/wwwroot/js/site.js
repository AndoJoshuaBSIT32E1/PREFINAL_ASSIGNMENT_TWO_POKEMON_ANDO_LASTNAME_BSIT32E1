// scripts.js
const pokemonListElement = document.getElementById('pokemonList');
const modal = document.getElementById('modal');
const modalImageElement = document.getElementById('modalImage');
const modalTitleElement = document.getElementById('modalTitle');
const modalAbilitiesElement = document.getElementById('modalAbilities');
const modalMovesElement = document.getElementById('modalMoves');
const closeModal = document.getElementsByClassName('close')[0];

// Fetch Pokemon data and populate the gallery with card design
fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonData => {
                    const card = document.createElement('div');
                    card.classList.add('card', 'pokemon-card');
                    card.innerHTML = `
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                        <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                    `;
                    card.addEventListener('click', () => showDetails(pokemonData));
                    pokemonListElement.appendChild(card);
                });
        });
    });

// Function to display Pokemon details in the modal
function showDetails(pokemon) {
    modalImageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    modalImageElement.style.width = '150%'; // Set image width to 150%
    modalTitleElement.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    modalAbilitiesElement.textContent = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    modalMovesElement.textContent = pokemon.moves.map(move => move.move.name).slice(0, 5).join(', ');

    modal.style.display = 'block';
}

// Event listener to close the modal
closeModal.onclick = function () {
    modal.style.display = 'none';
};

// Clicking outside the modal also closes it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};