import { Summary } from '../Summary';
import { TransactionTable } from '../TransactionTable';

import { Container } from './styles';

const Dashboard = () => {
  return (
    <Container>
      <Summary></Summary>
      <TransactionTable></TransactionTable>
    </Container>
  );
};

export { Dashboard };
