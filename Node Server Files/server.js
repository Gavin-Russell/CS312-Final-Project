import express from "express";
import mongo from "mongodb";
import cors from "cors";

//initialize the database address an PORT number
const clientAddress =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1";
let PORT = 3001;

//create expresss app
const app = express();
//use json format for middleware
app.use(express.json());
app.use(cors());

app.post("/signUp", async function (request, response) {
  //initialize variables
  var client,
    userDB,
    db,
    databaseList,
    isTaken = false;

  try {
    //try to

    //connect to client
    client = new mongo.MongoClient(clientAddress);
    //connect to admin database to start
    db = await client.db("admin");
    //get list of all databases returns and object, databases need to be pulled
    databaseList = await db.admin().listDatabases();
  } catch (error) {
    //otherwise there was a problem

    //send error response
    response.status(404).send({
      message: `There was an error connecting to the database. ERROR:    ${error}`,
    });

    //close the connection
    client.close();

    //end the function early
    return false;
  }

  //console.log(request.body.userName)
  //console.log(databaseList.databases.indexOf( request.body.userName ))
  //console.log(databaseList.databases[0].name)

  for (var i = 0; i < databaseList.databases.length; i++) {
    if (databaseList.databases[i].name === request.body.userName) {
      isTaken = true;
    }
  }

  //if the username is not taken (the database with that username does not exist )
  if (!isTaken) {
    //add the user database to mongo
    userDB = await client.db(request.body.userName);

    //create the user profile collection
    await userDB.collection("profile").insertOne({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      userName: request.body.userName,
      password: request.body.password,
    });
  } else {
    //otherwise the username is taken

    //otherwise return error of username
    response.status(200).send({ message: "The username is already taken" });

    //close the connection
    client.close();

    //end the function early
    return false;
  }

  //return success
  response.status(200).send({ message: "User successfully added" });

  //close the connection
  client.close();

  //return success
  return true;
});

app.post("/logIn", async function (request, response) {
  //initialize variables
  var client,
    userDB,
    db,
    databaseList,
    userExists = false,
    userProfile;

  try {
    //try to

    //connect to client
    client = new mongo.MongoClient(clientAddress);
    //connect to admin database to start
    db = await client.db("admin");
    //get list of all databases returns and object, databases need to be pulled
    databaseList = await db.admin().listDatabases();
  } catch (error) {
    //otherwise there was a problem

    //send error response
    response.status(200).send({
      message: `There was an error connecting to the database. ERROR:    ${error}`,
    });

    //close the connection
    client.close();

    //end the function early
    return false;
  }

  //loop through all databases and see if the username exists
  for (var i = 0; i < databaseList.databases.length; i++) {
    if (databaseList.databases[i].name === request.body.userName) {
      userExists = true;
    }
  }

  //if there is an account/database with that username
  if (userExists) {
    userProfile = await client.db(request.body.userName).collection("profile");

    //if password matches the account password
    if (
      (await userProfile.countDocuments({
        password: request.body.password,
      })) === 1
    ) {
      //return success
      response.status(200).send({ message: "Successfully logged in!" });

      //close the connection
      client.close();

      //end the function early
      return true;
    } else {
      //otherwise the password is wrong

      //return password incorrect
      response
        .status(400)
        .send({ message: "The password entered is not correct" });

      //close the connection
      client.close();

      //end the function early
      return false;
    }
  } else {
    //otherwise the username doesnt exist

    //return username incorrect
    response
      .status(400)
      .send({ message: "There is no account with that username" });

    //close the connection
    client.close();

    //end the function early
    return false;
  }
});

//listen on the specified port
app.listen(PORT, function () {
  console.log("Listening at port:", PORT);
});
