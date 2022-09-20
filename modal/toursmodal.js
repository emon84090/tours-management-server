const mongoose = require('mongoose');

const TourSchema = ({
    name: {
        type: String,
        required: [true, "Tour name must be required"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "image must be required"]
    },
    price: {
        type: Number,
        required: [true, "price must be required"],
        min: 0
    },
    counter: {
        type: Number,
        default: 0
    },
    time: {
        type: Number,
        default: (new Date()).getTime()
    }

})


const tourModal = mongoose.model("tourinfo", TourSchema);


module.exports = tourModal;