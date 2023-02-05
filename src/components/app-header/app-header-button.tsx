import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeaderButton(props: any) {
    return (
        <Button 
            disabled={props.disabled}
            htmlType="button" 
            type="secondary" 
            size="large" 
            style={{
                ...props.style,
                display: 'inline-flex'
            }}
            extraClass={`pl-5 pr-4 pb-5 pt-4 mb-4 mt-4 ${props.extraClass}`}
        >
            {props.icon}
            <span className="pl-2">
                {props.name}
            </span>
        </Button>
    );
}

export default AppHeaderButton;
