const mongoose = require('mongoose');
const iitkSchema = mongoose.Schema({
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
    }
});

const iitk = module.exports = mongoose.model('iitk', iitkSchema);
