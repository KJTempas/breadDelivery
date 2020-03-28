<template>
    <div>
        <!-- write template here -->
       <div class="alert alert-danger" v-show="errors && errors.length > 0">
            <li v-for="error in errors">{{ error }}</li>
        </div>

        <div class="card add-student m-2 p-2">
            <form>
              <h4 class="card-title">Add new customer</h4>

              <div class="form-group">
                <label for="name">Customer Name</label>
                <input id="name" class="form-control" v-model.trim="newCustomerName">
              </div>
              <div class="form-group">
                <label for="starID">Address</label>
                <input id="starID" class="form-control" v-model.trim="newAddress">
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
            errors: []
        }
    },
    methods: {
        addCustomer() {
            this.errors = []
            if (this.newCustomerName && this.newAddress) {
                let customer = { name: this.newCustomerName, starID: this.Address, present: false}
                // emit message to parent with new student
                this.$emit('customer-added', customer)
                this.newCustomerName= ''
                this.newAddress= ''
            } else {
                this.errors.push('Name and Address are required.')
            }
        }
    }
}
</script>

<style>
/* write any styles for this component here */
</style>