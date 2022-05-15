import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'


const app = createApp(App)

app.use(PrimeVue)
