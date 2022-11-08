import React, {useContext, useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import {saveContext} from '../context/SaveContext';
import UngroupedDataSolution from '../components/UngroupedDataSolution';
import GroupedDataSolution from '../components/GroupedDataSolution';
import moment from 'moment';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdUnits from '../AdUnits.json';

const ViewSave = ({navigation}) => {
  const SaveContext = useContext(saveContext);
  const {viewSave} = SaveContext;
  const {isLoaded, load, show} = useInterstitialAd(AdUnits.VS_INTERSTITIAL_AD, {
    requestNonPersonalizedAdsOnly: true,
  });

  const showInterstitial = async () => {
    AsyncStorage.getItem('calcCount').then(value => {
      if (!value) {
        let amount = 1;
        AsyncStorage.setItem('calcCount', amount.toString());
      } else {
        let amount = Number(value) + 1;
        AsyncStorage.setItem('calcCount', amount.toString());

        if (isLoaded && amount % 3 === 0) {
          show();
          load();
        }
      }
    });
  };

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isLoaded) {
      showInterstitial();
    }
  }, [isLoaded]);

  return (
    <ScrollView style={{paddingHorizontal: 15}}>
      <Text style={{paddingVertical: 10}}>
        Saved on: {moment(viewSave.time).format('llll')}
      </Text>
      {viewSave.type === 'ungroupedData' ? (
        <UngroupedDataSolution
          table={viewSave.table}
          table2={viewSave.table2}
        />
      ) : (
        <GroupedDataSolution table={viewSave.table} table2={viewSave.table2} />
      )}
    </ScrollView>
  );
};
export default ViewSave;
