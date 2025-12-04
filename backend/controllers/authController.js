import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

export const registerUser = async(req,res) =>{
    try {
        const { name , email , password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message: 'User with email already exist'});
    }

    // create password hash 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const user = new User({
        name,
        email,
        password:hashedPassword,
    })

    // save user in db
    await user.save();

    //create and return token
    const payload = {
        user : {
            id:user.id,
            role:user.role
        }
    }

    jwt.sign(payload ,
        process.env.JWT_SECRET,
        {expiresIn:'2d'},
        (err,token) => {
            if (err){
                console.error(err);
                throw new err; 
            }
            return res.status(201).json({token});
        } 
    )
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }

}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Directly compare plain password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                return res.status(201).json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};
