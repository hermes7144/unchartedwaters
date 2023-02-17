import { Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { withRouter } from '../../tests/utils'
import Navbar from '../Navbar'

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<Navbar />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
})