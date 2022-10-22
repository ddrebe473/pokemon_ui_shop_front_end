const API_URL = 'http://localhost:8000/api/pokemon';

let cart = [];
let pokemonList = [];

const getCart = async () => {
    const cartRes = await fetch(`${API_URL}/cart`);
    cart = await cartRes.json();
    return cart;
};

const compressPokemon = (pokemon) => {
    return {
        name: pokemon.name,
        price: pokemon.price,
        sprites: pokemon.sprites,
        id: pokemon.id,
        order: pokemon.order,
        species: pokemon.species,
        weight: pokemon.weight,
    };
};

const addToCart = async (pokemon) => {
    console.log('addToCart called');
    const compressedPokemon = compressPokemon(pokemon);
    console.log('pokemon', pokemon, compressedPokemon);
    const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemon: compressedPokemon }),
    });
    const data = await res.json();
    console.log('data', data);

    await getCart()
    displayPokemon();
};

const displayPokemon = () => {
    const pokemon = pokemonList;

    //get our typeContainer
    const typeContainer = document.querySelector('.typeContainer');
    typeContainer.innerHTML = '';
    typeContainer.style.display = 'flex';
    typeContainer.style.flexDirection = 'column';

    //for each pokemon
    for (let i = 0; i < pokemon.length; i++) {
        const pokemonData = pokemon[i];

        //make an image and buy button for each pokemon
        const img = document.createElement('img');
        img.src = pokemonData.sprites.front_default;
        img.style.width = '128px';
        img.style.height = '128px';

        const name = document.createElement('h6');
        name.innerText = pokemonData.name;

        const price = document.createElement('h6');
        price.innerText = '$' + pokemonData.price.toFixed(2);

        let btn = document.createElement('button');
        btn.innerText = 'Buy';
        btn.addEventListener('click', async () => {
            await addToCart(pokemonData);
        });

        const countInCart = cart.filter(
            (p) => p.pokemon.id === pokemonData.id
        ).length;
        console.log('count', countInCart);

        let inCartMsg = document.createElement('h6');
        inCartMsg.style.color = 'red';
        inCartMsg.innerText = `In Cart: ${countInCart}`;

        //add the image and button to the div
        const div = document.createElement('div');
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(price);
        if (countInCart > 0){
            div.appendChild(inCartMsg)
        }
        div.appendChild(btn);
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.alignItems = 'center';
        div.style.padding = '20px';

        //add image and button to typeContainer
        typeContainer.appendChild(div);
    }
};

const load = async () => {
    await getCart();

    console.log('type loaded');

    //get type name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const typeName = urlParams.get('type');

    //get all pokemon of that type from api
    const pokemon = await getPokemonByType(typeName);
    console.log('pokemon:', pokemon);

    pokemonList = pokemon;
    displayPokemon();

    //add background image to each type
    const types = await getTypes();
    const type = types.find(t=> t.name === typeName);
 
    const body = document.querySelector('body');
    body.style.backgroundImage = `url(${type.image})`
    body.style.backgroundSize = '125%'
    body.style.backgroundPosition='center'
    
};

window.addEventListener('load', load);

const sortList = () => {
    const sortOption = document.querySelector('#sortDropDown').value;
    console.log('sortDropDpwn', sortOption);

    if (sortOption === 'priceAsc') {
        pokemonList = pokemonList.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
        pokemonList = pokemonList.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'alphaAsc') {
        pokemonList = pokemonList.sort((a, b) => (a.name < b.name ? -1 : 1));
    } else if (sortOption === 'alphaDesc') {
        pokemonList = pokemonList.sort((a, b) => (b.name < a.name ? -1 : 1));
    } else if (sortOption === 'default') {
        pokemonList = pokemonList.sort((a, b) => a.order - b.order);
    }
    displayPokemon();
};
