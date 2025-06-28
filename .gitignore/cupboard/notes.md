# Project Documentation

## Table of Contents
1. What's in here?

## What's In Here?

### Index
1. Node
2. Express

### Node.js

Node.js is open-source (?), cross-platform, backend JavaScript runtime environment (RTE) [An RTE provides a program all of the necessary hardware and software it needs to run independently, interfacing with the OS, managing resources like memory and variables, handling I/O, and ensuring proper termination] that executes JavaScript outside of a web browser.

<b>Applications include: </b> 

<em>Server-side scripting</em> - Creating the logic behind websites and web applications, handling authentication, database interations, and API development 

<em>Command-Line Tools</em> - You can create your own CLI tools for automating tasks and managing development workflows.

<em>Real Time Applications</em> Apps that require real-time data transfer, ie: chat apps, online-gaming, collaborative editing tools, etc. Event driving and non-blocking architecture (the app can work on multiple calls at once rather than setting a specific order that must be completed sequentually) is ideal for multiple connections.

<em>APIs and Microservices</em> - Great for apps that act as a collection of loosely coupled services and functionalities.

<em>Streaming</em> - Can handle data in streams without jumbling or delaying.


<b>Unique Offerings</b>

<em>Asynchronous</em> - aka non-blocking

<em>Javascript Everywhere</em> - Need I say more?

<em>NPM - Rich Ecosystem</em> - Massive ecosystem of open source libraries available through npm. Save time and effort we pre-built modules created by developers all over the world.



### Express.js

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's the most popular and likely de facto framework for Node.js designed to simplify the process of developing scalable and maintainable server-side applications

<b>What is it used for?</b>

<em>Web Applications</em> - Express.js provides the routinf and middleware necessary to handle HTTP requests and render dynamic content. Express will match an HTTP URL and method request against different routes. EX: app.get('/users', (req, res) => {...}); is a handler function that defines a route which handles GET requests to the /users path.

HTTP request is received by express application =>  
Express's routing system identifies the matching route with associated handler function and middleware =>  
Middleware functions are executed in the order they are defined. The requests my be processed, modified, and passed from one middleware to the next using next() =>  
The final route handler function processes the request and constructs an HTTP response using methods from the res object. EX: res.send(), res,json(), res,render() =>  
The response is then sent back to the client

<em>APIs</em> - Great at creating RESTful APIs that serve data to frontend, mobile apps, and other services

<em>Microservices</em> [explained in Node above]

<em>Real-Time Applications</em> - When used with WebSockets, express.js is great for real-time applications like chats and collaboration tools.

<em>Proxy Servers and API Gateway</em> - Proxy servers can forward requests from one server to another. Or API Gateway to manage access to a secure collection of microservices.


### Modules

<b>Helmet</b>

Security middleware that configures various HTTP headers.

<b>Nodemon</b>

Commandline tool that automatically restarts a Node.js application when it detects a file change in the project directory

<b>Morgan</b>

Morgan is an HTTP request logger that logs detailed information about incoming HTTP requests such as method, URL, status code, and response time. Uses are debugging, performance monitoring, auditing, security analysis.

<b>Cors</b>

Stands for Cross-Origin Resource Sharing. It relaxes the browser's default Same-Origin Policy while still providing protection from cross-site security attacks. It allows different components of an application hosted on seperate domains to communicate seemlessly, allow web apps to securly utilize APIs from external sources, and to create one's own environment and define certain port uses within the server (or so it seems).
