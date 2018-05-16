# Readable Project

## Introduction
Readable is a reddit-like forum webapp where users may make posts, comments, upvote/downvote comments/posts, and view posts categorically.

## More Details
 Links to the home page and each category page are accessable at the top of each and every page of the webapp. Posts are associated with an individual category. All posts may be viewed all together on the main page (All) or by category by navigating to each of the categories' separate web pages. These category list views display only some of the information related to a post where more information may be viewed, such as comments and the post body, on their individual page. Posts may be voted on from the category page, all categories page, or their own post details page. They may also be deleted from any page they are displayed. Posts and comments may be edited on any post details page. New posts may be added to any category on the main page, or to a specific category on a category list page.

 ## URL Navigation patterns
- '/' The home page which lists all the posts on readable regardless of category.
- '/:category' The category page which lists all posts associated with the category specified by ':category'
- '/:category/:postid' The post details page which includes all the means to edit, delete, or comment on a post.

## Installation
1. Open up a command window and navigate to the directory you wish to install Readable on your machine (the command should be '*cd \<directory\>*' where *\<directory\>* is your desired directory).
2. Run the command '*git clone https://github.com/awthomps/udacityreactproject2.git*' and after a moment, the project shall download and should say 'done.'
3. After the project has been 'cloned', change directories to the project file 'udacityreactproject2' by entering the following command in your command window: '*cd udacityreactproject2*'
4. Now you may proceed to start installing the necessary dependencies for the project. Please enter the following command to install: '*npm install*'. This may take some time.
5. If you already have the development server, skip to the 'Running Readable' section of the README. Open up a new command window and navigate to the directory in which you installed Readable, or any other directory you desire to place the backend server of the webapp.
6. Run the comman '*git clone https://github.com/awthomps/reactnd-project-readable-starter.git*' and after a moment, the project shall download and should say 'done.'
7. Change directories in the second command window to 'reactnd-project-readable-starter/api-server' by entering the following command in your command window: '*cd reactnd-project-readable-starter/api-server*'
8. Now you may proceed to start installing the necessary dependencies for the packend project. Please enter the following command to install: '*npm install*'. This may take some time.

## Running Readable:
1. If you already have both command windows up from the installation, you should be set. Otherwise, open up two command windows. Navigate one to where you ran '*npm install*' on the backend server and the other to where you ran '*npm install*' on the Readable app.
2. Run the command: '*npm start*' on the backend command window and then on the Readable app command window.
3. After a momment, your default browser should open up the Readable webapp automatically. If it does not, open up a new internet browser window or tab and navigate to Readable by entering '*localhost:3000*' in the url entry bar and press enter.
4. The main page of the MyReads app should now be displayed in your browser
5. Congratulations! You have installed Readable! Now get Readating you Readator.