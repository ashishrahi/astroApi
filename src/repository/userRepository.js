import User from "../models/userModel.js";

export const authenticationRepository = {
  registerUser: async (payload) => {
    const newUser = new User({...payload});
    const savedUser = await newUser.save();
    return savedUser;
  },
  //  findbyId
  findUserById: async(id)=>{
    const existUser = await User.findById(id)
    return existUser;
  },
  
  //  findtoken
  findToken: async()=>{
   const existToken = await User.findOne({ "refreshTokens.0": { $exists: true } })
   return existToken;
  } ,

  // findbyEmail
  findUserByEmail: async (email) => {
    const existUser = await User.findOne({ email });
    return existUser;
  },
  //  getUserList
  getUserList: async (payload) => {
    const { page = 1, limit = 5 } = payload;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const userlist = await User.find().skip(skip).limit(limitNumber).exec();
    const total = await User.countDocuments();
 
   return {
      data: userlist,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    };
  },
 updateUser: async (id, payload) => {
  // Use passed id, or fallback to default userId
  const userIdToUpdate = id || payload.userId; // or another default userId from context

  if (!userIdToUpdate) {
    throw new Error("User ID is required to update");
  }

  const { dob, tob, birthPlace } = payload;

  const updatedUser = await User.findByIdAndUpdate(
    userIdToUpdate,
    {
      $set: {
        birthDate: dob,
        birthTime: tob,
        birthPlace: birthPlace || "Kanpur",
        name: payload.name,
        email: payload.email,
        phone: payload.phone
      },
    },
    { new: true } // return the updated document
  );

  return updatedUser;
}

};

