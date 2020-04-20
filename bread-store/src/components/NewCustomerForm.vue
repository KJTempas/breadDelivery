<template>
    <div>
        <!-- write template here -->
       <div class="alert alert-danger" v-show="errors && errors.length > 0">
            <li v-for="error in errors">{{ error }}</li>
        </div>

        <div class="card add-customer m-2 p-2">
            <form>
              <h4 class="card-title">Welcome to Wheatfield's Bakery Delivery! <br>
              We deliver two fresh loaves to your door every week <br>
              Register new customers here<br> Customers are notified by email when their bread has been delivered</h4>

              <div class="form-group">
                <label for="name">Customer Name</label>
                <input id="name" class="form-control" v-model.trim="newCustomerName">
              </div>

              <div class="form-group">
                <label for="address">Address</label>
                <input id="address" class="form-control" v-model.trim="newAddress">
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" class="form-control" v-model.trim="newEmail">
              </div>

              <button class="btn btn-primary" v-on:click.prevent="addCustomer">Add</button>
            </form>

        </div>

    </div>
</template>

<script>
//create and export component here
export default { 
    name: 'NewCustomerForm',
    data() {
        return {
            newCustomerName: '',
            newAddress: '',
            newEmail: '',
            errors: []
        }
    },
    methods: {
        addCustomer() {
            this.errors = []
            if (this.newCustomerName && this.newAddress && this.newEmail) { //need all of these filled out
                //using Mailgun
                $('jquery_selector').mailgun_validator({
                api_key: 'public-api-key',
                 in_progress: in_progress_callback, // called when request is made to validator
                success: success_callback,         // called when validator has returned
                error: validation_error,           // called when an error reaching the validator has occured
   });
                
                
                
                let customer = { name: this.newCustomerName, address: this.newAddress, email: this.newEmail, active: true}
                // emit message to parent with new student
                this.$emit('customer-added', customer)
                this.newCustomerName= ''
                this.newAddress= ''
                this.newEmail= ''
            } else {
                this.errors.push('Name, Address and Email are required.')
            }
        }
    }
}
</script>

<style>
/* write any styles for this component here */
</style>