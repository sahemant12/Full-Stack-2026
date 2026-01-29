
// #1. Bcrypt: Bcrypt is a password hashing function designed to securely store passwords.

// 1. npm i bcryptjs
// 2. import bcrypt from "bcryptjs";
// 3. this.password = await bcrypt.hash(this.password, salt rounds); // or "cost factor"
// 4. const checkPassword = await bcrypt.compare(this.password, user.password); // check password(correct or not)

// NOTE/FLOW:
// 1. when we create a password then bcrypt creates hash of this password but before that it add salt to the password so that even different user create same password, hash will be different everytime.
// 2. Then, this hash is save in db as password.
// 3. During login, user current password is internally converted into hashes using the same salt stored in db(salt is extracted from stored hash)and this hash is compare with db hash, if they match then login.
// Salt: Random data added to password before hashing.
// Salt Rounds(cost factor): Salt rounds make hashing computationally expensive, which makes brute-force attacks difficult.

// #2. crypto: Crypto is a Node.js built-in module for cryptographic operations like generating random values, hashing, encryption. It is used in one-time actions like emailVerification, resetPasswordVerification.

// 1. import crypto from "crypto";
// 2. const token = crypto.randomBytes(32).toString("hex");

// #3. JWT: JWT is a standard format for creating tokens that contain information. It is used in login sessions.

// 1. npm i jsonwebtoken
// 2. const token = jwt.sign(payload, secret, expiresIn); // generate jwt token
// 3. const decoded = jwt.verify(token, secret); // decoded give payload

// FLOW:
// 1. 1st generate the JWT token by using payload and Secret key.
// 2. Then send this JWT token to client. this token is store in cookies.
// 3. whenever client send req, this token is automatically send in cookie.
// 4. server verify token using secret key.

// #4. How to set/get Cookies:

// 1. How to SEND/SET cookies(Backend → Browser)?
// res.cookie("cookie-name", cookie-value, cookieOptions); // sending cookie as response
const cookieOptions = {
    httpOnly: true, // means Cookie CANNOT be accessed by JavaScript. document.cookie ❌ cannot read it
    secure: process.env.NODE_ENV === "production", // only sent over HTTPS. ❌ Not sent over HTTP. Production → HTTPS → secure: true. Localhost → HTTP → secure: false
    sameSite: "strict", // means Cookie is sent ONLY if request comes from your site. Cookie is NOT sent if request comes from: another website, a link click etc.
    maxAge: 24*60*60*1000 // cookie expiry time
}

// 2. How to GET/READ cookies (Browser → Backend)?
// (i) npm i cookie-parser
// (ii) import cookieParser from "cookie-parser";
// (iii) use middleware: app.use(cookieParser());
// (iv) const token = req.cookies?.token;

// 3. How to DELETE / CLEAR cookies (Logout)?
// res.cookie("cookie-name", "", {expires: new Date(0)}); // expiring cookie OR res.clearCookie("token");

// My Understanding:
// 1. Whenever user sends a request, the browser automatically also sends cookies with the request.
// 2. To access user cookies, first use the middleware 'app.use(cookieparser())', so the backend can read user cookies from req.cookies.
// 3. To clear or delete user cookies, use: res.cookie("cookie-name", "", { expires: new Date(0) });
// 4. The backend can also send cookies to the user in the response. E.g: res.cookie("cookie-name", cookie-value, cookieOptions);
// 5. use 'credentials: "include"' in fetch request and 'withCredentials: true' in axios request to send cookies from frontend.


// #5. find() vs findOne() vs findById()

// 1. Understood and memorize if needed then check definition.
// 2. findOne({_id: id}) -> shortHand -> findById(id)


// #6. ORM, ODM