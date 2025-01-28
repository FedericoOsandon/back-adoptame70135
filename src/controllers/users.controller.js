const { usersService } = require("../services/index.js");
const { CustomError } = require("../utils/Error/CustomError.js");
const { EError } = require("../utils/Error/enums.js");
const { generateUserInfo } = require("../utils/Error/info.js");
const { createHash } = require("../utils/index.js");

const getAllUsers = async (req,res)=>{
    try {
        const users = await usersService.getAll();
        res.send({status:"success",payload:users})        
    } catch (error) {
        console.log(error)
        res.status(500).send({status:"error",error:"Internal server error"})
    }
}

const getUser = async (req,res)=> {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if(!user) return res.status(404).send({status:"error",error:"User not found"})
        res.send({status:"success",payload:user})
        
    } catch (error) {
        console.log(error)
    }
}


const createUser = async (req, res, next)=>{
    try {
        const {first_name,last_name,password,email} = req.body

        // console.log(first_name, last_name, email, password)
        if(!first_name || !last_name || !email) {
            CustomError.createError({
                name: 'User creation error',
                cause: generateUserInfo({
                    first_name,
                    last_name,
                    email
                }),
                message: 'Error typing to create user',
                code: EError.INVALID_TYPE_ERROR
            })
        }

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            password: await createHash(password),
            email: email
        }

        const result = await usersService.create(newUser);
        res.send({status:"success",message:"User created"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const updateUser = async (req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async (req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

module.exports = {
    deleteUser,
    getAllUsers,
    createUser,
    getUser,
    updateUser
}