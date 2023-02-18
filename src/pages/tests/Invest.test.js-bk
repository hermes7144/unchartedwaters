import Invest from '../Invest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Invest', () => {

  it('init', () => {
    const { moneyMono, countMono, rapaelMono } = setup();

    expect((moneyMono.value)).toBe('');
    expect((countMono.value)).toBe('');
    expect((rapaelMono.value)).toBe('');
  })

  it('calculate correctly', () => {
    const { target, current, moneyMono, moneyNonMono, countMono, rapaelMono } = setup();

    fireEvent.change(target, { target: { value: 200 } });
    fireEvent.change(current, { target: { value: 100 } });

    expect((moneyMono.value)).toBe('1000');
    expect((moneyNonMono.value)).toBe('2000');
    expect((countMono.value)).toBe('1번 0칸');
    expect((rapaelMono.value)).toBe('1번 5칸');
  })
});

const setup = () => {
  render(<Invest />)
  const target = screen.getByLabelText('target')
  const current = screen.getByLabelText('current')
  const moneyMono = screen.getByLabelText('moneyMono');
  const moneyNonMono = screen.getByLabelText('moneyNonMono');
  const countMono = screen.getByLabelText('countMono');
  const rapaelMono = screen.getByLabelText('rapaelMono');
  return { target, current, moneyMono, moneyNonMono, countMono, rapaelMono }
}