import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

jest.mock('next/router', () => require('next-router-mock')); 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
 
    const heading = screen.getByRole('heading', {
      name: "Hello",
    });
 
    expect(heading).toBeInTheDocument();
  });
});