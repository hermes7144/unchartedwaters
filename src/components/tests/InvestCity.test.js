import { Route } from 'react-router-dom'
import { withAllContexts, withInvest, withRouter } from '../../tests/utils'
import InvestCity from '../InvestCity'
import { fakeAreas } from '../../tests/fakeAreas'
import { fakeCitys } from '../../tests/fakeCitys'
import { fakeGoods } from '../../tests/fakeGoods'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('InvestCity', () => {
  const getAreas = jest.fn();
  const getCitys = jest.fn();
  const getGoods = jest.fn();

  afterEach(() => {
    getAreas.mockReset();
    getCitys.mockReset();
    getGoods.mockReset();
  })

  it('renders correctly', async () => {
    getAreas.mockImplementation(() => fakeAreas)
    getCitys.mockImplementation(() => fakeCitys)
    getGoods.mockImplementation(() => fakeGoods)

    const { asFragment } = renderInvestCity();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'))
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders select box correctly', async () => {
    getAreas.mockImplementation(() => fakeAreas)
    getCitys.mockImplementation(() => fakeCitys)
    getGoods.mockImplementation(() => fakeGoods)

    renderInvestCity();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'))

    userEvent.selectOptions(
      // Find the select element
      screen.getByLabelText('해역'),
      // Find and select the Ireland option
      screen.getByRole('option', { name: '북해' }),
    )
    expect(screen.getByRole('option', { name: '북해' }).selected).toBe(true)
  })

  it('renders city goods', async () => {
    getAreas.mockImplementation(() => fakeAreas)
    getCitys.mockImplementation(() => fakeCitys)
    getGoods.mockImplementation(() => fakeGoods)

    renderInvestCity();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'))


    const selectElement = screen.getByLabelText('도시');
    userEvent.selectOptions(selectElement, '리스본');
    const selectedOption = screen.getByRole('option', { name: '리스본' });
    expect(selectedOption.selected).toBeTruthy();
  })

  it('renders city goods snapshot', async () => {
    getAreas.mockImplementation(() => fakeAreas)
    getCitys.mockImplementation(() => fakeCitys)
    getGoods.mockImplementation(() => fakeGoods)

    const { asFragment } = renderInvestCity();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'))

    const selectElement = screen.getByLabelText('도시');
    userEvent.selectOptions(selectElement, '리스본');

    expect(asFragment()).toMatchSnapshot();

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

