import React, { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import { IngredientType } from "../../utils/types";
import { IngredientTypeProps } from "./burger-ingredients";

interface BurgerIngredientsTabsProps {
  ingredientTypes: IngredientTypeProps[];
  observableRef: React.RefObject<HTMLDivElement>;
}

function BurgerIngredientsTabs(props: BurgerIngredientsTabsProps) {
  const { ingredientTypes, observableRef } = props;

  const [current, setCurrent] = useState<string>(IngredientType.Bun);

  useEffect(() => {
    if (!observableRef.current) {
      return;
    }

    const tabs: Array<HTMLElement> = Array.from(
      observableRef.current?.querySelectorAll("section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0, len = entries.length; i < len; i++) {
          if (entries[i].isIntersecting) {
            setCurrent(entries[i].target.id as IngredientType);
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

  const handleClick = (tab: string) => {
    if (!observableRef.current) {
      return;
    }

    Array.from(observableRef.current.children)
      .find((section) => section.id === tab)
      ?.scrollIntoView();

    setCurrent(tab);
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

export default BurgerIngredientsTabs;
