import axios from 'axios'

const base_url = '/api/customers'
export default {
//axios makes requests from the Vue client to the Express API server
    getAllCustomers() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addCustomer(customer) {
        return axios.post(base_url, customer).then(response => {
            return response.data
        })
    },

    updateCustomer(customer) {
        return axios.patch(`${base_url}/${customer.id}`, customer).then(response => {
            return response.data
        })
    }
}