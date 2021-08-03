//require
require('../routes/route');
require('../models/admin.model');

//import
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AdminUser = require('../models/admin.model');

module.exports.adminregister = async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cnfpass;

        const empty = validator.isEmpty(password && cpassword);

        if (password === cpassword && !empty) {

            const random = Math.ceil(Math.random() * 1000);
            const sting = Math.random().toString(36).substring(3, 5);
            const uniqueID = "ACE" + sting.toUpperCase() + random;
            console.log(uniqueID);

            let data = new AdminUser({
                collegeID: uniqueID,
                fullname: req.body.fullname,
                email: req.body.email,
                password: password,
                cnfpass: cpassword
            })

            const reg = await data.save();
            res.status(201).json(reg);

        } else {
            res.status(400).send("passwords not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports.adminlogin = async (req, res) => {
    try {
        const ID = req.body.collegeID;
        const email_id = req.body.email;
        const password = req.body.password;

        const user = await AdminUser.findOne({ collegeID: ID });
        const isSame = await validator.equals(email_id, user.email);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        console.log(isSame);

        if (isMatch && isSame) {
            res.status(200).json(user);
        } else {
            res.status(400).send("please enter valid user details and try again");
        }
    } catch (error) {
        res.status(400).send("invalid collegeID")
    }
}

module.exports.getdetail = async (req, res) => {
    try {
        const detail = await AdminUser.findOne({ collegeID: req.params.clgID });
        res.status(200).json(detail);

    } catch (error) {
        res.status(400).json(error);
    }
}