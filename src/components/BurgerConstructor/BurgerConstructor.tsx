import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../utils/data';


function BonElements(props : any) {
    const {
        bon,
        children
    } = props;

    return <>
        <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bon.name} (верх)`}
            price={bon.price}
            thumbnail={bon.image}
            extraClass="ml-8 mr-2"
        />
        <div style={{overflowY: "scroll", display: 'flex', flexDirection: 'column', rowGap: '16px'}}>
            {children}
        </div>
        <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bon.name} (низ)`}
            price={bon.price}
            thumbnail={bon.image}
            extraClass="ml-8 mr-2"
        />
    </>
}

function BurgerConstructor() {

    return (
        <div className="ml-4 mr-4 mt-25" style={{
            maxWidth: '600px',
            maxHeight: 'inherit'
        }} >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '100%' }}>
                <BonElements bon={ingredients.find(ingredient => ingredient.type === 'bun')}>
                    {
                        ingredients.filter(ingredient => ingredient.type !== 'bun').map(ingredient => {
                            return <div key={ingredient._id} style={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    extraClass="mr-2"
                                />
                            </div>
                        })
                    }
                </BonElements>

                <div className='mt-10 mb-10 mr-4' style={{ display: 'flex', maxHeight: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
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
