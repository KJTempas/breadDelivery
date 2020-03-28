let express = require('express')

//App configuration
let app = express()

//start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})