import jwt from "jsonwebtoken";

const generateToken = (id) => {
    const options = {
        expiresIn: '3d'
    };

    return jwt.sign({ id }, process.env.JWT_KEY, options);
};

export default generateToken;
