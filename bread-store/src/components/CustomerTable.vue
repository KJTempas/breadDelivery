<template>
    <div>
        <!-- write template here -->
        <div class="card student-list m-2 p-2">
            <h4 class="card-title">Customers</h4>

            <div class="edit-table-toggle form-check">
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
            </div>

            <div id="customer-table">
                <table class="table">
                    <tr>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Delivered?</th>
                        <th v-show="editTable">Delete</th>
                    </tr>
                    
                    <CustomerRow
                        v-for="customer in customers"
                        v-bind:key="customer.name" 
                        v-bind:customer="customer"
                        v-bind:edit="editTable"
                        v-on:student-present="studentArrivedOrLeft"
                        v-on:delete-student="studentDeleted">
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
        studentArrivedOrLeft(student) {  //will pass student object with event
            //todo emit message to parent
            this.$emit('student-present', student)
        },
        studentDeleted(student) {
            this.$emit('delete-student', student)
        }
    }
}
</script>

<style>
/* write any styles for this component here */
</style>