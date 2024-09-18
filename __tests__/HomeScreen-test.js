import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { View } from 'react-native';

jest.mock('../modals/LoginModal', () => {
  const { View } = require('react-native'); 
  return ({ testID }) => <View testID={testID} />;
});

describe('HomeScreen', () => {
  it('opens the login modal when Sign In button is pressed', async () => {

    const { getByTestId, queryByTestId } = render(
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    );

  
    const signInButton = getByTestId('SignIn');

    // test modal to not show at the start
    expect(queryByTestId('LoginModal')).toBeNull();

    // press button
    fireEvent.press(signInButton);

    // modal should show after button pressed
    await waitFor(() => {
      expect(queryByTestId('LoginModal')).toBeTruthy();
    });
  });
});
