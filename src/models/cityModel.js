import mongoose from 'mongoose'

const citySchema = new mongoose.Schema({
    cityName:{
        type: String,
        required: true,
    },
    stateId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true
    },
    countryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
    }
})

const City = mongoose.model("City", citySchema);

export default City;