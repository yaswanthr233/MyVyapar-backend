const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try{
        const { name, email, phoneNumber, password, businessName, businessType, address } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        if(password.length < 6 || password.length > 20){
            return res.status(400).json({ message: 'Password must be between 6 and 20 characters' });
        }
        if(phoneNumber.length !== 10){
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }
        const existingPhone = await User.findOne({ phoneNumber });
        if(existingPhone){
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,email,phoneNumber,password: hashedPassword,businessName,businessType,address
        })
        const savedUser = await user.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Email not found' });
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid){
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ id: user._id ,role: user.role}, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ message: 'User logged in successfully', token ,user:{name: user.name, email: user.email}});
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
}

module.exports = {registerUser, loginUser};