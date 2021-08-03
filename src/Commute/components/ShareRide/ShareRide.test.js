/*global expect*/
/*global jest*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { COMMUTE_DASHBOARD_SHARE_RIDE } from '../../constants/NavigationalConstants.js'
import stores from '../../../Common/stores'
import { ShareRide } from '.'
describe('', () => {
   it('it should check whether the request details are getting posted or not ', () => {
      let history = createMemoryHistory()
      history.push(COMMUTE_DASHBOARD_SHARE_RIDE)
      const {
         getByPlaceholderText,
         getByRole,
         debug,
         getByTestId,
         getByLabelText
      } = render(
         <Provider {...stores}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_SHARE_RIDE}>
                  <ShareRide
                     onClickFlexibleTimings={() => {}}
                     onSubmitRequest={() => {}}
                     onChangeTime={() => {}}
                     onChangeFromTime={() => {}}
                     onChangeToTime={() => {}}
                     onChangeNoOfSeats={() => {}}
                     onChangeNoOfAssetsQuantity={() => {}}
                  />
               </Route>
            </Router>
         </Provider>
      )
      //debug();
      const testfrom = 'hyderabad'
      const testto = 'kurnool'
      let fromElement = getByLabelText('FROM*')
      let toElement = getByLabelText('TO*')
      fireEvent.change(fromElement, { target: { value: testfrom } })
      fireEvent.change(toElement, { target: { value: testto } })
      let dateElement = getByPlaceholderText('Select the date and time')
      fireEvent.change(dateElement, { target: { value: new Date() } })
      let flexibleTimingsElement = getByTestId('flexibleTimings')
      fireEvent.click(flexibleTimingsElement)
      let fromDateElement = getByPlaceholderText(
         'Select the from date and time'
      )
      let toDateElement = getByPlaceholderText('Select the to date and time')
      expect(fromDateElement).toBeInTheDocument()
      fireEvent.change(fromDateElement, { target: { value: new Date() } })
      expect(toDateElement).toBeInTheDocument()
      fireEvent.change(toDateElement, { target: { value: new Date() } })
      let noOfSeatsElements = getByTestId('no of seats')
      let noOfLuggagesElements = getByTestId('assets quantity')
      let decrementSeatsElement = getByTestId('decrement-button no of seats')
      let incrementSeatsElement = getByTestId('increment-button no of seats')
      let decrementAssetsQuanityElement = getByTestId(
         'decrement-button assets quantity'
      )
      let incrementAssetsQuanityElement = getByTestId(
         'increment-button assets quantity'
      )
      expect(noOfSeatsElements).toHaveTextContent(0)
      fireEvent.click(decrementSeatsElement)
      fireEvent.click(incrementSeatsElement)
      expect(noOfSeatsElements).toHaveTextContent(1)
      expect(noOfLuggagesElements).toHaveTextContent(0)
      fireEvent.click(decrementAssetsQuanityElement)
      fireEvent.click(decrementAssetsQuanityElement)
      fireEvent.click(incrementAssetsQuanityElement)
      expect(noOfLuggagesElements).toHaveTextContent(1)
      let shareRequestButton = getByRole('button', { name: 'SHARE' })
      fireEvent.click(shareRequestButton)
   })
})
