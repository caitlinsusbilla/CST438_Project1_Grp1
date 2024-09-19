import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground, Alert, SafeAreaView } from 'react-native';
import AddTeam from '../modals/AddTeam';
import PageSelectionModal from '../modals/PageSelectionModal';
import GenerationFilterModal from '../modals/GenerationFilterModal';
import { updateUserTeam } from '../utils/database';
import { fetchPokemonList, fetchPokemonDetails } from '../utils/pokeApi';
import { getUserId } from '../utils/userUtils';

const POKEMON_PER_PAGE = 20;
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2;

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isTeamModalVisible, setTeamModalVisible] = useState(false);
  const [isPageModalVisible, setPageModalVisible] = useState(false);
  const [isGenModalVisible, setGenModalVisible] = useState(false);
  const [genRange, setGenRange] = useState([1, Infinity]);

  useEffect(() => {
    fetchPokemonData();
  }, [currentPage, genRange]);

  const fetchPokemonData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let offset, limit;
      if (genRange[1] === Infinity) {
        // Fetching all Pokemon
        offset = (currentPage - 1) * POKEMON_PER_PAGE;
        limit = POKEMON_PER_PAGE;
        const pokemonList = await fetchPokemonList(limit, offset);
        setTotalCount(pokemonList.count);
      } else {
        // Fetching for specific generation
        const genStart = genRange[0];
        const genEnd = genRange[1];
        const genCount = genEnd - genStart + 1;
        setTotalCount(genCount);

        offset = genStart - 1 + (currentPage - 1) * POKEMON_PER_PAGE;
        limit = Math.min(POKEMON_PER_PAGE, genEnd - offset);
      }

      const pokemonList = await fetchPokemonList(limit, offset);
      const pokemonDetails = await Promise.all(
        pokemonList.results.map(p => fetchPokemonDetails(p.name))
      );
      setPokemon(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      Alert.alert('Error', 'Failed to fetch Pokemon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTeam = (pokemon) => {
    setSelectedPokemon(pokemon);
    setTeamModalVisible(true);
  };

  const handleSlotSelection = async (slotNumber) => {
    try {
      const userId = await getUserId();
      if (userId) {
        await updateUserTeam(userId, slotNumber, selectedPokemon.id);
        setTeamModalVisible(false);
        Alert.alert('Success', `${selectedPokemon.name} added to slot ${slotNumber}`);
      } else {
        console.error('User ID not found');
        Alert.alert('Error', 'User not logged in. Please log in and try again.');
      }
    } catch (error) {
      console.error('Error updating team:', error);
      Alert.alert('Error', 'Failed to add Pokémon to team. Please try again.');
    }
  };
  
  const renderPokemonItem = ({ item }) => (
    <View style={styles.pokemonItem}>
      <Image source={{ uri: item.image }} style={styles.pokemonImage} />
      <TouchableOpacity onPress={() => handleAddToTeam(item)} style={styles.plusButton}>
        <Image source={require('../assets/plus50.png')} style={styles.plusIcon} />
      </TouchableOpacity>
      <Text style={styles.pokemonName}>{item.name}</Text>
      <Text style={styles.pokemonId}>#{item.id}</Text>
    </View>
  );

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  const handleGenerationChange = (range) => {
    setGenRange(range);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('../assets/PokeBall.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setGenModalVisible(true)}
          >
            <Text>Filter by Generation</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
          ) : (
            <FlatList
              data={pokemon}
              renderItem={renderPokemonItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
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
            <TouchableOpacity
              onPress={() => setPageModalVisible(true)}
              style={styles.pageSelectButton}
            >
              <Text>Page {currentPage} of {totalPages}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || loading}
              style={[styles.paginationButton, (currentPage === totalPages || loading) && styles.disabledButton]}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AddTeam
          isVisible={isTeamModalVisible}
          onClose={() => setTeamModalVisible(false)}
          onSelectSlot={handleSlotSelection}
        />
        <PageSelectionModal
          isVisible={isPageModalVisible}
          onClose={() => setPageModalVisible(false)}
          onSelectPage={setCurrentPage}
          totalPages={totalPages}
        />
        <GenerationFilterModal
          isVisible={isGenModalVisible}
          onClose={() => setGenModalVisible(false)}
          onSelectGeneration={handleGenerationChange}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  row: {
    justifyContent: 'space-around',
  },
  listContent: {
    paddingBottom: 60,
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
  pokemonId: {
    position: 'absolute',
    top: 10,
    right: 10,
    textAlign: 'right',
  },
  plusButton: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageSelectButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
});