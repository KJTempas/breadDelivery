<template>
  <div id="app">
    <Header></Header>
    <NewCustomerForm v-on:customer-added="newCustomerAdded"></NewCustomerForm>
    <CustomerTable 
      v-bind:customers="customers" 
      v-on:order-delivered="orderDeliveredOrNot">
    
      </CustomerTable> 
              <!-- v-on is an event handler for student-present event; call method studentArrivedOrLeft in App.vue-->
    <!-- v-bind message and name to StudentMessage-->
     <CustomerMessage v-bind:message="message" v-bind:name="name"> </CustomerMessage>

  </div>
</template>

<script>
import Header from '@/components/Header'
import NewCustomerForm from './components/NewCustomerForm.vue'
import CustomerTable from './components/CustomerTable.vue'
import CustomerMessage from './components/CustomerMessage'


export default {
  name: 'app',
  data() {
    return {
      customers: [], //array of students in data
      message: '',
      name: ''
    }
  },
  components: {
    Header,
    NewCustomerForm,
    CustomerTable,
    CustomerMessage
  },
  mounted() { //call updateStudents method below; this.student = this student in Vue viewmodel
    this.updateCustomers()
  },
  methods: {
    newCustomerAdded(customer) { //call addCustomer method in CustService.js
      this.$customer_api.addCustomer(customer).then( customer => {
        this.updateCustomers() //calls method below to update customer array
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding customer.\n' + msg)
      })
    },
    orderDeliveredOrNot(customer) {
      this.$customer_api.updateCustomer(customer).then( () => {
      this.message = customer.delivered ? 'Delivered to ': 'Not delivered yet, '  
      this.name = customer.name
      this.updateCustomers()  //calling method below
      })
    },
    
  updateCustomers() {
    this.$customer_api.getAllCustomers().then( customers => {
      this.customers = customers  //sets this.student equal to students in the Vue model
    })
  }
}
}
/* jQuery example of using Mailgun email validation - from https://devcenter.heroku.com/articles/mailgun-validations#provisioning-the-add-on
$('jquery_selector').mailgun_validator({
       api_key: 'public-api-key',
       in_progress: in_progress_callback, // called when request is made to validator
       success: success_callback,         // called when validator has returned
       error: validation_error,           // called when an error reaching the validator has occured
   });
*/

/* from https://www.npmjs.com/package/mailgun-js
var api_key = 'XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});*/
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>


