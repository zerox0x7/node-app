const getTokenFromHeader = (req ) => {
    const tokenObj = req.headers;
    const token = tokenObj['authorization'].split(' ')[1];
    
    if(token !== undefined ) {
        return token
    }else {
        return {
            status: 'failed',
            messsage: 'there is no token in header',
        }
    }



};


module.exports = getTokenFromHeader;