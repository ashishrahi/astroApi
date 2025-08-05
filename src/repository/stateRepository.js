import State from "../models/stateModel.js";

// findByState
export const findStateByNameQuery = (name) => {
  return State.findOne({
    stateName: { $regex: new RegExp(`^{name}$`, "i") },
  });
};

// createState
export const createStateQuery = (payload) => {
  const newState = new State(payload);
  return newState.save();
};

// getStates
export const getStateQuery = async (payload) => {
  const { page, limit, search = "" } = payload;
  const skip = (page - 1) * limit;
  const query = search ? { countryName: { $regex: search, $option: "i" } } : {};
  const [states, total] = await Promise.all([
    State.find(query).skip(skip).limit(limit),
    State.countDocuments(query),
  ]);
  return {
    data: states,
    total: total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// updateStates
export const updatedStateQuery = async(payload) => {
const {id} = payload;
return State.findByIdAndUpdate(id)
}