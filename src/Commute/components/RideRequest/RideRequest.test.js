/*global expect*/
/*global jest*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { COMMUTE_DASHBOARD_RIDE_REQUEST } from '../../constants/NavigationalConstants.js'

import stores from '../../../Common/stores'
import { RideRequest } from '.'
describe('', () => {
   it('it should check whether the request details are getting posted or not ', () => {
      let history = createMemoryHistory()
      history.push(COMMUTE_DASHBOARD_RIDE_REQUEST)
      const {
         getByPlaceholderText,
         getByRole,
         debug,
         getByTestId,
         getByLabelText
      } = render(
         <Provider {...stores}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_RIDE_REQUEST}>
                  <RideRequest
                     onClickFlexibleTimings={() => {}}
                     onSubmitRequest={() => {}}
                     onChangeTime={() => {}}
                     onChangeFromTime={() => {}}
                     onChangeToTime={() => {}}
                     onChangeNoOfSeats={() => {}}
                     onChangeNoOfLuggages={() => {}}
                  />
               </Route>
            </Router>
         </Provider>
      )
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
      let noOfLuggagesElements = getByTestId('no of luggages')
      let decrementSeatsElement = getByTestId('decrement-button no of seats')
      let incrementSeatsElement = getByTestId('increment-button no of seats')
      let decrementLuggagessElement = getByTestId(
         'decrement-button no of luggages'
      )
      let incrementLuggagesElement = getByTestId(
         'increment-button no of luggages'
      )
      expect(noOfSeatsElements).toHaveTextContent(0)
      fireEvent.click(decrementSeatsElement)
      fireEvent.click(incrementSeatsElement)
      expect(noOfSeatsElements).toHaveTextContent(1)
      expect(noOfLuggagesElements).toHaveTextContent(0)
      fireEvent.click(decrementLuggagessElement)
      fireEvent.click(decrementLuggagessElement)
      fireEvent.click(incrementLuggagesElement)
      expect(noOfLuggagesElements).toHaveTextContent(1)
      let rideRequestButton = getByRole('button', { name: 'REQUEST' })
      fireEvent.click(rideRequestButton)
   })
})
