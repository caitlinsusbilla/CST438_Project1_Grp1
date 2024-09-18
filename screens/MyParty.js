import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { insertPokemon, getAllPokemon } from '../utils/database';

const POKEMON_PER_PAGE = 6;
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 3;

export default function MyParty() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const localPokemon = await getAllPokemon();
      if (localPokemon.length > 0) {
        setPokemon(localPokemon);
      } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (p) => {
            const detailResponse = await fetch(p.url);
            const detail = await detailResponse.json();
            const newPokemon = {
              id: detail.id,
              name: detail.name,
              types: detail.types.map(t => t.type.name),
              image: detail.sprites.front_default,
              height: detail.height,
              weight: detail.weight,
              abilities: detail.abilities.map(a => a.ability.name)
            };
            await insertPokemon(newPokemon);
            return newPokemon;
          })
        );
        setPokemon(pokemonDetails);
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const renderPokemonItem = ({ item }) => (
    <View style={styles.pokemonItem}>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} testID = "pokemon-image-1"/>
      <Text style={styles.pokemonName}>{item.name}</Text>
    </View>

  );

  const paginatedPokemon = pokemon.slice(
    (currentPage - 1) * POKEMON_PER_PAGE,
    currentPage * POKEMON_PER_PAGE
  );

  const totalPages = Math.ceil(pokemon.length / POKEMON_PER_PAGE);

//   This is what will load the Pokemon
  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedPokemon}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  row: {
    justifyContent: 'space-around',
  },
  pokemonItem: {
    width: COLUMN_WIDTH - 20,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  pokemonName: {
    marginTop: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});