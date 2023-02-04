import './AppHeader.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderButton from './AppHeaderButton';

function AppHeader() {
    return (
        <header>
            <nav>
                <ul style={{textAlign: 'start'}}>
                    <li>
                        <AppHeaderButton 
                            name="Конструктор" 
                            icon={<BurgerIcon type="primary"/>}
                            extraClass="mr-2"
                            style={{
                                color: 'white'
                            }}
                        />
                    </li>
                    <li>
                        <AppHeaderButton 
                            disabled
                            name="Лента заказов" 
                            icon={<ListIcon type="secondary" />}
                        />
                    </li>
                </ul>
                <ul style={{textAlign: 'center'}}>
                    <li>
                        <Logo />
                    </li>
                </ul>
                <ul style={{textAlign: 'end'}}>
                    <li>
                        <AppHeaderButton 
                            disabled
                            name="Личный кабинет" 
                            icon={<ProfileIcon type="secondary" />}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
