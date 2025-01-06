import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import localStoragePlugin from './plugins/pinia/localStroragePlugin'


function ourPlugin(){
    return{
        secret: 'Dummy'
    }
}

const app = createApp(App)
const pinia = createPinia();

pinia.use(ourPlugin);

pinia.use(localStoragePlugin);

app.use(createPinia())
app.use(router)

app.mount('#app')
