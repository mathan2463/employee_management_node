module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;   
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        if (!token) {
            token = authHeader;
        }
        if (token!='FFSJ75DJDUYKFSG875SSKFDGSFS4657HHSBSSFSFGDFH636383NDYHDHDH6262N3D78') {
           res.status(401).send({
            status: false,
            statusAuth: 0,
            message: "Unauthorized"
        });    
        } else {
         next();      
        }      
    } else {
        res.status(401).send({
            status: false,
            statusAuth: 0,
            message: "Unauthorized"
        });
    }
};
