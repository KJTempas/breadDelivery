import axios from 'axios'

const base_url = '/api/students'
export default {
//axios makes requests from the Vue client to the Express API server
    getAllCustomers() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    addCustomer(customer) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    }
}