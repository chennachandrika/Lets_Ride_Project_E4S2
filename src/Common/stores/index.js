import { AuthStore } from '../../Authentication/stores'
import { CommuteStore } from '../../Commute/stores/CommuteStore'
import { PracticeStore } from '../../Practice/stores/PracticeStore'

import { AuthService } from '../../Authentication/services/AuthService'
import { CommuteService } from '../../Commute/services/CommuteService/CommuteService.fixture.js'
import { PracticeService } from '../../Practice/services/PracticeService'

const authService = new AuthService()
const authStore = new AuthStore(authService)

const commuteService = new CommuteService()
const commuteStore = new CommuteStore(commuteService)

const practiceService = new PracticeService()
const practiceStore = new PracticeStore(practiceService)

export default {
   authStore,
   commuteStore,
   practiceStore
}
