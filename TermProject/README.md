# ISP-Final
MEAN-stack Calendar App for Internet Systems Programming

**M**ongo **E**xpress **A**ngular **N**ode

Site: [Calendar.io](http://ispfinal.herokuapp.com)

Libraries/Frameworks Used:
* **MongoDB**
* **ExpressJS**
* **AngularJS**
* **NodeJS**    - Serverside JS packages
* **Gulp**      - JS Task Manager
* **Mongoose**  - MongoDB Schema
* **Passport**  - Authentication
* **Bower**     - Clientside JS packages
* **MomentJS**  - Date/Time Library
* **UI Router** - Angular package for Single Page Applications
* Bootstrap CSS
* Deployed via **Heroku**

Features
* JWT Token-authentication
* Auto-generated password salt/encryption
* Account creation
* Unique login verification, minimum password length requirement
* Daily, Weekly, and Monthly calendar views
* Create, Read, Update, and Destroy events
* Create **recurring** events that occur on a given weekday from X until Y
  * (e.g. every Monday and Wednesday from August until December)
* Notification popup service - e.g. When logging in, a popup displays a message.
* Event styling is reactive to the current time
  * Strikethrough for past events
  * Green for currently-ongoing events
  * Yellow for events happening soon
  * Blue for events that are occuring in the next 12 hours
