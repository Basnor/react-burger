import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/types";

interface BurgerConstructorState {
  chosenIngredients: (IIngredient & { uid: string })[];
}

const initialState: BurgerConstructorState = {
  chosenIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addBurgerIngredient: (
      state,
      action: PayloadAction<{ ingredient: IIngredient & { uid: string } }>
    ) => {
      const { ingredient } = action.payload;

      state.chosenIngredients.push(ingredient);
    },
    removeBurgerIngredient: (
      state,
      action: PayloadAction<{ ingredient: IIngredient & { uid: string  }}>
    ) => {
      const { ingredient } = action.payload;

      state.chosenIngredients = state.chosenIngredients.filter(
        (choosenIngredient) => choosenIngredient.uid !== ingredient.uid
      );
    },
    moveBurgerIngredient: (
      state,
      action: PayloadAction<{ newIndex: number; oldIndex: number }>
    ) => {
      const { newIndex, oldIndex } = action.payload;

      state.chosenIngredients.splice(
        newIndex,
        0,
        state.chosenIngredients.splice(oldIndex, 1)[0]
      );
    },
    resetBurgerIngredients: () => {
      return initialState;
    },
  },
});

export default burgerConstructorSlice.reducer;
