/*global expect*/
/*global jest*/

/* Mocking js-cookie library */

import Cookie from 'js-cookie'

import {
   API_INITIAL,
   API_SUCCESS,
   API_FAILED,
   API_FETCHING
} from '@ib/api-constants'

import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'
import matchedRideRequests from '../../fixtures/matchedRideRequests.fixture.json'
import matchingAssetsRequests from '../../fixtures/matchedAssetRequests.fixture.json'
import sharedRides from '../../fixtures/sharedRide.fixture.json'
import travelInfoData from '../../fixtures/sharedTravelInfo.fixture.json'

import { CommuteStore } from './CommuteStore.js'
import { CommuteService } from '../../services/CommuteService/CommuteService.fixture.js'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('Commute Store Tests', () => {
   let commuteService
   let commuteStore

   beforeEach(() => {
      commuteService = new CommuteService()
      commuteStore = new CommuteStore(commuteService)
   })
   it('should test initialising commuteStore store', () => {
      expect(commuteStore.getRideRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getRideRequestAPIError).toBeNull()
      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBeNull()
      expect(commuteStore.getShareRideAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getShareRideAPIError).toBeNull()
      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getShareTravelInfoAPIError).toBeNull()
      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyRideRequestAPIError).toBeNull()
      expect(commuteStore.rideRequests).toEqual(expect.any(Array))
      expect(commuteStore.noOfRideRequests).toEqual(0)
      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyAssetRequestAPIError).toBeNull()
      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMatchingRequestAPIError).toBeNull()
   })
   it('should test postRideRequest fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.rideRequestAPI = mockPostRideRequest
      commuteStore.postRideRequest()
      expect(commuteStore.getRideRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getRideRequestAPIError).toBe(null)
   })

   it('it should test postRideRequest failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.rideRequest = mockpostRideRequest
      commuteStore.postRideRequest()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getRideRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test postRideRequest success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('postRideRequest')
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.rideRequestAPI = mockPostRideRequest

      await commuteStore.postRideRequest()

      expect(commuteStore.getRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getRideRequestAPIError).toBe(null)
   })
   it('should test postAssetTransportRequest  fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.assetTransportRequestAPI = mockPostRideRequest
      commuteStore.postAssetTransportRequest()
      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe(null)
   })

   it('it should test postAssetTransportRequest failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.assetTransportRequestAPI = mockpostRideRequest
      commuteStore.postAssetTransportRequest()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getAssetTrasportRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test postAssetTransportRequest success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('assetTransportRequest')
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.assetTransportRequestAPI = mockPostRideRequest

      await commuteStore.postAssetTransportRequest()

      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe(null)
   })
   it('should test shareRideInfo fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.shareRideInfoAPI = mockPostRideRequest
      commuteStore.shareRideInfo()
      expect(commuteStore.getShareRideAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getShareRideAPIError).toBe(null)
   })

   it('it should test shareRideInfo failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.shareRideInfoAPI = mockpostRideRequest
      commuteStore.shareRideInfo()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getShareRideAPIError).toBe(API_FAILED)
      })
   })

   it('should test shareRideInfo success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('shareRide')
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.shareRideInfoAPI = mockPostRideRequest

      await commuteStore.shareRideInfo()

      expect(commuteStore.getShareRideAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getShareRideAPIError).toBe(null)
   })
   it('should test shareTravelInfo fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest
      commuteStore.shareTravelInfo()
      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getShareTravelInfoAPIError).toBe(null)
   })

   it('it should test shareTravelInfo failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.shareTravelInfoAPI = mockpostRideRequest
      commuteStore.shareTravelInfo()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getShareTravelInfoAPIError).toBe(API_FAILED)
      })
   })

   it('should test shareTravelInfo success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve('travel Info')
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest

      await commuteStore.shareTravelInfo()

      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getShareTravelInfoAPIError).toBe(null)
   })
   it('should test get MyRide Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.myRideRequestsAPI = mockPostRideRequest
      commuteStore.getMyRideRequests()
      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMyRideRequestAPIError).toBe(null)
   })

   it('it should test  MyRide Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.myRideRequestsAPI = mockpostRideRequest
      commuteStore.getMyRideRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMyRideRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  MyRide Requests  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(rideRequestData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.myRideRequestsAPI = mockPostRideRequest

      await commuteStore.getMyRideRequests()

      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMyRideRequestAPIError).toBe(null)
      expect(commuteStore.displayData.myRequests.rideRequests).toStrictEqual(
         rideRequestData.ride_requests
      )
      expect(
         commuteStore.displayData.myRequests.noOfRideRequests
      ).toStrictEqual(rideRequestData.total_ride_requests_count)
   })
   it('should test get My Asset Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.myAssetRequestsAPI = mockPostRideRequest
      commuteStore.getMyAssetRequests()
      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMyAssetRequestAPIError).toBe(null)
   })

   it('it should test  My Asset Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.myAssetRequestsAPI = mockpostRideRequest
      commuteStore.getMyAssetRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMyAssetRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  My Asset Requests  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(assetRequestData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.myAssetRequestsAPI = mockPostRideRequest

      await commuteStore.getMyAssetRequests()

      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMyAssetRequestAPIError).toBe(null)
      expect(commuteStore.displayData.myRequests.assetRequests).toEqual(
         assetRequestData.asset_requests
      )
      expect(commuteStore.displayData.myRequests.noOfAssetRequests).toBe(
         assetRequestData.total_asset_tansport_count
      )
   })
   it('should test get Matching  Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.matchingAllRequestsAPI = mockPostRideRequest
      commuteStore.getAllMatchingRequests()
      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMatchingRequestAPIError).toBe(null)
   })

   it('it should test   get Matching Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.matchingAllRequestsAPI = mockpostRideRequest
      commuteStore.getAllMatchingRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMatchingRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  get Matching Ride Requests success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(matchedRideRequests)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.matchingAllRequestsAPI = mockPostRideRequest

      await commuteStore.getAllMatchingRequests('RIDE', { limit: 0, offset: 4 })

      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMatchingRequestAPIError).toBe(null)
      expect(commuteStore.displayData.matchingResults.rideRequests).toEqual(
         matchedRideRequests.ride_requests
      )
      expect(commuteStore.displayData.matchingResults.noOfRideRequests).toEqual(
         matchedRideRequests.ride_requests_matches_count
      )
   })
   it('should test get Shared Ride  Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.sharedRideAPI = mockPostRideRequest
      commuteStore.getSharedRides({ limit: 4, offset: 0 })
      expect(commuteStore.getSharedRidesStatus).toBe(API_FETCHING)
      expect(commuteStore.getSharedRidesError).toBe(null)
   })

   it('it should test   get  Shared failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.sharedRideAPI = mockpostRideRequest
      commuteStore.getSharedRides({ limit: 4, offset: 0 })
      mockFailurePromise.catch(e => {
         expect(commuteStore.getSharedRidesError).toBe(API_FAILED)
      })
   })

   it('should test  get Shared Ride success state', async () => {
      let rides = {
         shared_rides: sharedRides.ride_shares,
         count_of_ride_shares: sharedRides.count_of_ride_shares
      }
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(rides)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.sharedRideAPI = mockPostRideRequest

      await commuteStore.getSharedRides({ limit: 4, offset: 0 })

      expect(commuteStore.getSharedRidesStatus).toBe(API_SUCCESS)
      expect(commuteStore.getSharedRidesError).toBe(null)
      expect(commuteStore.displayData.sharedDetails.sharedRides).toEqual(
         rides.shared_rides
      )
      expect(commuteStore.displayData.sharedDetails.noOfSharedRides).toEqual(
         rides.count_of_ride_shares
      )
   })
   it('should test get Shared Travel info  fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest
      commuteStore.getSharedTravelInfo({ limit: 4, offset: 0 })
      expect(commuteStore.getTravelInfoAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getTravelInfoAPIError).toBe(null)
   })

   it('it should test   get  Shared failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.shareTravelInfoAPI = mockpostRideRequest
      commuteStore.getSharedTravelInfo({ limit: 4, offset: 0 })
      mockFailurePromise.catch(e => {
         expect(commuteStore.getTravelInfoAPIStatus).toBe(API_FAILED)
      })
   })

   it('should test  get Shared Ride success state', async () => {
      let travelInfo = {
         shared_travels: travelInfoData.travel_info,
         total_travel_infos_shared: travelInfoData.no_of_travel_info
      }
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(travelInfo)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest

      await commuteStore.getSharedTravelInfo({ limit: 4, offset: 0 })

      expect(commuteStore.getTravelInfoAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getTravelInfoAPIError).toBe(null)
      expect(commuteStore.displayData.sharedDetails.travelInfo).toEqual(
         travelInfo.shared_travels
      )
      expect(
         commuteStore.displayData.sharedDetails.noOfSharedTravelInfo
      ).toEqual(travelInfo.total_travel_infos_shared)
   })

   it('it should check setGetRideRequestAPIError', () => {
      commuteStore.setGetRideRequestAPIError('apiError')
      expect(commuteStore.getRideRequestAPIError).toBe('apiError')
   })
   it('it should check setGetAssetTrasportRequestAPIError', () => {
      commuteStore.setGetAssetTrasportRequestAPIError('apiError')
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe('apiError')
   })
   it('it should check setGetShareRideAPIError', () => {
      commuteStore.setGetShareRideAPIError('apiError')
      expect(commuteStore.getShareRideAPIError).toBe('apiError')
   })
   it('it should check setGetShareTravelInfoAPIError', () => {
      commuteStore.setGetShareTravelInfoAPIError('apiError')
      expect(commuteStore.getShareTravelInfoAPIError).toBe('apiError')
   })
   it('it should check setGetTravelInfoAPIError', () => {
      commuteStore.setGetTravelInfoAPIError('apiError')
      expect(commuteStore.getTravelInfoAPIError).toBe('apiError')
   })

   it('it should check setGetMatchingRequestAPIResponse', () => {
      commuteStore.displayData.matchingResults.requestType = 'ASSET'
      const data = { asset_requests: [], assets_matches_count: 0 }
      commuteStore.setGetMatchingRequestAPIResponse(data)
      expect(commuteStore.displayData['matchingResults'].assetRequests).toEqual(
         data.asset_requests
      )
      expect(
         commuteStore.displayData['matchingResults'].noOfAssetRequests
      ).toStrictEqual(data.assets_matches_count)
   })

   it('it should check the onChangeFilter ', () => {
      commuteStore.onChangeFilter('matchingResults', 'CONFIRM')
      expect(commuteStore.displayData['matchingResults'].filter).toBe('CONFIRM')
   })
   it('it should check the onChangeRequestType ', () => {
      commuteStore.onChangeRequestType('myRequests', 'RIDE')
      expect(commuteStore.displayData['myRequests'].requestType).toBe('RIDE')
   })
   it('it should check the onChangeSortField ', () => {
      commuteStore.onChangeSortField('myRequests', 'RIDE')
      expect(commuteStore.displayData['myRequests'].sortByField).toBe('RIDE')
   })
   it('it should check the onChangeSortBy ', () => {
      commuteStore.onChangeSortBy('myRequests', 'noOfSeats')
      expect(commuteStore.displayData['myRequests'].sortBy).toBe('noOfSeats')
   })
   it('it should check the onChangePageNumber ', () => {
      commuteStore.onChangePageNumber('myRequests', 4)
      expect(commuteStore.displayData['myRequests'].rideRequestPageNumber).toBe(
         4
      )
   })
   it('it should check the onChangePageNumber ', () => {
      commuteStore.displayData['matchingResults'].requestType = 'ASSET'
      commuteStore.onChangePageNumber('matchingResults', 4)
      expect(
         commuteStore.displayData['matchingResults'].assetRequestPageNumber
      ).toBe(4)
   })
   it('it should check the onChangeSharedDetailsPageNumber ', () => {
      commuteStore.displayData['sharedDetails'].shareType = 'TRAVEL INFO'
      commuteStore.onChangeSharedDetailsPageNumber(4)
      expect(
         commuteStore.displayData['sharedDetails'].sharedTravelInfoPageNumber
      ).toBe(4)
   })

   it('it should check the onChangeRequestType ', () => {
      commuteStore.onChangeRequestType('myRequests', 'ASSET')
      expect(commuteStore.displayData['myRequests'].requestType).toBe('ASSET')
   })
   it('it should check the onChangeSharedDetailsPageNumber ', () => {
      commuteStore.onChangeSharedDetailsPageNumber(4)
      expect(
         commuteStore.displayData['sharedDetails'].sharedRidePageNumber
      ).toBe(4)
   })
   it('it should check the onChangeSharedDetailsFilter ', () => {
      commuteStore.onChangeSharedDetailsFilter('datetime')
      expect(commuteStore.displayData['sharedDetails'].filter).toBe('datetime')
   })

   it('it should check the onChangeSharedDetailsShareType ', () => {
      commuteStore.onChangeSharedDetailsShareType('travelInfo')
      expect(commuteStore.displayData['sharedDetails'].shareType).toBe(
         'travelInfo'
      )
   })
})
