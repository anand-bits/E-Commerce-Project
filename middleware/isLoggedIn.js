import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        const decodedUser = await VerifyToken(token);

        if (!decodedUser) {
            throw new Error("Invalid/Expired Token, please login again");
        }

        req.userAuthId = decodedUser.id;
        console.log(decodedUser);

        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }
};
