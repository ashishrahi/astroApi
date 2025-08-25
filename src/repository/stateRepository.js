import State from "../models/stateModel.js";

export const stateRepository = {
  // create
  createState: async (payload) => {
    const newState = new State(payload);
    const savedCountry = newState.save();
    return savedCountry;
  },
  // getStateList
  findState: async(query)=>{
    const stateList = await State.find(query)
    return stateList
  },

  // get
  findStatebyName: async (payload) => {
    const { stateName } = payload;
    const existState = State.findOne({
      stateName: { $regex: new RegExp(`^{name}$`, "i") },
    });
    return existState;
  },
  // list of country
  getStateList: async (payload) => {
    const { page, limit, search = "" } = payload;
   const  pageNumber = parseInt(page)
   const   limitNumber = parseInt(limit)
    const skip = (pageNumber - 1) * limitNumber;
    const query = search ? { stateName: new RegExp(search, "i") } : {};
    
    const [states, total] = await Promise.all([
      State.find(query).skip(skip).limit(limitNumber),
      State.countDocuments(query),
    ]);

     return {
      states,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },
  // update state
  updateState: async (id, updatedData) => {
    const updatedState = await State.findByIdAndUpdate(id,updatedData ,{ new: true });
    return updatedState
  },
};
