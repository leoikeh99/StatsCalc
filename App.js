import React from 'react';
import DrawerNav from './navigation/DrawerNav';
import {SaveState} from './context/SaveContext';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';

mobileAds()
  .setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
      });
  });

export default function App() {
  return (
    <SaveState>
      <DrawerNav />
    </SaveState>
  );
}
