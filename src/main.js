import { createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import store from './store/index.js'

import { createRouter, createWebHistory } from 'vue-router'
import Profile from './components/Profile.vue'
import Main from './components/Main.vue'
import Dishes from './components/Dishes.vue'
import Basket from './components/Basket.vue'
import Notification from './components/Notification.vue'
import Recipes from './components/Recipes.vue'
import Login from './components/Login.vue'
import Registration from './components/Registration.vue'
import { ErrorMessage,Form,Field } from 'vee-validate'
import Products from './components/Products.vue'
import Vegetables from './components/ProductsPages/Vegetables.vue'
import Milk from './components/ProductsPages/Milk.vue'

const router = createRouter({
  routes: [
    { name: 'Main', path: '/', component: Main },
    { name: 'Dishes', path: '/dishes', component: Dishes },
    { name: 'Basket', path: '/basket', component: Basket },
    { name: 'Notification', path: '/notification', component: Notification },
    { name: 'Profile', path: '/profile', component: Profile },
    { name: 'Recipes', path: '/recipes', component: Recipes },
    { name: 'Login', path: '/login', component: Login },
    { name: 'Registration', path: '/registration', component: Registration },
    { name: 'Products', path: '/products', component: Products,
      children: [
      { name: 'Vegetables', path: '/vegetables', component: Vegetables },
      { name: 'Milk', path: '/milk', component: Milk },
      ]
    },
  ],
  history: createWebHistory()
})
 
createApp(App)
.use(router)
.component('ErrorMessage', ErrorMessage)
.component('Form', Form)
.component('Field', Field)
.use(store)
.mount('#app')





