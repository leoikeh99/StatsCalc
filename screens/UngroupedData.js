import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {arr3dp, ungrouped} from '../Calculations';
import UngroupedDataSolution from '../components/UngroupedDataSolution';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {saveContext} from '../context/SaveContext';
import {
  InterstitialAd,
  AdEventType,
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import AdUnits from '../AdUnits.json';

const adUnitId = AdUnits.UD_INTERSTITIAL_AD;

let interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const UngroupedData = ({navigation}) => {
  const [values, setValues] = useState('');
  const [frequencies, setFrequencies] = useState('');
  const [table, setTable] = useState(null);
  const [table2, setTable2] = useState(null);
  const SaveContext = useContext(saveContext);
  const {setSaves} = SaveContext;
  const [loaded, setLoaded] = useState(false);

  const unsubscribeInterstitial = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  };

  useEffect(() => {
    unsubscribeInterstitial();
  }, []);

  const validate = (values, frequencies) => {
    if (values.split(',').length > frequencies.split(',').length) {
      return 'Every value must have a frequency';
    } else if (values.split(',').length < frequencies.split(',').length) {
      return 'Every frequency must have a value';
    } else if (values.split(',').some(val => isNaN(Number(val)))) {
      return 'All values should be a number';
    } else if (
      frequencies.split(',').some(val => isNaN(Number(val))) ||
      frequencies
        .split(',')
        .some(
          val =>
            !Number.isInteger(Number(val)) ||
            frequencies.split(',').some(val => val.trim() === ''),
        )
    ) {
      return 'All frequencies should be an integer';
    } else {
      return null;
    }
  };
  const calculate = () => {
    if (!validate(values, frequencies)) {
      const data = ungrouped(values, frequencies);
      setTable({
        tableTitle: ['x', 'f', 'f(x)', 'Cf'],
        tableSums: [
          [''],
          [`=${data.cf[data.cf.length - 1]}`],
          [`=${data.fx.reduce((a, b) => a + b)}`],
          [''],
        ],
        tableData: [data.values, data.freq, data.fx, data.cf],
        mean: data.mean,
        median: data.median,
        mode: data.mode,
      });
      setTable2({
        tableTitle: ['x - x̄', '(x - x̄)^2', 'F((x - x̄)^2)'],
        tableSums: [
          [`=${data.x_xbar.reduce((a, b) => a + b).toFixed(4)}`],
          [`=${data.x_xbar2.reduce((a, b) => a + b).toFixed(4)}`],
          [`=${data.f_x_xbar2.reduce((a, b) => a + b).toFixed(4)}`],
        ],
        tableData: [
          arr3dp(data.x_xbar),
          arr3dp(data.x_xbar2),
          arr3dp(data.f_x_xbar2),
        ],
        variance: data.variance,
        sd: data.sd,
      });
      AsyncStorage.getItem('calcCount').then(value => {
        if (!value) {
          let amount = 1;
          AsyncStorage.setItem('calcCount', amount.toString());
        } else {
          let amount = Number(value) + 1;
          AsyncStorage.setItem('calcCount', amount.toString());

          if (loaded && amount % 3 === 0) {
            interstitial.show();
            setLoaded(false);
            interstitial = InterstitialAd.createForAdRequest(adUnitId, {
              requestNonPersonalizedAdsOnly: true,
            });
            unsubscribeInterstitial();
          }
        }
      });
    } else {
      setTable(null);
      setTable2(null);
      Alert.alert(
        'Input Error',
        validate(values, frequencies),

        [{text: 'OK'}],
      );
    }
  };

  const saveWork = async () => {
    const obj = {
      type: 'ungroupedData',
      time: Date.now(),
      key: uuidv4(),
      table,
      table2,
    };
    AsyncStorage.getItem('savedWork').then(value => {
      if (!value) {
        AsyncStorage.setItem('savedWork', JSON.stringify([obj]));
        setSaves([obj]);
      } else {
        const savedWork = JSON.parse(value);
        AsyncStorage.setItem('savedWork', JSON.stringify([...savedWork, obj]));
        setSaves([...savedWork, obj]);
      }
      Alert.alert(
        'Save Status',
        'Saved successfully',

        [{text: 'OK'}],
      );
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Ungrouped Data</Text>
        <View style={styles.inputView}>
          <Text style={{fontSize: 13, fontWeight: 'bold'}}>
            Note: values should be inputed in ascending or descending order.
          </Text>
          <Text style={styles.label}>Input Values:</Text>
          <TextInput
            style={styles.input}
            value={values}
            onChangeText={val => setValues(val)}
            keyboardType="numeric"
            placeholder="X1,X2,X3,...Xn"
            multiline
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Input Frequencies (respectively):</Text>
          <TextInput
            style={styles.input}
            value={frequencies}
            onChangeText={val => setFrequencies(val)}
            keyboardType="numeric"
            placeholder="F1,F2,F3,...Fn"
            multiline
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={calculate}>
          <Icon type="font-awesome" name="clipboard" color="#fff" size={19} />
          <Text style={styles.btnText}>Calculate</Text>
        </TouchableOpacity>
        {table && <UngroupedDataSolution table={table} table2={table2} />}
        {table && (
          <TouchableOpacity style={styles.btn} onPress={saveWork}>
            <Icon type="font-awesome" name="save" color="#fff" size={19} />
            <Text style={styles.btnText}>Save Work</Text>
          </TouchableOpacity>
        )}
        {table && (
          <View style={styles.container2}>
            <BannerAd
              unitId={AdUnits.UG_BANNER_AD}
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{requestNonPersonalizedAdsOnly: true}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default UngroupedData;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    marginBottom: 4,
    color: '#616161',
  },
  inputView: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    height: 50,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#2196f3',
    borderRadius: 30,
  },
  btnText: {
    fontSize: 17,
    marginLeft: 8,
    color: '#fff',
  },
  tableTitle: {
    backgroundColor: '#e3f2fd',
  },
});
