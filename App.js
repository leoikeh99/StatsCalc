import React from 'react';
import DrawerNav from './navigation/DrawerNav';
import {SaveState} from './context/SaveContext';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

export default function App() {
  return (
    <SaveState>
      <DrawerNav />
    </SaveState>
  );
}
