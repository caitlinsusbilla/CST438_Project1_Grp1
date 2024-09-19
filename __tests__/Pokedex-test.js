import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Pokedex from '../screens/Pokedex';

const mockPokemonResponse = {
  count: 1118,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockPokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }],
  sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  height: 7,
  weight: 69,
  abilities: [{ ability: { name: 'overgrow' } }],
};


// mock feth api
global.fetch = jest.fn((url) => {
    // mock list
    if (url.includes('pokemon?limit=20&offset=')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          count: 1118,
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          ],
        }),
      });
    } 

    // mock details
    else if (url.includes('/pokemon/1')) { // for bulbasaur
      return Promise.resolve({
        json: () => Promise.resolve({
          id: 1,
          name: 'bulbasaur',
          types: [{ type: { name: 'grass' } }],
          sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
          height: 7,
          weight: 69,
          abilities: [{ ability: { name: 'overgrow' } }],
        }),
      });
    } else if (url.includes('/pokemon/2')) { // for ivysaur
      return Promise.resolve({
        json: () => Promise.resolve({
          id: 2,
          name: 'ivysaur',
          types: [{ type: { name: 'grass' } }],
          sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
          height: 10,
          weight: 130,
          abilities: [{ ability: { name: 'overgrow' } }],
        }),
      });
    }
  
    // if url does not match
    return Promise.reject(new Error('Invalid API call'));
  });
  

describe('Pokedex Component', () => {
  it('renders a list of Pokemon', async () => {
    const { getByText, findByText } = render(<Pokedex />);

    await act(async () => {
      const bulbasaur = await findByText(/bulbasaur/i);
      expect(bulbasaur).toBeTruthy();
    });
  });

  it('can navigate to the next page', async () => {
    const { getByText } = render(<Pokedex />);

    await act(async () => {
      // first page to load
      await waitFor(() => getByText(/bulbasaur/i));
    });

    // next button
    await act(async () => {
      fireEvent.press(getByText(/next/i));
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'
    );
  });
});
