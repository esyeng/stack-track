// const jwt = require("jsonwebtoken")


// export const authenticateUser = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
//     console.log(err);
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }
