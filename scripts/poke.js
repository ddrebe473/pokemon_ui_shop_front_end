const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';

const TYPE_IMAGE_BASE_URL =
    'https://www.serebii.net/newpokemonsnap/stickers/type';

const INCLUDE_LIST = [
    'normal',
    'ground',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
];

const getTypes = async () => {
    const typesRes = await fetch(`${POKEMON_API_URL}type`);

    let types = await typesRes.json();
    types = types.results;

    types = types.filter((type) => INCLUDE_LIST.includes(type.name));

    //add image to each type
    types = types.map((type) => {
        type.image = `${TYPE_IMAGE_BASE_URL}${type.name}.png`;
        return type;
    });

    return types;
};

const calcPrice = (pokemon) =>{
    return pokemon.base_experience /10
}

const getPokemonByType = async (type) => {
    //get every pokemon of that type from pokeapi

    let typeRes = await fetch(`${POKEMON_API_URL}type/${type}`);
    typeRes = await typeRes.json();
    pokemonList = typeRes.pokemon;

    //temp shorten the list
    pokemonList = pokemonList.slice(0, 10);

    let pokemonDataList = [];

    //get the pokemon data for each pokemon
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        let pokemonRes = await fetch(pokemon.pokemon.url);
        pokemonRes = await pokemonRes.json();
        pokemonRes.price = calcPrice(pokemonRes)
        pokemonDataList.push(pokemonRes);
    }

    console.log('pokemonDataList:', pokemonDataList);

    return pokemonDataList;
};
