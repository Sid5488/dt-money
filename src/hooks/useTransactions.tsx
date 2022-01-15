import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransanctionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface ITransactionProviderProps {
    children: ReactNode;
}

interface ITransactionsContextData {
    transactions: ITransaction[];
    createTransaction: (transaction: TransanctionInput) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContextData>(
    {} as ITransactionsContextData
);

export const TransactionProvider = ({ children }: ITransactionProviderProps) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    const createTransaction = async (transactionInput: TransanctionInput) => {
        const response = await api.post('/api/transactions', { 
            ...transactionInput, 
            createdAt: new Date() 
        });

        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    };

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            { children }
        </TransactionsContext.Provider>
    );
};

export const useTransaction = () => {
    const context = useContext(TransactionsContext);

    return context;
};
