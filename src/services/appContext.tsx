import React, { createContext } from "react";

import { IIngredient } from "../utils/types";

export const IngredientsContext = createContext<IIngredient[]>([]);
