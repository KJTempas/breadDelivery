<template>
  <div id="app">

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
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
