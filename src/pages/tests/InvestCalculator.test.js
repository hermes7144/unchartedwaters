import { screen, render } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withInvest, withRouter } from '../../tests/utils';
import renderer from 'react-test-renderer'
import InvestCalculator from '../../components/InvestCalculator';

describe('InvestCalculator', () => {
  afterEach(() => {

  })
  it('renders correctly', () => {
    const component = renderer.create(
      withInvest(
        withRouter(<Route path='/' element={<InvestCalculator />} />)
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  })
})