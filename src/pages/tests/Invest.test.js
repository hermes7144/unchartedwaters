import { render } from '@testing-library/react';
import { Route } from 'react-router-dom';
import Invest from '../Invest';
import { withAllContexts, withRouter } from '../../tests/utils';

describe('Invest', () => {
  const fakelogin = jest.fn();
  const fakelogout = jest.fn();
  const fakeUser = jest.fn();

  afterEach(() => {
    fakelogin.mockReset();
    fakelogout.mockReset();
    fakeUser.mockReset();
  })
  it('renders correctly', () => {
    fakelogin.mockImplementation({ user: 'user' });
    fakelogout.mockImplementation();
    fakeUser.mockImplementation({ user: 'user' });
    render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<Invest />} />
        )
        , fakelogin, fakelogout, fakeUser
      )
    )
  })
})