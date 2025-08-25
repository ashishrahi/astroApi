import Kundli from "../models/kundliModel.js"
import {kundaliPipeline} from '../Pipeline/kundaliPipeline.js'

export const kundaliRepository = {
    // create
    createKundali: async(payload)=>{
        const newKundali = new Kundli(payload);
        const savedKundali = newKundali.save()
        return savedKundali;
    },
    // get
    getKundali: async(payload)=>{
        const kundaliList = await Kundli.aggregate(kundaliPipeline(payload))
        return kundaliList;
    }
}

