import Vue from 'vue'
import App from './App.vue'
//to include Boostrap styles and style sheets
import BootstrapVue from 'bootstrap-vue'

import CustomerAPIService from '@/services/CustomerService'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//making CustSvcs available to Vue components
Vue.prototype.$customer_api = CustomerAPIService
//Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
