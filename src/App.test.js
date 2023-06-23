import { render, screen } from '@testing-library/react';
import App from './App';

describe('Beer Beer', () => {
  test('renders beer beer homepage', () => {
    render(<App />);
    expect(screen.getByText(/welcome to beer beer!/i)).toBeInTheDocument();
  });
})
