import { describe, it, expect } from 'vitest';

function suma(a: string, b: string) {
    return a + b;
  }

describe('Suma', () => {
  it('Testing', () => {
    expect(suma("Success", " test")).toBe("Success test");
  });
});