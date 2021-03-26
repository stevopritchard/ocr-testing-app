const mongoose = require('mongoose')
//consider adding validator module

const Invoice = mongoose.model('Invoice', {
    description: {
        type: String
    },
    quantity: {
        type: String
        // type: Number,
        // validate(value) {
        //     if(value < 0) {
        //         throw new Error('Price must be a positive number.')
        //     }
        // }
    },
    price: {
        type: String
        // type: Number,
        // required: true
    }
})

module.exports = Invoice