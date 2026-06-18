import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Buildora landing page', () => {
  it('renders without crashing and contains required sections', () => {
    const { container } = render(<App />);

    // 1. App renders without crashing (implied by getting past render)
    
    // 2. Sections exist
    ['about', 'services', 'pricing', 'contact'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // 3. Main CTA buttons render
    expect(screen.getByRole('button', { name: /start your project/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book consultation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request estimate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start full build/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send project inquiry/i })).toBeInTheDocument();

    // 4. Contact form fields render
    expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/How should we reach you\?/i)).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getByPlaceholderText(/City or Region/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us more about your project/i)).toBeInTheDocument();
  });
});
