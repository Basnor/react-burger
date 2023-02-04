import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const ingredientTypes = [
    {
        title: "Булки",
        value: 'bun'
    },
    {
        title: "Соусы",
        value: 'sauce'
    },
    {
        title: "Начинки",
        value: 'main'
    },
]

const Tabs = (props: any) => {
    const [current, setCurrent] = useState(ingredientTypes[0].value);

    useEffect(() => {
        props.onChange(current);
    });

    return (
        <div style={{ display: 'flex' }}>
            {
                ingredientTypes.map(tab => {
                    return <Tab value={tab.value} active={current === tab.value} onClick={setCurrent}>
                        {tab.title}
                    </Tab>
                })
            }
        </div>
    )
}

function BurgerIngredients() {
    const [ingredients, setIngredients] = useState();

    const ref = useRef(null);

    const handleScroll = (ch: any) => {
        let arr  : any = ref.current;

        if (arr.children) {
            let ref1: any = Array.from(arr.childNodes).find((r : any)=> r.id === ch)

            ref1.scrollIntoView() 
        }
    }

    return (
        <>
            <h1>Соберите бургер</h1>

            <Tabs onChange={handleScroll}/>

            <div ref={ref} style={{maxHeight: '800px', overflowY: "scroll"}}>
                {
                    ingredientTypes.map(type => {
                        return <section id={type.value} style={{height: '2000px'}}>
                            {type.title}
                        </section>
                    })
                }
            </div>
        </>
    );
}

export default BurgerIngredients;
