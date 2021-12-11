const mongoose = require("mongoose");
const genuuid = require('uuid').v4;
const { Schema } = mongoose;

const teamSchema = new Schema({
    uuid: {
        type: String,
        default: genuuid(),
        unique: true
    },
    companyId: {
        type: String,
        required: true,
        unique: true
    },
    teamLeadName: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model('Team', teamSchema);