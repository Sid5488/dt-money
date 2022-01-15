import { useTransaction } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';


import { Container } from './styles';

const Summary = () => {
    const { transactions } = useTransaction();

    const sumarry = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraw: 0,
        total: 0
    });

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>

                    <img src={ incomeImg } alt="Entradas" />
                </header>

                <strong>
                    { Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(sumarry.deposits) }
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>

                    <img src={ outcomeImg } alt="Saídas" />
                </header>

                <strong>
                    - { Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(sumarry.withdraw) }
                </strong>
            </div>

            <div className="hilight-background">
                <header>
                    <p>Total</p>

                    <img src={ totalImg } alt="Total" />
                </header>

                <strong>
                    { Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(sumarry.total) }
                </strong>
            </div>
        </Container>
    );
};

export { Summary };
