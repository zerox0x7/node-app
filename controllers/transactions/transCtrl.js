

const transCreateCtrl = async (req,res,next) => {
    try{
        res.json({
            status: 'success',
            data: 'create  transaction',

        });

    }catch(error) {
        res.json(error.message);

    }
};

const transGetCtrl = async (req,res,next) => {
    try{
        res.json({
            status: 'success',
            data: 'get transaction',

        });

    }catch(error) {
        res.json(error.message);

    }
};


const transGetAllCtrl = async (req,res,next) => {
    try{
        res.json({
            status: 'success',
            data: 'all transactions',

        });

    }catch(error) {
        res.json(error.message);

    }
};


const transDeleteCtrl = async (req,res,next) => {
    try{
        res.json({
            status: 'success',
            data: 'delete  transaction',

        });

    }catch(error) {
        res.json(error.message);

    }
};

const transUpdateCtrl = async (req,res,next) => {
    try{
        res.json({
            status: 'success',
            data: 'update  post',

        });

    }catch(error) {
        res.json(error.message);

    }
};


module.exports = {
    transCreateCtrl,
    transGetCtrl,
    transGetAllCtrl,
    transDeleteCtrl,
    transUpdateCtrl
    
}