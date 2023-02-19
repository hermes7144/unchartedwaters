import { screen, render } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withInvest, withRouter } from '../../tests/utils';
import renderer from 'react-test-renderer'
import InvestCalculator from '../InvestCalculator';

describe('InvestCalculator', () => {
  afterEach(() => {

  })
  it('renders correctly', () => {
    const component = renderer.create(
      withInvest(withRouter(<Route path='/' element={<InvestCalculator />} />))
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('renders result correctly', () => {
    const target = 500;
    const current = 200;
    render(
      withInvest(withRouter(<Route path='/' element={<InvestCalculator />} />), target, current)
    );
    expect(screen.getByDisplayValue('3000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1번 10칸')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3번 0칸')).toBeInTheDocument();
  })
})