// #1. generate token

// 1. npm i crypto
// 2. import crypto from "crypto";
// 3. const token = crypto.randomBytes(32).toString("hex");


// #2. Encrypt the password

// 1. npm i bcryptjs
// 2. import bcrypt from "bcryptjs";
// 3. this.password = await bcrypt.hash(this.password, hash); // encrypt the password // Auto-gen a salt and hash.
// 4. const checkPassword = await bcrypt.compare(this.password, user.password); // check password(correct or not)


// #3. JWT token

// 1. npm i jsonwebtoken
// 2. const token = jwt.sign(payload, secret, expiresIn); // generate jwt token
// 3. const decoded = jwt.verify(token, secret); // decoded give payload


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