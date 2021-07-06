// POST request
// {
//     username: "xyz",
//     userID: "123ASdjb",
//     email: "asd",
//     token: "QKLW123JASKDL",
//     [
//         plantID: ,
//         plantType: ,
//         humidity: ,
//         temperature: ,
//         pH: ,
//         EC: ,
//     ]
// }
// Create userID route and plantID route
// Separate the last 20 data with the rest of the data (make 2 routes)

// GET requests
// GET /userID -> return plantIDs associated with the user and user details (email, name, username, profile picture)
// GET /userID/plantID -> displays information of specific plant
// GET /userID/plantID/temperature -> returns information for a specific field of a plant

// PUT request
// {
//     userID: "123ASdjb",
//     token: ""
//     [
//         systemID: ,
//         plantType: ,
//         humidity: [{data, timestamp}, {data, timestamp}],
//         temperature: [{data, timestamp}, {data, timestamp}],
//         pH: [{data, timestamp}, {data, timestamp}],
//         EC: [{data, timestamp}, {data, timestamp}],
//     ] 
// }
