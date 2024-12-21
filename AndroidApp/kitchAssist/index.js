/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './model/schema'
import MealList from './model/MealList' 
import 'react-native-gesture-handler';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  onSetUpError: error => {
    console.log('Error while setting db up.', error.message)
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    MealList
  ],
})

AppRegistry.registerComponent(appName, () => App);
