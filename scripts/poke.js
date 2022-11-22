const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';

const getTypes = async () => {

    const typeRes = await fetch(`${API_URL}/types`)

    return await typeRes.json()
};

const calcPrice = (pokemon) =>{
    return pokemon.base_experience /5
}

const getPokemonByType = async (type) => {
    //get every pokemon of that type from pokeapi

    const pokemonRes = await fetch(`${API_URL}/types/${type}`)

    return await pokemonRes.json()

};