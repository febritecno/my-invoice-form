const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    id: String,
    createdAt: Date,
    paymentDue: Date,
    description: String,
    paymentTerms: Number,
    clientName: String,
    clientEmail: String,
    status: String,
    senderAddress: {
        street: String,
        city: String,
        postCode: String,
        country: String
    },
    clientAddress: {
        street: String,
        city: String,
        postCode: String,
        country: String
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    total: Number
});

module.exports = mongoose.model("invoices", invoiceSchema);
