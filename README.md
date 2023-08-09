# CS312-Final-Project
Repository for the final project of cs312

# Installation and Running

## Starting the Node Server

To run the server file, express, mongodb and cors need to be installed

### Download Mongodb: https://www.mongodb.com/try/download/community

For the other packages cd to './Node Server Files' on the command line and run the following:

### `npm install cors`
### `npm install mongo`
### `npm install express`
### `node server.js`

The final command will run the server on port 3001 on your local computer

## Starting the React Website

To run the React server React will need to be installed. On the command line cd to './react-app' and run:

### `npm install react`
### `npm start`

The React server will try to run on port 3000 and will fallback to another port if it is taken. It is advisable to run the React server after the Node server so that port 3001 will never be taken away from the Node server.

# Team

Jacob Olson is an ACS Major who is interested in AI.

Email: jdo227@nau.edu

Profile: [Jacob Olson](https://github.com/Jacob-Olaffson)


Gavin Russell is a CS Major who is very interested in learning more about the CS world. 

Email: ggr32@nau.edu

Profile: [Gavin Russell](https://github.com/Gavin-Russell)


Ian Dennis is a CS/ME Major who is currently most interested in back end web development.

Email: ind9@nau.edu

Profile: [Ian Dennis](https://github.com/ind9-nau)

# Website Idea
The following is a sketch of the website our team intends to build. This includes the layout and structure of the page, the specific components it will need to run, and the protocols that will be used to allow server/client communication.
The website will be a blog sharing website where users will be able to like, comment on, and post blogs about any topic they choose. The blogs themselves may also be tagged. When viewing the site this will allow users to filter blogs based on the user, tags, most liked, or most recently posted. Users will have the option to post new blogs, and edit/delete the ones they’ve already made. 

## React Components
With the above functionality in mind the following React components will be implemented in to properly run the frontend of the site:
* Skeleton Component: This component will render the basic styling and layout of each page of the website without any content on it so that the general theme of the site is always consistent. It will always call a child component of:
   * NavBar Component: This component will always render to give users the option of logging in/signing up to the website. It will also have options for users to navigate to edit their profile, previous blog posts, or create a new post. Finally, it will be where users can choose to filter the posts they see according to the parameters mentioned above.
* RenderBlogs Component: This component will display the list of blogs the user has requested to see on the site. It will list them all vertically and include the likes/dislikes and comments associated with each post. To do this it will also have child components of:
   * RenderBlog Component: This component correctly renders a singular blog post including formatting the title, main text, and any images in the post.
   * CreateComment: This component will be rendered directly below each blog post and will allow users to add their thoughts about the blog to the rest of the comments. Users who are not logged in will not be able to use this functionality.
   * RenderComments: This component will display the comments associated with the blog directly below the create comment dialog option. The comments will be ordered by most recent first. Additionally there will be an option to hide this component to make it easier to scroll through posts.
* SignUpPage Component: This component will intake a new username and password from a user wishing to sign up to the web page. It will allow the server to confirm the validity of the username and password and handle both the success case, sending the user back to the main page, and the failure case, notifying the user and remaining on the sign up page.
* LoginPage Component: This component will intake a users login information and use it to fetch the user data from the server. As before, the component will allow the server to validate the user and handle the results in the same way as the signup component.
* ProfilePage Component: This component will render the basic profile information/page that each user will have access to when they login. It will render a secondary navigation bar to allow users to switch between the following three child components. It will also render the settings child component by default.
   * UserSettings Component: This component will display the user's information, username and password, and handle the case where they would like to edit them or delete their profile.
   * PostHistory Component: This component will display all previous blog posts the user has made and handle editing and deleting each post.
   * CreateBlog Component: This component will allow the user to write and post a new blog. This includes handling the titles, text, and images in the post as well as what tags will be associated with it.


## Functions and Logic:
The functionality of the page can be broken down into the features users will experience on the client side, and the functionality that will facilitate these features on the server side. Users navigating the page will be able to do the following:
   * Users can see all blog posts from all other users, including the comments from them as well. This will be done by sending requests to the database asking for all posts, and will map all of them into blog post components and display them for the user to scroll through. 
   * Users can like/dislike a blog post, which includes setting the ‘likes’ property for the post in the database. Blog post will change location in the “filtered by likes” option based on above.
   * Users can add a comment to the post they are reading by sending a post request to the database adding the comment to the post. The post will re render with the added comment.
   * Users can show/hide comments, which will simply remove the comments component from view.
   * Users can sign up, which will include sending the proposed username to the server with a request to check if the username is taken, and if not it will add the user profile to the database. 
   * Users can log in, which will send a request to the database to check to see if the correct username and password is entered for the account, if so, users will then be able to see their profile, which they can change the details for their account by once again sending requests to the server which contacts the database. The available options in the nav bar depend on whether the user is logged in or not. Below is a list of options are in the profile page:
      * Edit user info/delete account options, which sends the respective requests to the server
      * See/Edit/Delete previous blogs, which sends the corresponding request (update, delete, get)
      * Create new blog, which will add a new post to the users database through requests


* Users can filter the posts, which sends requests to the server which filters the database by the filter given in the request. The posts displayed will reflect the filter options given. The filter options are as follow:
   * Most Recent
   * Most Liked
   * Tags
   * From a User
Beyond the webpage, the database associated with the site will also need to be appropriately structured. It will be organized to allow users to filter according to the options listed above. To accomplish this there will be a database of users, each with a collection of posts they have made. Additionally, there will be a database of all posts made that can be organized according to likes or the date it was posted. There will be a similar database containing posts for each Tag that is created on the site. While having duplicate posts like this will be harder to organize and update, it will also make it easier for the server to find and display the correct information to the user.
Each of the posts in these databases will be a collection containing its ID, title, images, and text. There will also be a subcollection that outlines the comments associated with the post as well. This way all of the necessary information to display a blog post will be kept together and easily accessible by the server.


## API Formatting and Endpoint Routes
As for the API Request-response format, all requests will go through error checking, and based on the success will send the necessary status code as well as a message detailing what happened. This can include the actual error if applicable. These requests will always be in JSON format.
Beyond the general API structure, the endpoint routes on this site will be implemented using the CRUD methodology as follows:
* Create:
   * CreateBlog: Sends a post request with all of the information required to create a new blog post. Creating a unique ID for the post is handled and returned by the server.
   * CreateUser: Sends a request with a new username/password. Server will return success if username is unique and new user could be created 
   * CreateTag: Takes the tag as input and creates a new database for all posts with the same tag if the tag was not already used. 
* Read:
   * GetPosts: Takes a json filter, and finds all posts in the database that match that filter. Will return a list of json  objects (the posts found)
   * GetUserInfo: Returns username/password and associated blog posts (not comments)
* Update:
   * UpdateBlog: Will take the ID of the post to update and the fields that will be updated as well as their updated parts as an input and attempt to update the post. 
   * UpdateUser: Updates username/password
* Delete:
   * DeleteBlog: Will take the ID of the post to be deleted and attempt to delete it and its comments from the database. 
   * DeleteProfile: Will take the username as input and attempt to delete the username collection/database and all associated posts and comments from the mongo database.


# Development Plan
The development of this project will be split into two phases. Phase 1, which will be one week in length, will focus on creating the front end of the website, as well as some select back end functionality. Most of the front end components we need will be created, including things like the nav bar, a blog post placeholder component, a login and signup page and a user profile page. However, the login and sign up backend functionality will be implemented. This will mean each user can make an account and set their account details. By extension, this also includes setting up the database so the login data can be stored, however, it will be implemented differently than in Phase 2. This is because we do not have a server file yet to have HTTP requests retrieve and access the database, so all database interactions will be done on the react server for now. All CSS for each component created will be made as well. Ian will be mainly focusing on the CSS and navigational components, Jacob will be focusing on creating the main page components and Gavin will be focusing on implementing the sign in and sign up actions, as well as setting up the database. While these are everyones’ main focus, everyone will have a part in doing everything. At the end of this phase, a skeleton website will be created, including a nav bar, fake blog posts, and a functional sign up and sign in page, along with working user accounts. 
For Phase 2 of development, which is also a week long, we will be implementing the server file. This includes adding all endpoints and routes for HTTP requests from the react server and adding blog post functionality for the database. Functionality for the blog posts will also be added. This includes having each user create and edit blog posts, add comments, and like or dislike posts. Filtering for blog posts will also be added. For work allotments, Ian and Jacob will be implementing component functionality, and Gavin will be implementing the server page. Again, while these are the main tasks for everyone to focus on, everyone will help to create everything. Overall, the project will be finished by the end of phase 2, including functional blog posting, commenting, liking and disliking, filtering, and fully functional user profiles.

For Phase 2 of development, which is also a week long, we will be implementing the server file. This includes adding all endpoints and routes for HTTP requests from the react server and adding blog post functionality for the database. Functionality for the blog posts will also be added. This includes having each user create and edit blog posts, add comments, and like or dislike posts. Filtering for blog posts will also be added. For work allotments, Ian and Jacob will be implementing component functionality, and Gavin will be implementing the server page. Again, while these are the main tasks for everyone to focus on, everyone will help to create everything. Overall, the project will be finished by the end of phase 2, including functional blog posting, commenting, liking and disliking, filtering, and fully functional user profiles.



# Phase 1 Report

## Backend Implementation Work
The login and signup portions were successfully and completely implemented in this phase. The Login and sign up are their own components, each one allowing the user to enter the necessary information (username, password, full name) and then hit the sign up/login button to complete action. Once the action is initiated, the server goes through multiple checks for errors and then sends a request to the other server which attempts to connect to the database and complete the appropriate action. If the action is successful, the user is logged in and a cookie is made for the web page which stores their username and keeps them logged in, even when the webpage is closed and reopened. If unsuccessful, then it shows what the issue was, such as “Username is already taken”, “The password is incorrect”, or “There was an issue connecting to the database” and has the user try again. An example of this is shown in screenshot 1. As for the database itself, it follows a simple structure. For now, there is a database called ‘Users’ which holds all of the user profiles, including all of their information. This structure is shown in screenshot 2.

## Screenshot 1

<img title="Screenshot 1" alt="Screenshot 1" src="/images/Screenshot 1.png">

## Screenshot 2

<img title="Screenshot 2" alt="Screenshot 2" src="/images/Screenshot 2.png">

## Frontend Implementation Work
Implementation of the front end of the site revolved around completely setting up the website navigation, including distinguishing what navigation is available when a user is logged in or browsing as a guest. This was accomplished by using the cookies implemented during the login/signup portion of the site’s backend development (discussed above). If the user is logged in and navigates to their profile they will also be given access to a sub-navigation bar for viewing and editing their profile, previous comments, and previous posts (shown below). They can also choose to create a new post from their profile page.

## Screenshot 3
<img title="Screenshot 1" alt="Screenshot 1" src="/images/Screenshot 3.png">

Along with navigation each component that can be navigated to/interacted with by the user has been created and skeletal content has been added. The skeletal content is used for demonstrative purposes for the moment and will be replaced during Phase II development. All of the components have also been given CSS styling to allow for a better web page viewing experience, though it is far from professional quality.


## Challenges and Moving Forward
During Phase I development the biggest challenge faced by the team was creating references to child components. These were required to allow a parent component, MainPage, to access the state of child components, SignUp and LoginPage. This was something that was not covered during the course of the class so it required additional research to do.
Moving forward the team will need to modify the front end components to update their content on the server using an API. This will allow content to be stored in the database long term. The database, server, and API will need to be fleshed out to intake these requests appropriately. Although the team originally intended to allow users to edit their comments, initial work with the database showed this would require a much more complicated architecture to properly handle updates. In order to keep the time and scope of the project to a realistic scale this feature was dropped from development.



# Phase 2 Report

## Deliverables:
Below are the tasks accomplished during the Phase II development cycle of this project.


## Backend Implementation Work
In Phase 1, the backend work included login, signup and cookie functionality. In Phase 2, we implemented all post functionality, such as adding and deleting posts, displaying the posts on the main page with different filletring options such as by tag or showing all the posts, allowing the user to see their profile page and edit their info, displaying the users post history in their profile, and adding comment functionality such as adding and deleting comments. Adding and deleting the posts were simple, we created a new database for posts and when the user filled out the create post form in their profile it was added to the database. When a user deletes a post, the ID of the post is sent to the database for it to be deleted. Both of these actions were done by a http request. Displaying and filtering were just as simple. When a user loads on the main page, a request is sent to the server which gets all posts in the database and sends them back as a list to the webpage. Filtering is the same process, but except for finding all posts it finds all posts with a specific filter. The same method was again done for displaying the users post history; filtering by username. The profile page was implemented which simply takes the cookie token name which is their username and fetches their info in the database. The user can then edit their profile info on the profile page. Comment functionality was implemented on the back end along with the update functionality for blog posts. This is because the database stores the comments as a field of the post to maintain association between post and comment. When a new comment is created, the server will receive a request to update the post that holds the comment. The request holds all the data for the updated post, meaning that the server can update the post document in the mongo database with the new data from the request. After processing the request, the database will have the updated post with an additional comment, and a success message and status code is sent back to the frontend client.


## Frontend Implementation Work
While Phase I of the project focused on setting up the website’s navigation and skeletal structure, Phase II focused on implementing the features laid out by this structure. After Phase II user’s are able to edit their personal profile information and update it in the server. They can also create new blog posts and assign them a tag of their choosing (shown below). All created posts are rendered on the home page by default. Alternatively, the posts can be filtered so that only posts relating to a tag are rendered.

<img title="Image 1" src="/images/Image 1.png">

One feature present in Phase I that was dropped during Phase II development was filtering posts by username on the home page. It was decided that this didn’t make much sense in the spirit of the website. However, the same filtering technique was used to display user’s post history in their profile page. This page was where users could read exclusively their own posts, along with any comments attached to the post. This is also where they could choose to delete their posts as desired.

<img title="Image 2" src="/images/Image 2.png">

This phase also included creating capabilities for comments, giving the users the ability to add on comments beneath any post (shown below).

<img title="Image 3" src="/images/Image 3.png">

The user can click the comment button once they are happy with the text, and the comment will be added as part of the post data, and rendered with it onto the page.

<img title="Image 4" src="/images/Image 4.png">

Now in the comments section the user can see their comment displayed below the post.
The comment functionality is achieved by mapping through a list of comment data objects that are in the post’s state data. In the map we render a comment component


## Challenges and Moving Forward
Phase I of this project primarily consisted of technical challenges for the team while they learned how to integrate a complete MERN system properly. Phase II, on the other hand, taught the team the necessity of proper planning and standards prior to diving into implementation using such a system. The team found that they all went about implementing the same features on the site in wildly different ways. While each methodology worked well enough, they also led to a great deal of time and energy being wasted trying to make three separate visions for the React structure compatible. In some cases the team was able to overcome this challenge by sitting down and talking through the problems/bugs until a working solution emerged. In other cases however, the team found they’re implementations to be too drastically different and they weren’t able to fully implement some features on the given timeline. The biggest of these features being the ability for users to edit comments and blog posts.

If this project were to continue, including user editing abilities would be the next step in the process. First however, the team would sit down together and create much more strict and comprehensive guidelines for how they would approach building the site. These guidelines would include a more thoroughly drawn out system architecture than was originally created as well as more specific details for coding conventions including variable names and commenting.
