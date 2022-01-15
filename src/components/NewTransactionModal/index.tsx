import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransaction } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface INewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const NewTransactionModal = ({ isOpen, onRequestClose }: INewTransactionModalProps) => {
    const { createTransaction } = useTransaction();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');

        onRequestClose();
    };

    return (
        <Modal
            isOpen={ isOpen } 
            onRequestClose={ onRequestClose }
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={ onRequestClose }
                className="react-modal-close" 
            >
                <img src={ closeImg } alt="Fechar modal" />
            </button>

            <Container onSubmit={ handleCreateNewTransaction }>
                <h2>Cadastrar Transação</h2>

                <input 
                    type="text" 
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                    placeholder="Título"
                />
                <input 
                    type="number"
                    value={ amount }
                    onChange={ event => setAmount(Number(event.target.value)) }
                    placeholder="Valor" 
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        activeColor="green"
                        isActive={ type === 'deposit' } 
                        onClick={ () => setType('deposit') }
                    >
                        <img src={ incomeImg } alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button"
                        activeColor="red"
                        isActive={ type === 'withdraw' } 
                        onClick={ () => setType('withdraw') }
                    >
                        <img src={ outcomeImg } alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    type="text"
                    value={ category } 
                    onChange={ event => setCategory(event.target.value) }
                    placeholder="categoria" 
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
};

export { NewTransactionModal };
