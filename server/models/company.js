const mongoose = require("mongoose");
const genuuid = require('uuid').v4;
const { Schema } = mongoose;

const companySchema = new Schema({
    uuid: {
        type: String,
        default: genuuid(),
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    ceo: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    inceptionDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Company', companySchema);