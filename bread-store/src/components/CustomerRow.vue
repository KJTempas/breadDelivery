<!-- use if rows ae complex; one row for one student's data-->
<template> <!--note that template element contains a <tr>, not a <div>  -->
   <!--template elements must contain exactly one child element(like the <tr>)  -->
       <!--but that element can contain many children   -->
    <tr v-bind:class="'delivered-' + customer.delivered">
        <td>{{ customer.name }}</td>
        <td>{{ customer.address }}</td>
        <td>{{customer.email }}</td>
        <td><input type="checkbox" v-model="customer.active" v-on:change="active(customer)"></td>
        <td><input type="checkbox" v-model="customer.delivered" v-on:change="checked(customer)"></td>
        
    </tr>
</template>

<script>
export default {
    name: 'CustomerRow',
    props: {
        customer: Object,
        edit: Boolean
    },
    methods: {
        checked(customer) {
            this.$emit('order-delivered', customer)
        },
        active(customer) {
            this.$emit('active', customer)
        }
        
        }
    }

</script>

<style>
.present-true {
    color: lavender;
    font-style: bold;
}
.present-false {
    font-color: blue;
    font-style: italic;
}
</style>