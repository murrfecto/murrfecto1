import {connectToDatabase} from "../helpers/connectToDb.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
    const {client, collection} = await connectToDatabase('admins');
    const {email, password} = req.body;
    try {
        //check if user exists
        const admin = await collection.findOne({email: email});
        if (admin) {
            const isPasswordMatch = await bcrypt.compare(password, admin.password);
            console.log(isPasswordMatch)
            if (isPasswordMatch) {
                const token = jwt.sign({
                    email: admin.email,
                    id: admin._id
                }, process.env.JWT_SECRET, {});
                res.cookie('token',token,{httpOnly:true})
                console.log( res.cookie('token',token,{httpOnly:true}));
                res.status(200).json({token});
            } else {
                res.status(401).send('invalid password');
            }
        } else {
            res.status(404).send('admin not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('error connections');
    } finally {
        {
            if (client) {
                await client.close();
            }
        }
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
};

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,admin)=>{
            if (err)throw err;
            res.json(admin)
        })
    } else {
        res.json(null)
    }
};


export {loginUser, getProfile,logoutUser};
