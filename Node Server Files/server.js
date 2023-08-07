import express from "express"
import mongo from "mongodb"
import cors from "cors"


//initialize the database address an PORT number
const clientAddress = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"
let PORT = 3001


//create expresss app
const app = express()
//use json format for middleware
app.use( express.json() )
app.use(cors())


app.post('/signUp', async function(request, response) {
	
	//initialize variables
	var client, profileList, profilesCollection, isTaken = false

	try { 
		//try to 
	
		//connect to client		
		client = new mongo.MongoClient(clientAddress);
		//connect to admin database to start
		profilesCollection = await client.db("Users").collection("profiles")
		
		
	} catch(error) { 
		//otherwise there was a problem
		
		//send error response
		response
			.status(502)
			.send( {message: `There was an error connecting to the database. ERROR:    ${error}`} )	
		
		//close the connection
        client.close()
		
		//end the function early
		return false
	}


	//create the list of all user profiles
	profileList = await profilesCollection.find().toArray()

	//loop through all posts to see if the username already exists
	for( var i=0; i < await profilesCollection.countDocuments(); i++ ) {
		
		if( profileList[i].userName === request.body.userName ) {
			isTaken = true;
		}
	}
	
	//if the username is not taken (the database with that username does not exist )
	if( !isTaken ) {

		//create the user profile collection
		await profilesCollection.insertOne({
				"firstName": request.body.firstName,
				"lastName": request.body.lastName,
				"userName": request.body.userName,		
				"password": request.body.password
		})
		
		
	} else { //otherwise the username is taken
		
		//otherwise return error of username
		response
			.status(400)
			.send( {message: "The username is already taken"} )	
	
		//close the connection
        client.close()
	
		//end the function early
		return false
	}
	
	
	//return success
	response
        .status(200)
        .send( {message: "User successfully added"} )
		
	//close the connection
    client.close()
	
	//return success
	return true
})



app.post('/logIn', async function( request, response ) {

	//initialize variables
	var client, profileList, profilesCollection, userExists = false, userProfile

	try {
		//try to 
	
		//connect to client
		client = new mongo.MongoClient(clientAddress);
		//connect to admin database to start
		profilesCollection = await client.db("Users").collection("profiles")
		
		
	} catch(error) { 
		//otherwise there was a problem
		
		//send error response
		response
			.status(502)
			.send( {message: `There was an error connecting to the database. ERROR:    ${error}`} )	
		
		//close the connection
        client.close()
		
		//end the function early
		return false
	}


	//create the list of all user profiles
	profileList = await profilesCollection.find().toArray()

	//loop through all posts to see if the username already exists
	for( var i=0; i < await profilesCollection.countDocuments(); i++ ) {
		
		if( profileList[i].userName === request.body.userName ) {
			userExists = true;
		}
	}
	
	//if there is an account/database with that username
	if( userExists ) {
		
		userProfile = await profilesCollection.find({userName:request.body.userName}).toArray()
		
		//if password matches the account password
		if( await userProfile[0].password === request.body.password) {
			
			//return success
			response
				.status(200)
				.send( {message: "Successfully logged in!"} )
				
			//close the connection
			client.close()
			
			//end the function early
			return true
				
		} else { //otherwise the password is wrong
		
			//return password incorrect
			response
				.status(400)
				.send( {message: "The password entered is not correct"} )
				
			//close the connection
			client.close()
			
			//end the function early
			return false
		}
		
		
	} else { //otherwise the username doesnt exist
	
		//return username incorrect
		response
			.status(400)
			.send( {message: "There is no account with that username"} )
		
		//close the connection
        client.close()
		
		//end the function early
		return false
	}
})

app.post('/editProfile', async function( request, response ) {
	// initialize variables
	console.log("EDIT PROFILE")
	console.log(request.body)
	
	var client, profilesCollection, profileList, userExists = false, userProfile

	const password = request.body.password
	const confirmPassword = request.body.confirmPassword
	const firstName = request.body.firstName
	const lastName = request.body.lastName

	// error check input data before connecting to database
	if (password !== confirmPassword) {
		response
			.status(400)
			.send( {message: "Passwords do not match"} )
		return false
	}

	try {
		//try to

		//connect to client
		client = new mongo.MongoClient(clientAddress);
		//connect to admin database to start
		profilesCollection = await client.db("Users").collection("profiles")


	} catch(error) {
		//otherwise there was a problem

		//send error response
		response
			.status(502)
			.send( {message: `There was an error connecting to the database. ERROR:    ${error}`} )
			
		//close the connection
		client.close()

		//end the function early
		return false
	}

	//create the list of all user profiles
	profileList = await profilesCollection.find().toArray()

	//loop through all posts to see if the username already exists
	for( var i=0; i < await profilesCollection.countDocuments(); i++ ) {

		// if the username exists update the profile
		if( profileList[i].userName === request.body.userName ) {
			if (password !== "") {
				await profilesCollection.updateOne(
					{userName: request.body.userName},
					{$set: {password: password}}
				)
			}

			if (firstName !== "") {
				await profilesCollection.updateOne(
					{userName: request.body.userName},
					{$set: {firstName: firstName}}
				)
			}

			if (lastName !== "") {
				await profilesCollection.updateOne(
					{userName: request.body.userName},
					{$set: {lastName: lastName}}
				)
			}

			// return success
			response
				.status(200)
				.send( {message: "Successfully updated profile!"} )

			//close the connection
			client.close()

			//end the function early
			return true
		}
	}

	// username does not exist, return error
	response
		.status(400)
		.send( {message: "There is no account with that username"} )

	//close the connection
	client.close()

	//end the function early
	return false
})
		

app.post('/addPost', async function( request, response ) {
	
	//initialize variables
	var client, postsDatabase

	try {
		//try to 
	
		//connect to client		
		client = new mongo.MongoClient(clientAddress);
		//connect to admin database to start
		postsDatabase = await client.db("Posts")
		
		
	} catch(error) { 
		//otherwise there was a problem
		
		//send error response
		response
			.status(502)
			.send( {message: `There was an error connecting to the database. ERROR:    ${error}`} )	
		
		//close the connection
        client.close()
		
		//end the function early
		return false
	}
	
	//add the post to the all collection
	await postsDatabase.collection("all").insertOne({
		"userName": request.body.userName,
		"title": request.body.title,
		"description": request.body.description,
		"tag": request.body.tag
	})
	
	
	//return success
	response
        .status(200)
        .send( {message: "Post successfully added"} )
		
	//close the connection
    client.close()
	
	//return success
	return true
	
})


app.post('/getPosts', async function( request, response ) {
	
	//initialize variables
	var client, postsCollection, postsArray

	try {
		//try to 
	
		//connect to client		
		client = new mongo.MongoClient(clientAddress);
		//connect to admin database to start
		postsCollection = await client.db("Posts").collection("all")
		
		
	} catch(error) { 
		//otherwise there was a problem
		
		//send error response
		response
			.status(502)
			.send( {message: `There was an error connecting to the database. ERROR:    ${error}`} )	
		
		//close the connection
        client.close()
		
		//end the function early
		return false
	}
	console.log(request.body.filter)
	if( request.body.filter === "all" ) {
		
		console.log("ALL")
		//get all posts
		postsArray = await postsCollection.find().toArray()
		
		//close the connection
        client.close()
		
		//send the response with the posts array
		response
			.status(200)
			.send( await postsArray )
			
		//end the function early
		return true
		
	} else if( request.body.filter === "tag" ) {
		//get the posts specified
		postsArray = await postsCollection.find({"tag":`${request.body.tag}`}).toArray()
		
		//close the connection
        client.close()
		
		//send the response with the posts array
		response
			.status(200)
			.send( postsArray )
			
		//end the function early
		return true
	
	} else if( request.body.filter === "userName" ) {
		//get the posts specified
		postsArray = await postsCollection.find({"userName":`${request.body.userName}`}).toArray()
		
		//close the connection
        client.close()
		
		//send the response with the posts array
		response
			.status(200)
			.send( postsArray )
			
		//end the function early
		return true
		
	} else {
	
		//close the connection
        client.close()
		
		//send the response with the posts array
		response
			.status(400)
			.send( "BAD REQUEST" )
			
		//end the function early
		return false		
	}

})


//listen on the specified port
app.listen(PORT, function(){
    console.log("Listening at port:", PORT);
})