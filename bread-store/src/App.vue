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
      sendEmailToCustomer(customer.email)
      this.updateCustomers()  //calling method below
      })
    },
    
  updateCustomers() {
    this.$customer_api.getAllCustomers().then( customers => {
      this.customers = customers  //sets this.student equal to students in the Vue model
    })
  },

  sendEmailToCustomer() {
    const mailgun = require("mailgun-js");
    //const DOMAIN = 'YOUR_DOMAIN_NAME';
    
    const domain = sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org;
    let api_key = '7fe0c716602413900922178eedeff712-f135b0f1-b1ef7764';

    //Your sending email address
    //var from_who = 'kjtempas@gmail.com';

    const mg = mailgun({apiKey: api_key, domain: DOMAIN});
    const data = {
      //from: 'Excited User <me@samples.mailgun.org>',
      //from: 'kjtempas@gmail.com, sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org'
      from: 'sandbox4323e2a2ea5c47fbb26e561685d6b5e1.mailgun.org',
      //to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
      to: 'this.customer.email',
      subject: 'Hello',
      text: 'Your bread from Wheatfield\'s Bakery has been delivered!'
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
}
}






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


