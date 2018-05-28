const mongoose = require('mongoose');
const iitdSchema = mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        upsert: true
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

const iitd = module.exports = mongoose.model('iitd', iitdSchema);
