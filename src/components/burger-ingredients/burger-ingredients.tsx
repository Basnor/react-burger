import React, { useState, useRef, useEffect } from "react";
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import { IngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../services";
import BurgerIngredientsDraggableItem from "./burger-ingredients-draggable-item";

type IngredientTypeProps = {
  name: string;
  value: IngredientType;
};

const availableIngredientTabs: IngredientTypeProps[] = [
  {
    name: "Булки",
    value: IngredientType.Bun,
  },
  {
    name: "Соусы",
    value: IngredientType.Sause,
  },
  {
    name: "Начинки",
    value: IngredientType.Main,
  },
];

function IngredientTabs(props: {
  ingredientTypes: IngredientTypeProps[];
  activeTab: IngredientType;
  onToggle: (tab: string) => void;
}) {
  const { ingredientTypes, activeTab, onToggle } = props;

  const [current, setCurrent] = useState<string>(ingredientTypes[0].value);

  useEffect(() => {
    setCurrent(activeTab);
  }, [activeTab]);

  const handleClick = (tab: string) => {
    setCurrent(tab);
    onToggle(tab);
  };

  return (
    <div className={`${styles.tabs} mb-10`}>
      {ingredientTypes.map((tab) => {
        return (
          <Tab
            key={tab.value}
            value={tab.value}
            active={current === tab.value}
            onClick={() => handleClick(tab.value)}
          >
            {tab.name}
          </Tab>
        );
      })}
    </div>
  );
}

function BurgerIngredients() {
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const { ingredients } = useAppSelector(
    (store: RootState) => store.burgerIngredients
  );
  const [activeTab, setActiveTab] = useState<IngredientType>(
    IngredientType.Bun
  );

  useEffect(() => {
    if (!ingredientsRef.current) {
      return;
    }

    const tabs: Array<HTMLElement> = Array.from(
      ingredientsRef.current?.querySelectorAll("section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0, len = entries.length; i < len; i++) {
          if (entries[i].isIntersecting) {
            setActiveTab(entries[i].target.id as IngredientType);
          }
        }
      },
      { rootMargin: "0px 0px -75% 0px" }
    );

    for (let i = 0, len = tabs.length; i < len; i++) {
      observer.observe(tabs[i]);
    }

    return () => {
      for (let i = 0, len = tabs.length; i < len; i++) {
        observer.unobserve(tabs[i]);
      }
    };
  }, []);

  const handleTabToggle = (tab: string) => {
    if (!ingredientsRef.current) {
      return;
    }

    Array.from(ingredientsRef.current.children)
      .find((section) => section.id === tab)
      ?.scrollIntoView();
  };

  const filteredIngredients = (type: IngredientType) => {
    return ingredients.filter((ingredient) => ingredient.type === type);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <IngredientTabs
        ingredientTypes={availableIngredientTabs}
        activeTab={activeTab}
        onToggle={handleTabToggle}
      />

      <div ref={ingredientsRef} className={styles.ingredients}>
        {availableIngredientTabs.map((type) => {
          return (
            <section id={type.value} key={type.value}>
              <h2 className="text text_type_main-medium">{type.name}</h2>

              <div className={`${styles.group} mr-4 ml-4 mt-6 mb-10`}>
                {filteredIngredients(type.value).map((ingredient) => {
                  return (
                    <BurgerIngredientsDraggableItem 
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(BurgerIngredients);
