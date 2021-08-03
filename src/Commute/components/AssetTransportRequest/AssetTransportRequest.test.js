/*global expect*/
/*global jest*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { COMMUTE_DASHBOARD_ASSET_REQUEST } from '../../constants/NavigationalConstants.js'

import authStore from '../../../Common/stores'

import commuteStore from '../../../Common/stores'
import { AssetTransportRequest } from '.'
describe('', () => {
   it('it should check whether the request details are getting posted or not ', () => {
      let history = createMemoryHistory()
      history.push(COMMUTE_DASHBOARD_ASSET_REQUEST)
      const {
         getByPlaceholderText,
         getByRole,
         debug,
         getByTestId,
         getByLabelText
      } = render(
         <Provider authStore={authStore} commuteStore={commuteStore}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_ASSET_REQUEST}>
                  <AssetTransportRequest
                     onClickFlexibleTimings={() => {}}
                     onSubmitRequest={() => {}}
                  />
               </Route>
            </Router>
         </Provider>
      )
      //debug();
      const testfrom = 'hyderabad'
      const testto = 'kurnool'
      const testAssetType = 'Bags'
      const testAssetSensitivity = 'VERY SENSITIVE'
      let rideRequestButton = getByRole('button', { name: 'REQUEST' })
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
      let noOfSeatsElements = getByTestId('no of assets')
      let decrementSeatsElement = getByTestId('decrement-button no of assets')
      let incrementSeatsElement = getByTestId('increment-button no of assets')
      expect(noOfSeatsElements).toHaveTextContent(0)
      fireEvent.click(incrementSeatsElement)
      expect(noOfSeatsElements).toHaveTextContent(1)
      let assetType = getByLabelText('ASSET TYPE*')
      fireEvent.change(assetType, { data: { value: testAssetType } })
      let assetSensitivity = getByLabelText('ASSET SENSITIVITY*')
      fireEvent.change(assetSensitivity, {
         data: { value: testAssetSensitivity }
      })
      fireEvent.click(rideRequestButton)
   })
})
