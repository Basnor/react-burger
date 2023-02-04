import { useState, useRef } from 'react';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../utils/data';

type ingredientTypeProps = {
    name: string,
    value: string
}

const ingredientTypes: ingredientTypeProps[] = [
    {
        name: "Булки",
        value: 'bun'
    },
    {
        name: "Соусы",
        value: 'sauce'
    },
    {
        name: "Начинки",
        value: 'main'
    },
]

function IngredientTabs(props: {ingredientTypes: ingredientTypeProps[], onToggle: (tab: string) => void}) {
    const {
        ingredientTypes,
        onToggle
    } = props;

    const [current, setCurrent] = useState<string>(ingredientTypes[0].value);

    const handleClick = (tab : string) => {
        setCurrent(tab);
        onToggle(tab);
    }

    return (
        <div style={{ display: 'flex' }} className="mb-10">
            {
                ingredientTypes.map(tab => {
                    return <Tab key={tab.value} value={tab.value} active={current === tab.value} onClick={() => handleClick(tab.value)}>
                        {tab.name}
                    </Tab>
                })
            }
        </div>
    )
}

function IngredientItem(props: {ingredient: any, amount?: number}) {
    const {
        ingredient,
        amount
    } = props;

    return (
        <div 
            style={{
                position: 'relative',
                width: '272px',
                height: '208px',
                textAlign: 'center'
            }} 
        >
            {
                amount && <Counter count={amount} size="default" extraClass="m-1" />
            }
            <img src={ingredient.image} className="pl-4 pr-4" alt={ingredient.name} />
            <div className="mt-1 mb-1" style={{display: 'inline-flex'}}>
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
    );
}

function BurgerIngredients() {
    const ingredientsRef = useRef<HTMLDivElement>(null);

    const handleTabToggle = (tab : string) => {
        if (!ingredientsRef.current) {
            return;
        }

        Array.from(ingredientsRef.current.children).find((section)=> section.id === tab)?.scrollIntoView();
    }

    return (
        <div style={{
            maxWidth: '600px',
            maxHeight: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }} >
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

            <IngredientTabs ingredientTypes={ingredientTypes} onToggle={handleTabToggle}/>

            <div ref={ingredientsRef} style={{overflowY: "scroll", maxHeight: '100%'}}>
                {
                    ingredientTypes.map(type => {
                        return <section id={type.value} key={type.value}>
                            <h2 className="text text_type_main-medium">{type.name}</h2>

                            <div className="mr-4 ml-4 mt-6 mb-10" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '24px', rowGap: '32px'}}>
                                {
                                    ingredients.filter(ingredient => ingredient.type === type.value).map((ingredient => {
                                        return <IngredientItem key={ingredient._id} ingredient={ingredient}/>
                                    }))
                                }
                            </div>
                        </section>
                    })
                }
            </div>
        </div>
    );
}

export default BurgerIngredients;
