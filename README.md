# Bad Bank (tjmcode version)

An MIT xPRO 'Fire Hydrant' Project assigned as extra credit for the 'Digital Transformation' Course.

## Description

This assignment is intended to push you beyond the scope of the content of this course. It involves building a “full stack application.” This is an application that requires the front-end (the HTML and CSS that a user would interact with on the web) as well as the back-end (this is usually where the logic and data is processed, as well as the interaction with a database). No small task. In order to complete this extra assignment and earn the Fire Hydrant Award, you will need to use the following in order to build this three-tier, full stack, application.

Once complete, upload a screenshot of your website and a URL to the Canvas assignment page. Note: You will be shown how to host your own sites in the coming weeks. If you cannot host the site, upload your code files, JavaScript, HTML, and CSS. (Do NOT upload the node modules, only the code you've written)
NOTE: You can attend a webinar by Professor John Williams on January 9, 2022, at 3:00 PM UTC, where he will debrief you regarding this assignment. You will have until January 30 to complete and upload this assignment.

Tier 1) User Interface (UI): HTML, The Bootstrap CSS framework, client-side JavaScript functionality (managing elements on the web page dynamically and being able to respond to what the user does, button pushes, text entries, etc.)

Tier 2) Back-end API (API): Node.js functions and managing the ‘routes’ (specific website locations that correspond to different user environments, for example: login page, transactions, etc.), connected to the third tier (the database), and managing any reading and writing to and from any other web servers.

Tier 3) Back-end Cloud Database (CDB): lowdb, a simple, barebones database package available via the Node Package Manager (NPM).

Starter Code Repository (Front end and API)
https://github.com/1125f16/badbank  (Links to an external site.)

Starter Code Repository (Simple database)
https://github.com/1125f16/littledb  (Links to an external site.) This is a repository that will get you familiar with the process of storing data with the lowdb package.

Helper Videos:
* Three Tiers - HTTP Server (Links to an external site.)
  https://youtu.be/TL9GyGWqjp4
* Three Tiers - Data Store (Links to an external site.)
  https://youtu.be/yM8nFgkeD-c
* Three Tiers - HTTP Server + Data Store (Links to an external site.)
  https://youtu.be/E9VJ2de654M
* Three Tiers - HTTP Server + Data Store + HTML Client
  https://youtu.be/vcXdW4V8GNs


## Demonstration Video of Submission

* This video was recorded of the initial submission on JAN 30, 2022.
<p>
<video id="demo-video" src=".\videos\badbank-tjmcode-demo.mp4" width="1024" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allow="autoplay *" loop autoplay autobuffer controls muted></video>
</p>

## Getting Started

### Dependencies

This application was built on examples from the MIT xPRO courses. The ‘starter code’ was locked to specific packages using…
```
package-lock.json
```
…in particular these are locked to older versions:

* lowdb – a tiny local JSON (text-based) database.
* lowdb is locked to v1.0.0
* lowdb v3.0.0 (current) – is a ‘pure ESM package’


* express.js – a fast, minimalist web framework for NodeJS.
* express.js is locked to v4.16.3
* express v4.17.2 (current)


* node.js – is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.
* express.js is locked to v16.7.0
* node.js v16.13.2 (current)

## Installing

* express is installed in the app’s root folder using…
```
npm install express
```

* lowdb is installed in the app’s root folder using…
```
npm install lowdb
```

* bootstrap is installed in the app’s root folder using…
```
npm install bootstrap
```

## Running the 3-Tier Application…

### Step 1: Start the BACK END (Server and Database)

* On the Server (your local machine, i.e.: localhost)
* Go to the ‘Bad Bank’ Private Folder
Example if run from a local machine:
```
cd D:\GitHub\badbank-tjmcode
```

* On the Command Line, execute...
```
node index.js
```

### Step 2: Open a local Browser and go to:
```
http://localhost:3000/
```

* Verify the Server is running
* You should see the following…


<p align="left"><img src=".\images\badbank1.png" width="1024" title="Server running response..."></p>


## Code Construction

Code Construction details for reference.



### Tier 1) User Interface (UI): HTML

* The entry point is in the root folder: index.html
* The UI components are defined and loaded by: \public\modules\ui.js
* The Company’s common Client functions are defined by: \public\modules\mcodeClient.js
* The API Hooks are defined by: \public\api\api.js


<p align="left"><img src=".\images\badbank2.png" width="1024" title="UI HTML..."></p>


* The DIV “target” is loaded with the UI Element thru selection on the NAVBAR
* The DIV “result” is loaded with the results—or errors—from UI/API functions.



### Tier 2) Back-end API (API): Node.js functions…

* The entry point is in the root folder: index.js
* The API is defined and loaded by: index.js
* The Company’s common Server functions are defined by: mcodeServer.js


<p align="left"><img src=".\images\badbank3.png" width="1024" title="API JavaScript..."></p>



### Tier 3) Back-end Cloud Database (CDB): lowdb

* The entry point is in the NodeJS modules folder: \node_modules
* The LOWDB is defined and loaded by: \node_modules\lowdb


<p align="left"><img src=".\images\badbank4.png" width="1024" title="JSON Database..."></p>



## Terminology

| Word or Acronym	  | Description/Definition                                |
|-------------------|-------------------------------------------------------|
|  API	            |  An Application Programming Interface, or API, is the set of functions/objects that a developer will provide in order to make use of their services.
|  ExpressJS	      | Fast, unopinionated, minimalist web framework for Node.js
|  lowdb	          | A JSON based (text) database.
|  NodeJS	          | A development stack that executes from a local file store—on a local Server—instead of from a network of remote servers on the Web.
|  NPM	            | Node Package Manager, actually “Node PM”, “Node pkgmakeinst” a system to deploy, install, and maintain NodeJS Apps. (PM was a BASH utility).



## Authors

Contributors names and contact info

* Dr. Abel Sanchez (MIT) [@Unknown](https://twitter.com/Unknown)

* Timothy J McGuire [@TimothyMcGuire](https://twitter.com/TimothyMcGuire)

## Version History

* 0.2
    * Moved README PNG files into /images folder vs. embedded
    * See [commit change]() or See [release history]()
* 0.1
    * New README.md
    * See [commit change]() or See [release history]()
* 0.0
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details


## Acknowledgments

This was created a ab branch of Dr. Abel Sanchez' MIT Bad Bank
* [MIT Bad Bank](https://github.com/1125f16/badbank)
