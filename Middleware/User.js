const jwt = require('jsonwebtoken');
const Company = require('../Model/Company'); 

exports.authenticateTokenAndAddCompany = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        console.log(token,"token")

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const company = await Company.findOne({ userId: decoded.userid });

        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        console.log(company._id,"company")

        req.body.companyId = company.userid;

        next();

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ message: 'Invalid token.', error: error.message });
    }
};


