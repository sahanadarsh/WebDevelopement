# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

The URL of a REST service should represent a resource to interact with. The URL should be a noun and not a verb. It should be semantically meaningful and should represent the data being fetched from the server.

for example,

Consider an example of RESTful API to get item from server.

Below is the URL that does not represent a resource:

URL: /getItem

app.get('/getItem', (req, res) => {
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  res.json(items.getItem());
});

The URL can be modified to represent a resource in the following way:

URL: /item

app.get('/item', (req, res) => {
  let uId = req.cookies.uid;
  if(uId == null){
    res.status(400).json({ error: 'uid-missing' });
    return;
  }
  if(!users.checkUserId(uId)){
      res.status(400).json({ error: 'uid-unknown' });
      return;
  }
  // sleep(1000);
  res.json(items.getItem());
});


## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
We need to parse the response before logging it.

The following changes would fix it.

When fetch is successful, we read a USVString(text) object out of response using text(), then console log the username.

fetch('/username');
.then( (response) => {
    response.text().then(function(username){
        console.log(`user is named ${username}`);
    });
});

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
Store state in the DOM means storing the state (summary of the current value for all the things that can change) in the DOM instead of storing in variables/object and use those to update the screen as needed.

we should not do this because of the following reasons

1. It doesn't follow MVC model(common best-practice pattern for man situations) where something manages the data(Model), something manages the flow of the application(Controller) and something translates the data to output(view)
2. It also leads to memory leakage
3. It also causes security issues because the screen is visual output. Therefore anyone can alter the data stored in the DOM from the browser.


## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

Single-page-web application:

1. More modern way
2. Single-page application (SPA) is a web application or website that interacts with the web browser by dynamically rewriting the current web page with new data from the web server, instead of the default method of the browser loading entire new pages.
3. Back-end and a front-end are separated and they don’t interfere in each other’s concerns. 
4. single-page application works inside a browser and does not require page reloading during use.
5. Data updates are handled by service and REST api calls where data is send back and forth the server
6. SPA requests the markup and data independently and renders pages straight in the browser
7. It requires JavaScript to be present and enabled. If any user disables JavaScript in his or her browser, it won’t be possible to present application and its actions in a correct way.
8. SPA is less secure due to Cross-Site Scripting (XSS), it enables attackers to inject client-side scripts into web application by other users
9. Memory leak in JavaScript can even cause powerful system to slow down
8. Examples : facebook, twitter,  Gmail, Google maps etc

Multiple-page-web application:

1. More traditional way
2. Multi-page application consists of several pages with static information (text, images, etc) and links to the other pages with the same content. During a jump to another page, a browser reloads the content of a page completely and downloads all resources again, even the components which are repeated throughout all pages which makes it slower comparatively
3. Front-end and back-end development are tightly coupled
4. Page reload is required to display the changes from server to front end
5. Multi page application is more secure 
6. Multi page Applications are not too prone to memory leaks
7. Examples : NEU website etc

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Progressive enhancement is a design philosophy that centers around providing a baseline of essential content and functionality to as many users as possible, while at the same time going further and delivering the best possible experience only to users of the most modern browsers that can run all the required code.

Process of taking a non-client JS web app and augmenting it with JS is progressive enhancement. It remains working if no JS(no client side JS). Its great for search engines, accessibility and various devices. And also its great for ensuring backend is secure.

Ex: Initially building a chat application that works as multiple-page web application and 
then adding advanced front end javascript, using RESTful APIs and HTTP methods(to perform CURD operations) to work as a single page web application is an example of Progressive Enhancement.

A SPA that uses progressive enhancement will have code that executes the web application functionalities using front-end javascript(RESTful APIs) as well as backend javascript(server side page reloads) whereas the SPA without progressive Enhancement will only have front-end javascript using REST APIs.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.

Rest service is similar to dynamic asset due to the following reasons.

1. REST services are web service calls that follows REST protocols.
2. Representational state transfer protocol(REST) is a software architectural style that defines a set of constraints to be used for creating Web services.
3. REST uses HTTP methods such as GET, PUT, POST, DELETE, PATCH etc to perform various CRUD operations.
4. REST services are async which runs in the background and creates responses to request.
5. By definiton, dynamic assets doesn't exist as a file and is generated in response to request. They are constructed either immediate or for a short span. 
6. An example of a dynamic asset is json data specific to the user requesting it. It has to be generated specifically for that user and dynamically.
7. Dynamic asset triggers are also async in nature.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

An information that should not be stored in a cookie is 'Password'. The data stored in cookies are available as plain text. Therefore if we store passwords, users can easily get our passwords which can cause security issues. Therefor cookies are never a good option to store data.

## Q8: Explain why it is useful to separate a function that fetches data from the what you do with that data

It's useful for the following reasons

1. A good separation of concerns
2. It would make the code easy to understand
3. Change or extend with minimal effort(should not mean to change code everywhere)
4. HTML should have nothing to do with calling a service
5. Does not change if the HTML Changed
6. Code is more reusable
7. Know what functions do without looking at the code
8. Caller can decide how to react to this data

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)

"Try/catch" is useless because try/catch is synchronous and if error is thrown in asynchronous code we have already completed the try/catch. Execution doesn't remember that its inside the try/catch because it already ran and came out before the async call back is executed. This means code in catch will never be executed.

try {
  Promise.resolve()
  .then( () => {
    console.log("-----inside then-----");
    throw new Error("error");
  });
} catch( err ){
  //doesn't happen
  console.log(`caught ${err}`);
}
console.log("-----outside try catch-----");

output is
  -----outside try catch-----
  -----inside then-----

In this example, console.log("-----outside try catch-----") gets executed before the promise is resolved.
Error never be caught.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

Both frond end and Server-side requires Separation of concerns.

For example, Lets consider a service call which deletes the user

At the server side:
Its good to separate management of users(add/delete/modify) from processing of cookies and errors

In file server.js
This contains cookie processing and error handling

app.delete('/session', (req, res) => {
    const uId = req.cookies.uid;
    if(!uId) {
      res.status(401).json({ code: 'UID missing'});
      return;
    }
    if(!users.checkUIdExit(uId)) {
      res.clearCookie('uid');
      res.status(403).json({ code: 'Unknown UID'});
      return;
    }
    users.removeUser(uId);
    res.clearCookie('uid');
    res.sendStatus(200);
});

In file users.js
This contains management of users(add/delete/modify)

function removeUser(uId) {
    if(users[uId]) {
        users[uId].active = false;
    }
    delete users[uId];
}

At client side:

It is good to separate a function that fetches data from the what you do with that data

In file services.js
API call to delete user

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE'
    })
    .catch( () => {
        return Promise.reject({code: 'network-error'});
    })
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( result => Promise.reject(result) );
        }
        return;
    });
};

In file recipe.js
The post processing of service call is done here which is to render homepage with or without error

loggedInHomePage.addEventListener('click', (e) => {
	e.preventDefault();
	if(!e.target.classList.contains('logout-button')) {
		return;
	}
	fetchLogout()
	.then( () => {
		appState.error = '';
		appState.isLoggedIn = false;
		getRecipeList();
	})
	.catch( (err) => {
		appState.isLoggedIn = false;
		appState.error = err.code;
		renderPages('homePage');
	});
});
