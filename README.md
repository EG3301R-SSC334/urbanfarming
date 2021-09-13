# EG3301R Urban Farming SSC-334

### Setup Guide
1. Make sure you have npm installed on your computer. You can install node by going to https://nodejs.org and download from there. Check that you have installed correctly by typing `node-v` and `npm -v`
2. Clone the repository to your local computer
3. Navigate to the directory
4. Run `npm install`
5. Run `npm start`. The console should print out `Server running at http://localhost:3000`


### Developer's Guide
#### GET Requests
`GET /users/`
Returns all the information of all users in the database \
`GET/users/:queryId`
Returns all the information of a user specified by the `_id` \

`GET /systems/`
Returns all the information of all systems in the database \
`GET/systems/:queryId`
Returns all the information of a system specified by the `_id` \

#### POST Requests
`POST /users/`
Creates a new user entry in the database \
`POST /systems`
Creates a new system in the database

#### PUT Requests
`PUT /users/:queryId`
Modifies entry of a user specified by the `_id` \
`PUT /systems/:queryId`
Modifies entry of a system specified by the `_id` 

#### Delete Requests
`DELETE /users/`
Deletes the entire user database \
`DELETE/users/:queryId`
Deletes a user specified by the `_id`

`DELETE /systems/`
Deletes all systems in the database \
`DELETE /systems/:queryId`
Deletes a system specified by the `_id`
