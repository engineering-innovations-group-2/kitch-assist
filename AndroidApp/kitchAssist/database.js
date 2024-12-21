import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './model/schema'
import MealList from './model/MealList' 

const adapter = new SQLiteAdapter({
  schema,
  onSetUpError: error => {
    console.log('Error while setting db up.', error.message)
  }
})

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    MealList
  ],
})