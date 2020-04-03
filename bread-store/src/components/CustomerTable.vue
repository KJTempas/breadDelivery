<template>
    <div>
        <!-- write template here -->
        <div class="card customer-list m-2 p-2">
            <h4 class="card-title">Customers</h4>

            
            <div id="customer-table">
                <table class="table">
                    <tr>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Delivered?</th>
                        
                    </tr>
                    
                    <CustomerRow
                        v-for="customer in customers"
                        v-bind:key="customer.name" 
                        v-bind:customer="customer"
                        v-on:order-delivered="orderDeliveredOrNot">
            
                    </CustomerRow>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
//create and export component here
import CustomerRow from '@/components/CustomerRow.vue'

export default { 
    name: 'CustomerTable',
    components: { CustomerRow },
    data() {
        return {
            editTable: false
        }
    },
    props: {
        customers: Array
    },
    methods: {
        //a checked event will emit message to parent
        orderDeliveredOrNot(customer) {  //will pass student object with event
            //todo emit message to parent
            this.$emit('order-delivered', customer)
        }
    
    }
}
</script>

<style>
/* write any styles for this component here */
</style>