import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

const POKEMON_PER_PAGE = 20; // Adjusted to match PokeAPI's default limit
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2;

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

  const fetchPokemon = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const offset = (currentPage - 1) * POKEMON_PER_PAGE;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
      const data = await response.json();
      setTotalCount(data.count);
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (p) => {
          const detailResponse = await fetch(p.url);
          const detail = await detailResponse.json();
          return {
            id: detail.id,
            name: detail.name,
            types: detail.types.map(t => t.type.name),
            image: detail.sprites.front_default,
            height: detail.height,
            weight: detail.weight,
            abilities: detail.abilities.map(a => a.ability.name)
          };
        })
      );
      setPokemon(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPokemonItem = ({ item }) => (
    <View style={styles.pokemonItem}>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </View>
  );

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={pokemon}
          renderItem={renderPokemonItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || loading}
          style={[styles.paginationButton, (currentPage === 1 || loading) && styles.disabledButton]}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages || loading}
          style={[styles.paginationButton, (currentPage === totalPages || loading) && styles.disabledButton]}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});