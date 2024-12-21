import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class MealList extends Model {
  static table = 'meal_list'
  
  @text('meal_name') mealName
  @text('time_info') timeInfo
  @text('description') description
  @text('recipe_info') recipeInfos
}