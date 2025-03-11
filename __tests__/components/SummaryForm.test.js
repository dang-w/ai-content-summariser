import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../../src/components/SummaryForm';

describe('SummaryForm', () => {
  it('renders the form correctly', () => {
    const mockSubmit = jest.fn();
    render(<SummaryForm onSubmit={mockSubmit} />);

    expect(screen.getByText('Enter text to summarise:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Summarise' })).toBeInTheDocument();
  });

  it('switches between text and URL input', () => {
    const mockSubmit = jest.fn();
    render(<SummaryForm onSubmit={mockSubmit} />);

    // Initially shows text input
    expect(screen.getByLabelText('Enter text to summarise:')).toBeInTheDocument();

    // Click URL button
    fireEvent.click(screen.getByRole('button', { name: 'URL' }));

    // Now shows URL input
    expect(screen.getByLabelText('Enter URL to summarise:')).toBeInTheDocument();
  });
});
