import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECERT, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        httpOnly: true, // cannot access cookie via JavaScript -> only via HTTP (for security)
        maxAge: 15 * 24 * 60 * 60 * 1000, // cookie expiration: 15 days
        sameSite: "strict" // protect against CSRF attacks
    });
    

    return token
}

export default generateTokenAndSetCookie;