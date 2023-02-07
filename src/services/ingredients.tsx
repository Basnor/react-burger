import { INGREDIENTS_URL } from "../utils/contants";
import { IngredientType } from "../utils/enums";

export interface Ingredient {
  _id: string,
  name: string,
  type: IngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

class IngredientsService {
  async getIngredientsList(): Promise<Ingredient[]> {
    return await fetch(INGREDIENTS_URL)
      .then(res => res.json())
      .then(data => data.data)
  }
}

export default new IngredientsService();