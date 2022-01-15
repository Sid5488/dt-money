import logo from '../../assets/logo.svg';

import { Container, Content } from './styles';

interface IHeaderProp {
    onOpenNewTransactionModal: () => void;
}

const Header = ({ onOpenNewTransactionModal }: IHeaderProp) => {
    return (
        <Container>
            <Content>
                <img src={ logo } alt="dtmoney logo" />

                <button onClick={ onOpenNewTransactionModal } type="button">
                    Nova Transação
                </button>
            </Content>
        </Container>      
    );
};

export { Header };
