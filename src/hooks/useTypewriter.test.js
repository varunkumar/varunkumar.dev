import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useTypewriter from './useTypewriter.js';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reveals the full string after the delay and interval ticks', () => {
    const { result } = renderHook(() => useTypewriter('hi', 10, 20));

    expect(result.current.displayed).toBe('');
    expect(result.current.done).toBe(false);

    act(() => {
      vi.advanceTimersByTime(20);
    });
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(result.current.displayed).toBe('h');
    expect(result.current.done).toBe(false);

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(result.current.displayed).toBe('hi');
    expect(result.current.done).toBe(true);
  });
});
