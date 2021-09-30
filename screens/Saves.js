import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveItem from '../components/SaveItem';
import {saveContext} from '../context/SaveContext';

const Saves = ({navigation}) => {
  const SaveContext = useContext(saveContext);
  const {saves, setSaves} = SaveContext;
  useEffect(() => {
    AsyncStorage.getItem('savedWork').then(value => {
      if (value) {
        setSaves(JSON.parse(value));
      }
    });
  }, []);
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text>All Saved Calculations</Text>
      </View>
      {saves &&
        saves
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map(item => (
            <SaveItem
              key={item.key}
              setSaves={setSaves}
              save={item}
              navigation={navigation}
            />
          ))}
    </ScrollView>
  );
};
export default Saves;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 7,
    backgroundColor: '#e3f2fd',
  },
});
