import { Route } from 'react-router-dom'
import { withAllContexts, withInvest, withRouter } from '../../tests/utils'
import InvestCity from '../InvestCity'
import { fakeAreas } from '../../tests/fakeAreas'
import { fakeCitys } from '../../tests/fakeCitys'
import { fakeGoods } from '../../tests/fakeGoods'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

describe('InvestCity', () => {
  const getAreas = jest.fn();
  const getCitys = jest.fn();
  const getGoods = jest.fn();


  beforeEach(() => {
    getAreas.mockImplementation(() => fakeAreas)
    getCitys.mockImplementation(() => fakeCitys)
    getGoods.mockImplementation(() => fakeGoods)

  })

  afterEach(() => {
    getAreas.mockReset();
    getCitys.mockReset();
    getGoods.mockReset();
  })

  it('renders correctly', async () => {
    const { asFragment } = renderInvestCity();

    await waitForElementToBeRemoved(screen.queryByText('Loading...'))
    expect(asFragment()).toMatchSnapshot();
  });

  it('d', () => {
    renderInvestCity();
    expect(screen.getByText('select')).toBeInTheDocument();

  })

  function renderInvestCity() {
    return render(
      withAllContexts(
        withInvest(withRouter(<Route path='/' element=
          {< InvestCity />} />)),
        getAreas,
        getCitys,
        getGoods
      ),
    )
  }
})

