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
    create: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock('lenis', () => ({
  default: class {
    on() {}
    raf() {}
    destroy() {}
  },
}));

describe('The Last Quiet Place', () => {
  it('renders the complete scroll story and controls', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /the last\s*quiet place/i })).toBeInTheDocument();
    expect(screen.getByText(/we keep moving/i)).toBeInTheDocument();
    expect(screen.getByText(/above all of it/i)).toBeInTheDocument();
    expect(screen.getByText(/not everything/i)).toBeInTheDocument();
    expect(screen.getByText(/stay for a while/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /begin the journey/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /restart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sound is off/i })).toBeInTheDocument();
  });
});
