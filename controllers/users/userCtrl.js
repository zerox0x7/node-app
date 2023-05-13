const User = require('../../model/User/User');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const jwt = require('jsonwebtoken');
const Transaction = require('../../model/Transaction/Transaction');


const userGetAllCtrl = async (req, res, next) => {

    
    User.find().then((result) =>{
        
        res.json(result);
    }).catch((error) =>{
        console.log(error);
    })

    // try {
    //     res.json( result);

    // } catch (error) {
    //     res.json(error.message);

    // }
};

const userUpdateCtrl = async (req, res, next) => {

    const {wallet,id} = req.body;
   
    
    
    const user = await User.findByIdAndUpdate(id,{
        wallet,
    })

    try {
        res.send('ok')

    } catch (error) {
        res.json(error.message);

    }
};

const userUpdateCtrlPro = async (req, res, next) => {
    const {pro} = req.body;
    

    
    
   
    if(pro == "true"){
        
        const {wallet,category,description} = req.body;

        const token = req.cookies.token;
        const decoded = jwt.decode(token);

        
        const user = await User.findById(decoded.id)
        // console.log('it is :',req.body)
        // console.log('user.wallet :', user.wallet)
        let walletPayload = user.wallet - Number(wallet);
        if(walletPayload <= 0) {
            res.send('you do not have enough money !');
        }else {
            // add transaction to the database 
            const transaction = await Transaction.create({
                description,
                chargenum:wallet,

                category,
                user,
                firstname: user.firstname,
                lastname: user.lastname,
    
            })


            const users = await User.findByIdAndUpdate(decoded.id,{
                wallet:walletPayload,
            })

            // console.log('here:',users.wallet);
        
            try {
                
                res.send("<script> window.location.href = '/'</script>");
            } catch (error) {
                res.json(error.message);
        
            }
            
            // const axios = require('axios');
            // axios.put(`https://tameed-mal.com/api/v1/users/${decoded.id}`, {wallet: walletPayload,id:decoded.id})
            // .then(response => {
            //     // res.send('okay')
            //     res.send("<script> window.location.href = '/'</script>");
            // })
            // .catch(error => {
            // console.error(error);
            // });
        }


    
    }else if ( pro == "updateUserWallet"){
        const { walletUpdate ,walletUserId} = req.body;

        // console.log('walletUserId: ',walletUserId)
       
        // const axios = require('axios');
        //     axios.put(`https://tameed-mal.com/api/v1/users/'${walletUserId}'`, {wallet: walletUpdate,id: walletUserId})
        //     .then(response => {

        //         res.send(`<script> window.location.href = "/admin"; </script> `)
            
        //     })
        //     .catch(error => {
        //     console.error(error);
        //     });
        const users = await User.findByIdAndUpdate(walletUserId,{
            wallet:walletUpdate,
        })

        
    
        try {
            res.send("<script> window.location.href = '/admin'</script>");
    
        } catch (error) {
            res.json(error.message);
    
        }


    }


};


const userDeleteCtrl = async (req, res, next) => {
    try {
        res.json({
            status: 'success',
            data: 'delete  user',

        });

    } catch (error) {
        res.json(error.message);

    }
};




const userRegisterCtrl = async (req, res, next) => {
    // console.log(req.body);
    const { firstname, lastname, email, password ,wallet} = req.body;
    try {
        //NOTE -  checking if email is exist
        const userFound = await User.findOne({ email });
        if (userFound) {
            res.json({
                msg: 'User Already Exist !'
            })
        }
        //NOTE -  hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //NOTE -  create the user
        const user = await User.create({
            firstname,
            lastname, 
            email,
            password: hashedPassword,
            wallet,

        })
        res.send(` <script> window.location.href = " /admin"; </script> `);

    } catch (error) {
        res.json(error.message);

    }
};




const userLoginCtrl = async (req, res, next) => {


    const {email,password} = req.body;
    // console.log('email is # :', email);
 
  

    try {
        //NOTE - check if  email exsit
        const userFound = await User.findOne({email});
        // console.log('userFound: #: ',userFound)
        if(!userFound ){

            return res.json({
                mgs:"Invalid login credentials",
            })
            
        }
        

         //verify password
        const isPasswordMatched = await bcrypt.compare(password,userFound.password);
        if( !isPasswordMatched){

            return res.json({
                mgs:"Invalid login credentials p",
            })
            
        }
                                                                            // a day
        res.cookie(`token`,`${generateToken(userFound._id)}`,{maxAge: 1000 * 60 *  60 * 24,httpOnly:false}).send(' <script> window.location.href = "/"; </script> ');
        // res.json({
        //     status: 'success',
        //     data: {
        //         firstname: userFound.firstname,
        //         lastname: userFound.lastname,
        //         email: userFound.email,
        //         isAdmin: userFound.isAdmin,
        //         token: generateToken(userFound._id),
        //     },

        // });

    } catch (error) {
        res.json(error.message);

    }
};

const userGetProfile = async (req, res, next) => {

    try {
        const token = getTokenFromHeader(req);
        // console.log(token);
        res.json({msg:'okay'});

    } catch (error) {
        res.json(error.message);

    }
};



module.exports = {
    userRegisterCtrl,
    userGetAllCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    userLoginCtrl,
    userGetProfile,
    userUpdateCtrlPro
}