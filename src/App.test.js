import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Beer Beer', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('renders beer beer homepage', () => {
    expect(screen.getByText(/welcome to beer beer!/i)).toBeInTheDocument();
  });

  test('clicking home button should bring the user to homepage', () => {
    userEvent.click(screen.getByText('Home'));
    expect(screen.getByText(/welcome to beer beer!/i)).toBeInTheDocument();
  })

  test('clicking breweries should first give a page with no results', () => {
    userEvent.click(screen.getByText('Breweries'));
    expect(screen.getByText(/no search results to brew/i)).toBeInTheDocument();
  })
})
