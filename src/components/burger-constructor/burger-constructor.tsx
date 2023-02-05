import { ReactNode } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { ingredients } from '../../utils/data';

function BurgerConstructorBons(props : {ingredient: any; children: ReactNode}) {
    const {
        ingredient,
        children
    } = props;

    return <>
        <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ingredient.name} (верх)`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            extraClass="ml-8 mr-2"
        />
        {children}
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredient.name} (низ)`}
            price={ingredient.price}
            thumbnail={ingredient.image}
            extraClass="ml-8 mr-2"
        />
    </>
}

function BurgerConstructor() {
    return (
        <div className={`ml-4 mr-4 mt-25 ${styles.wrapper}`} >
            <div className={styles.layers}>
                <BurgerConstructorBons ingredient={ingredients.find(ingredient => ingredient.type === 'bun')}>
                    <ul className={styles.toppings}>
                        {
                            ingredients.filter(ingredient => ingredient.type !== 'bun').map(ingredient => {
                                return <li key={ingredient._id} className={styles.topping}>
                                    <DragIcon type="primary" />
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        extraClass="mr-2"
                                    />
                                </li>
                            })
                        }
                    </ul>
                </BurgerConstructorBons>

                <div className={`mt-10 mb-10 mr-4 ${styles.pricing}`}>
                    <span className="text text_type_digits-medium mr-2">12390</span>
                    <CurrencyIcon type="primary" />
                    <Button htmlType="button" type="primary" size="large" extraClass='ml-10'>
                        Нажми на меня
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructor;
