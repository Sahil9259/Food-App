const mongoose = require('mongoose')
require('dotenv').config();
module.exports = function (callback) {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---" + err)
        else {
           
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("food_category");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
            });
        }
    })
};
