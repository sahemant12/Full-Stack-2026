// 1. Https Method:
// GET: GET method is used when we want to read/get the data. It doesn't change the data on server.
// POST: POST method is used when we want to create the data on the server.
// PUT: PUT method is used when we want to replace entire data of a resource on the server.
// PATCH: PATCH method is used when we want to partially update the data of a resource on the server.
// DELETE: DELETE method is used when we want to delete the data on the server.


// 2. Status Code:
// 1xx : Informational
// 2xx : Success
// 3xx : Redirection
// 4xx : Client side error
// 5xx : Server side error

// Important Status Code: Learn 10 now, 5 later

// 200 vs 204
// 1. Ok, request successful, and send/return data || No Content, request successful, and doesn't send/return data(No Return)
// 2. Login success, Get /me -> 200
// 3. logout, delete account -> 204
// 4. 200 -> res.status(200).json({ message: "Logged out" }); // can also do
// 5. 204 -> res.status(204).json({ message: "Logged out" }); // ❌ Wrong
// res.status(204).end(); // ✔ Correct


// 1. 200 : Ok
// When to use: Request succeeded, here's your data
// request successful like GET, DELETE, UPDATE
// generic success
// logout

// 2. 201 : Created
// When to use: New resource created successfully
// Successful POST that creates something
// New user registered
// New post created

// 3. 202 : Accepted
// When to use: Request accepted, processing later
// Later

// 4. 204 : No Content
// When to use: Success, but no data to return
// Delete / logout

// 5. 400 : Bad Request
// When to use: client send Invalid input / missing fields
// Validation errors
// Any CLIENT-SIDE mistake

// 6. 401 : Unauthorized
// When to use: Authentication required or failed
// Not logged in
// Invalid credentials like password
// Expired/invalid token


// 7. 403 : Forbidden
// When to use: Authenticated but not authorized (don't have permission)
// Trying to access admin-only resource
// Trying to modify someone else's data

// 8. 404 : Not Found
// When to use: Resource doesn't exist
// User not found in database
// Post doesn't exist
// Invalid ID

// 9. 409 : Conflict
// When to use: Request conflicts with current state
// Duplicate email registration
// Username already taken
// Resource already exists

// 10. 422 : Unprocessable Entity
// When to use: later*
// 

// 11. 429 : Too Many Requests
// When to use: Rate limit exceeded
// Later

// 12. 500 : Internal Server Error
// When to use: Something went wrong on SERVER side (not client's fault)
// Database connection failed
// Unexpected errors in try-catch
// Third-party service failed

// 13. 502 : Bad Gateway
// When to use: Later
// 

// 14. 503 :  Service Unavailable
// When to use: Server temporarily can't handle request
// Server overloaded
// Maintenance mode
// Server down / overload

// 15. 504 : Gateway Timeout
// When to use: Later
// 


