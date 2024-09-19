const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return {
      results: data.results,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (nameOrId) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      types: data.types.map(type => type.type.name),
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(ability => ability.ability.name)
    };
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${nameOrId}:`, error);
    throw error;
  }
};