import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({

    stateName:{
        type: String,
        required: true,
              },
    stateCode:{
        type: String,
     },
     countryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Country"
     }
    
    },
   {timestamps: true}
)
const State = mongoose.model("State", stateSchema)
export default State;