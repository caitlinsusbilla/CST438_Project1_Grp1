import { render, waitFor } from '@testing-library/react-native';
import MyParty from '../screens/MyParty';
import { getAllPokemon } from '../utils/database';
import fetchMock from 'jest-fetch-mock';

jest.mock('../utils/database', () => ({
  getAllPokemon: jest.fn(), 
  insertPokemon: jest.fn(), 
}));

fetchMock.enableMocks();

it('renders the MyParty component and fetches Pokémon from local database', async () => {
  // mock database
  getAllPokemon.mockResolvedValueOnce([
    {
      id: 1,
      name: 'bulbasaur',
      image: 'https://example.com/bulbasaur.png',
      types: ['grass', 'poison'],
      height: 7,
      weight: 69,
      abilities: ['overgrow', 'chlorophyll'],
    },
  ]);

  
  const { getByText, getByTestId } = render(<MyParty />);

  await waitFor(() => {
    // check if pokemon is rendered
    expect(getByText('bulbasaur')).toBeTruthy();

    // check if image is rendered
    expect(getByTestId('pokemon-image-1')).toBeTruthy(); // Ensure this matches your testID structure
  });
}, 10000);
