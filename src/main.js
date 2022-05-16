import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Textarea from 'primevue/textarea'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'


const app = createApp(App)

app.use(PrimeVue)
app.component('Card', Card)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Textarea', Textarea)

app.mount('#app')

