import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: (callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    },
    set: vi.fn(),
    to: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({ kill: vi.fn(), start: 0, end: 1 })),
    maxScroll: vi.fn(() => 1000),
    refresh: vi.fn(),
  },
}));

describe('snoopy package experience', () => {
  it('renders a single non-autoplaying scroll video with all page sections', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /run a quiet place from your browser/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the video only moves when you do/i })).toBeInTheDocument();
    expect(screen.getAllByText(/package dashboard/i).length).toBeGreaterThan(0);
    expect(screen.getByText('snoopy-sunset')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Start Session$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Restart Session$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /questions & answers/i })).toBeInTheDocument();
    expect(screen.getByText(/stay in the loop/i)).toBeInTheDocument();

    const videos = screen.getAllByTestId('scroll-video');
    expect(videos).toHaveLength(1);
    expect(videos[0]).not.toHaveAttribute('autoplay');
    expect(videos[0]).not.toHaveAttribute('loop');
  });
});
