import {authenticationService} from '../services/index.js'
//  Registration of Users
export const registerUsers = async(req, res)=>{
try {
      const model = req.body;
      const {success, message, data} =  await authenticationService.RegisterUserService(model)
      console.log('data:',data)
          return res.status(200).json({
            success,
            message,
            data
          })
} catch (error) {
    res.status(500).json({success: true, message:error.message })
}
}

//  List of Users

export const getUsers = async(req, res)=>{
try {
     const {success, message, data} = await authenticationService.UserListService();
     return res.status(200).json({success, message, data})    
} catch (error) {
    return res.status(500).json({success:false, message: error.message})
}
}

export const profileUser = async(req, res)=>{
    try {
        const model = req.user.id;
        const {success, message, data} = await authenticationService.userProfileService(model);
        return res.status(200).json({success, message, data})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
// LOGIN OF USERS

export const loginUsers = async(req, res)=>{
try {
     const model = req.body;
     const {success, message, data} = await authenticationService.LoginUserService(model)
     return res.status(200).json({success, message, data})    
} catch (error) {
    return res.status(500).json({success: false, message: error.message})
}
}