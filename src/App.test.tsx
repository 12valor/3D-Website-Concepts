import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('gsap', () => {
  const timeline = {
    to: vi.fn().mockReturnThis(),
    scrollTrigger: null,
  };

  return {
    default: {
    registerPlugin: vi.fn(),
    context: (callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    },
    set: vi.fn(),
    timeline: vi.fn(() => timeline),
    utils: { toArray: vi.fn(() => []) },
  },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { refresh: vi.fn() },
}));

describe('snoopy package experience', () => {
  it('renders package sections and a non-autoplaying scroll video', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /run a quiet place from your browser/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the video only moves when you do/i })).toBeInTheDocument();
    expect(screen.getAllByText(/package dashboard/i).length).toBeGreaterThan(0);
    expect(screen.getByText('snoopy-sunset')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Start Session$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Restart Session$/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/scroll progress/i)).not.toBeInTheDocument();

    const video = screen.getByTestId('scroll-video');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).not.toHaveAttribute('loop');
  });
});
