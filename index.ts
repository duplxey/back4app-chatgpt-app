import 'expo-router/entry';

import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
// Make sure to replace the 'APPLICATION_ID' and 'JAVASCRIPT_KEY' with your own keys.
Parse.initialize('XwiGSmgni7dhthQh8JebF4lUQu50OJTMOERol6Nf', 'LLwiuybFncXKNx8q7yLh8Cpr2qayGldRxZN1xnsi');
Parse.serverURL = 'https://parseapi.back4app.com/';