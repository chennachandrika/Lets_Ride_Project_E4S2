import {
   COMMUTE_DASHBOARD_HOME_PAGE,
   COMMUTE_DASHBOARD_MATCHEDRESULTS
} from '../constants/NavigationalConstants.js'

export const goToDashboardHomePage = (history, path) => {
   history.push(COMMUTE_DASHBOARD_MATCHEDRESULTS)
}
