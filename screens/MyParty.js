import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, SafeAreaView, ImageBackground } from 'react-native';
import { getUserTeam, updateUserTeam } from '../utils/database';
import { fetchPokemonDetails } from '../utils/pokeApi';
import { getUserId } from '../utils/userUtils';

const { width, height } = Dimensions.get('window');
const SLOT_SIZE = width * 0.45;

export default function MyParty({ navigation }) {
  const [team, setTeam] = useState(Array(6).fill(null));

  useEffect(() => {
    fetchTeam();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchTeam();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchTeam = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const userTeam = await getUserTeam(userId);
        const teamWithDetails = await Promise.all(
          userTeam.map(async (pokemonId) => {
            if (pokemonId) {
              return await fetchPokemonDetails(pokemonId);
            }
            return null;
          })
        );
        setTeam(teamWithDetails);
      } else {
        console.error('User ID not found');
        Alert.alert('Error', 'User not logged in. Please log in and try again.');
      }
    } catch (error) {
      console.error('Error fetching team:', error);
      Alert.alert('Error', 'Failed to fetch team. Please try again.');
    }
  };

  const handleRemovePokemon = async (index) => {
    try {
      const userId = await getUserId();
      if (userId) {
        await updateUserTeam(userId, index + 1, null);
        const newTeam = [...team];
        newTeam[index] = null;
        setTeam(newTeam);
        Alert.alert('Success', 'Pokémon removed from your team');
      } else {
        console.error('User ID not found');
        Alert.alert('Error', 'User not logged in. Please log in and try again.');
      }
    } catch (error) {
      console.error('Error removing Pokémon from team:', error);
      Alert.alert('Error', 'Failed to remove Pokémon from team. Please try again.');
    }
  };

  const renderPokemonSlot = (pokemon, index) => (
    <View key={index} style={styles.pokemonSlot}>
      {pokemon ? (
        <>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
          <TouchableOpacity 
            style={styles.minusButton}
            onPress={() => handleRemovePokemon(index)}
          >
            <Image source={require('../assets/minus50.png')} style={styles.minusIcon} />
          </TouchableOpacity>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </>
      ) : (
        <Image source={require('../assets/placeholder.png')} style={styles.placeholderImage} />
      )}
      <Text style={styles.slotNumber}>Slot {index + 1}</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/party.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>My Party</Text>
        <View style={styles.teamContainer}>
          <View style={styles.column}>
            {team.slice(0, 3).map((pokemon, index) => renderPokemonSlot(pokemon, index))}
          </View>
          <View style={styles.column}>
            {team.slice(3, 6).map((pokemon, index) => renderPokemonSlot(pokemon, index + 3))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  column: {
    justifyContent: 'space-around',
    height: '100%',
  },
  pokemonSlot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  pokemonImage: {
    width: SLOT_SIZE * 0.7,
    height: SLOT_SIZE * 0.7,
    resizeMode: 'contain',
  },
  placeholderImage: {
    width: SLOT_SIZE * 0.7,
    height: SLOT_SIZE * 0.7,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  pokemonName: {
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 12,
  },
  slotNumber: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 12,
    color: '#888',
  },
  minusButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 30,
    height: 30,
  },
  minusIcon: {
    width: 30,
    height: 30,
  },
});