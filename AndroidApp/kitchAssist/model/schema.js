import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'meal_list',
      columns: [
        {name: 'meal_name', type: 'string'}, 
        {name: 'time_info', type: 'string'}, 
        {name: 'description', type: 'string'},
        {name: 'recipe_info', type: 'string'}
      ]
    })
  ]
})