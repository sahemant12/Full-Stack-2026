import express from "express";
import dotenv from "dotenv";
import db from "./src/utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// ============================= 1. Above Code ======================================

// 2. Important middlewares

// a. cors allows a frontend running on different origin(domain, port) communicate to backend which is also on different origin.
app.use(cors({
    origin: process.env.BASE_URL, // means Which frontend is allowed to access your backend(only frontend having BASE_URL=http://localhost:3000);
    credentials: true, // means Allow (cookies) / (auth headers) to be sent from frontend to backend.
    method: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"], // means Which HTTP methods are allowed to use when making request to backend from frontend. If frontend uses a method not listed: ❌ Browser blocks request.
    allowedHeaders: ["Content-Type", "Authorization"] // means Which request headers frontend can send to backend.
    // Content-Type → JSON, form data
    // Authorization → JWT tokens
    // If not allowed: ❌ Browser blocks request before reaching backend
}));


// b. It parses incoming JSON request data and makes the data available in req.body.
app.use(express.json());

// c. It parses incoming url-encoded Form-Data and makes the data available in req.body. extended true means it can parse the nested objects.
app.use(express.urlencoded({extended: true}));

// d. It reads cookies from incoming requests and makes them available in req.cookies.
app.use(cookieParser());
// Common use: Sessions, Authentication, JWT in cookies.

// EXTRA:
// (i): url-encoded : URL-encoded is a way to send form data as plain text in a safe format that URLs and HTTP can understand.
// E.g: 
// before encoding:
// username = john doe
// age = 25

// after encoding:
// username=john%20doe&age=25
// = → connects key and value
// & → separates fields
// %20 → space character

// (ii): which one is middleware: app.use() or express.json() ?
// 👉 express.json() is the middleware.
// 👉 app.use() is how we register middleware. adds that middleware to Express
// // cors(), cookieParser() are middleware

// (iii): Https methods
// 1. POST: sends data to the server to create new resource.
// 2. GET: requests data from the server.
// 3. DELETE: requests the server to delete resource.
// 4. PUT: requests the server to replace entire resource.
// 5. PATCH: requests the server to update part of existing resource.

// HTTP methods make requests from the frontend to the backend (which is the server). The backend communicates with the database and then sends the response back to the frontend.



// 3. user routes

app.get("/", (req, res, next)=>{

    // res.send("Hello! Ji"); //Sends any type of data (string, object, array, buffer), Automatically sets Content-Type based on the data type, Calls res.end() internally.

    res.end("Hey Hemant"); //Only sends raw data (string, buffer, etc.), Does not automatically set Content-Type (default is text/plain), Cannot send objects or JSON directly.
});

app.get("/hemant", (req, res, next)=>{
    res.send("Hemant Sah!");
});

// user routes
app.use("/api/v1/users", userRoutes);

// ============================= 1. Below Code ======================================

async function startServer(){

    // db connection
    await db();

    app.listen(port, ()=>{
        console.log(`app is listening on PORT: ${port}`);
    });
}
startServer();
