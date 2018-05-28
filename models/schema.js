const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    image: {
        type: 'String',
        required: true
    },
    research: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String'
    },
    phone: {
        type: 'String'
    },
    link: {
        type: 'String',
        required: true
    },
    collegeName: {
        type: 'String',
        required: true
    }
});

const schema = module.exports = mongoose.model('schema', Schema);
