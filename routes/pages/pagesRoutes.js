const express = require('express');
const axios = require('axios');

const jwt = require('jsonwebtoken');
const User = require('../../model/User/User');
const Transaction = require('../../model/Transaction/Transaction');



const pagesRoutes = express.Router();

pagesRoutes.get('/login',(req,res) =>{
    
    res.render('login');


})


let  trans = '';
let users = '';
pagesRoutes.get('/admin',async (req,res) =>{

    const token   = req.cookies.token
   
    
    
    
    if(token){
        await User.find().then((userResult ) =>{

            users = userResult;
        }).catch((error) =>{
            console.log(error)
        })
        await Transaction.find().sort({ createdAt: -1 }).then((result) =>{
        
            trans = result;
            
        }).catch((error) =>{
            console.log(error);
        })


        

        const decoded = jwt.decode(token);

        if(decoded.id == '6457b146cb8ce3d32f11f27f'){
            console.log('token id : ' , decoded.id);

            // axios.get('http://localhost:9000/api/v1/users')
            // .then(response => {
            // console.log('trans is : ', trans)
            // res.render('admin',{doto:trans,data:response.data});
            // })
            // .catch(error => {
            // console.log(error);
            // });
            res.render('admin',{doto:trans,data:users});
    
    
        }else {
            res.send('404')
        }

    }else {

        res.send('404 ')
    }
	


});



pagesRoutes.get('/stans',async (req,res) =>{

    res.render('stans',{doto:trans});

});

pagesRoutes.get('/',async (req,res) =>{
    let admin = false;
    let walletPag = 0;

    const token   = req.cookies.token
    
    
    
    if(token){
        const decoded = jwt.decode(token);
        
        const userR = await User.findById(decoded.id);
        console.log('userfound ddd: ',userR.wallet);

        if(decoded.id == '6457b146cb8ce3d32f11f27f'){
            console.log('token id : ' , decoded.id);
            res.render('index',{admin:true,w:userR.wallet});

            
    
        }else {
            res.render('index',{admin:false,w:userR.wallet});

        }

    }else {

        res.send('404 ')
    }
	


});



module.exports = pagesRoutes;