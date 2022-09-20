
const Tour = require('../modal/toursmodal');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.saveTours = async (req, res, next) => {
    try {
        const result = await Tour.create(req.body)

        res.status(200).send({
            status: true,
            message: "data saved success",
            data: result
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            message: "tour save faild",
            error: err.message
        })
    }

}


module.exports.getTours = async (req, res, next) => {

    const querysFilter = { ...req.query };
    const othersQuery = ["sort", "limit", "skip", "select", "fields", "sort"];
    othersQuery.forEach((val) => delete querysFilter[val]);

    const query = {};
    if (req.query.fields) {
        const field = req.query.fields
        query.fields = field.split(",").join(" ");
    }

    if (req.query.page) {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * parseInt(limit);
        query.skip = skip;
        query.limit = parseInt(limit);

    }

    if (req.query.sort) {
        query.sort = req.query.sort
    }

    try {
        const result = await Tour.find({}).select(query.fields).skip(query.skip).limit(query.limit).sort(query.sort)
        res.status(200).send({
            status: true,
            data: result
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            message: "data fetch faild",
            error: err.message
        })
    }

}

module.exports.getSingleTours = async (req, res, next) => {
    const id = req.params.id;

    try {
        const result = await Tour.findOne({ _id: id });
        res.status(200).send({
            status: true,
            data: result
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            message: "data fetch faild",
            error: err.message
        })
    }

}

module.exports.updateTours = async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "tours id not valid" })
    }
    const existTour = await Tour.findOne({ _id: id });

    if (!existTour) {
        return res.status(400).send({ status: false, message: "this id tours not found" })
    }

    try {
        const updateTour = await Tour.updateOne({ _id: id }, { $set: req.body }, {
            runValidators: true
        })
        console.log(updateTour);
        if (updateTour.modifiedCount) {
            res.status(200).send({
                status: true,
                message: "tour updated success"
            })

        } else {
            res.status(400).send({
                status: false,
                message: "tour updated faild"
            })
        }


    } catch (err) {
        res.status(400).send({
            status: false,
            message: "something went wrong",
            error: err.message
        })
    }

}


module.exports.trandingTours = async (req, res, next) => {
    try {
        const result = await Tour.find({}).sort("-counter").limit(3);

        res.status(200).send({
            status: true,
            data: result
        })

    } catch (err) {
        res.status(400).send({
            status: false,
            message: "data fetch faild",
            error: err.message
        })
    }
}

module.exports.cheapestTours = async (req, res, next) => {
    try {
        const result = await Tour.find({}).sort("price").limit(3);

        res.status(200).send({
            status: true,
            data: result
        })
    } catch (err) {
        res.status(400).send({
            status: false,
            message: "data fetch faild",
            error: err.message
        })
    }
}