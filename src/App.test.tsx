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
  ScrollTrigger: { create: vi.fn(), refresh: vi.fn(), update: vi.fn() },
}));

vi.mock('lenis', () => ({
  default: class {
    on() {}
    raf() {}
    destroy() {}
  },
}));

describe('snoopy package experience', () => {
  it('renders package sections and a non-autoplaying scroll video', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /run a quiet place from your browser/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /the video only moves when you do/i })).toBeInTheDocument();
    expect(screen.getByText(/snoopy dashboard/i)).toBeInTheDocument();
    expect(screen.getByText('snoopy-sunset')).toBeInTheDocument();
    expect(screen.getByText('npx snoopy --breathe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Session', exact: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Restart Session', exact: true })).toBeInTheDocument();

    const video = screen.getByTestId('scroll-video');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).not.toHaveAttribute('loop');
  });
});
