
const Tour = require('../modal/toursmodal');
var ObjectId = require('mongoose').Types.ObjectId;

const Counter = async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "tours id not valid" })
    }
    try {
        const oldCounter = await Tour.findOne({ _id: id }).select("counter");
        if (!oldCounter) {
            return res.status(400).send({ status: false, message: "this id tours not found" })
        }
        const updateCounter = await Tour.updateOne({ _id: id }, { $set: { counter: parseInt(oldCounter.counter) + 1 } })

        if (updateCounter.modifiedCount) {
            next()
        } else {
            res.status(400).send({
                status: false,
                message: "counter updated faild"
            })
        }

    } catch (err) {
        res.status(400).send({
            status: false,
            error: err.message
        })
    }

}

module.exports = Counter