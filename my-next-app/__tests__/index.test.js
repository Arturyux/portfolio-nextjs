import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('renders TODO list header', () => {
  render(<Home initialTodos={[]} />);
  expect(screen.getByText('TODO List')).toBeInTheDocument();
});