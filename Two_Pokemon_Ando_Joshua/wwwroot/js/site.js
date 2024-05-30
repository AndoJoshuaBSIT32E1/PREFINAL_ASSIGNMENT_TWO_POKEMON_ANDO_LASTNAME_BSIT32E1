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

// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


// Write your JavaScript code.

document.addEventListener('DOMContentLoaded', () => {
    const pokemonContainer = document.getElementById('pokemonContainer');
    const searchBar = document.getElementById('searchBar');
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.getElementById('pokemonInfo');
    const closeModal = document.querySelector('.close');

    let allPokemon = [];
    let timeout = null;

    // Fetch and display Pokémon with loading spinner and error handling
    async function fetchPokemon() {
        try {
            showLoadingSpinner();
            for (let i = 1; i <= 150; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for Pokémon ID: ${i}`);
                }
                const pokemon = await response.json();
                allPokemon.push(pokemon);
                displayPokemon(pokemon);
            }
        } catch (error) {
            console.error(error.message);
            alert('Failed to load Pokémon data. Please try again later.');
        } finally {
            hideLoadingSpinner();
        }
    }

    function displayPokemon(pokemon) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${capitalize(pokemon.name)}</h3>
        `;
        card.addEventListener('click', () => showPokemonInfo(pokemon));
        pokemonContainer.appendChild(card);
    }

    function showPokemonInfo(pokemon) {
        modalContent.innerHTML = `
            <h2>${capitalize(pokemon.name)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Type: ${pokemon.types.map(typeInfo => capitalize(typeInfo.type.name)).join(', ')}</p>
        `;
        modal.style.display = 'block';
    }

    searchBar.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const searchValue = searchBar.value.toLowerCase();
            const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchValue));
            pokemonContainer.innerHTML = '';
            filteredPokemon.forEach(displayPokemon);
        }, 300); // Debounce with a delay of 300ms
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function showLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.innerHTML = `
            <div class="spinner"></div>
        `;
        document.body.appendChild(spinner);
    }

    function hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.remove();
        }
    }

    fetchPokemon();
});

