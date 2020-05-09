React Eventrra

This is a single page e-invite web application created using react. This application is used to create event invitations and invite registered people. It also lets users view and respond to received invitations from other registered user. The application can be usable by multiple users across browsers simultaneously.

How to run:

* run npm install
* The dev-server can run with npm start.
* The services server is run with npm run server

Server side --> server
* Server has 4 files index.js, users-list.js, events.js and auth.js
    1. index.js contains all rest service APIs.
    2. users-list.js contains all users related functionality
    3. events.js contains all events related functionality
    4. auth.js contains user authention related functionality

REST services:

* GET '/session' - this service call  gets session information on initial render
* POST '/registration' - this service call adds the user info to the users object (Registers a user).
* POST '/session' - this service call checks whether the user already has account. If No, it throws an error saying registration required. If Yes, it sends response OK.
* GET '/users' - this service call gets all registered users
* GET '/events/:username' - this service call gets all events(both created and invited events) of a given username
* GET '/event/:eventId - this service call gets a event of a given event ID.
* POST '/event' - this service call adds a new event to the events object.
* PUT '/event' - this service call updtaes the passed event
* PUT '/response' - this service call updates the response of the passed event.
* DELETE '/event/:eventId' - this service call deletes a event of a given event ID from the events object, deletes that event from createdEventsList and InvitedEventsList as well.
* DELETE /:username/event/:eventId' -  this service call deletes a invited event from the passed user invited list.
* DELETE '/session' - this service call deletes the session by clearing cookie (used to logout).
* DELETE '/registration' - this service call deletes the user from the users object(used to delete account)

Functionality

* Registration page

  New user has to register with first and last name to use this application. Application concatenates firstName and lastName and sets that as username.

  1. Registration page has two inputs --> firstName and lastName
  2. Both inputs are mandatory
  3. firstName or lastName includes dog, empty spaces and names > 26 characters are not allowed
  4. Registration page has link 'Already have account? click here to login' to navigate back to login page

* Login page

  On initial render of the application, user first gets login page.

  1. New user
     1. If the user is new to the application, user has to register first. User has to click link 'new user? click here to register' to go to registration page
  2. User already have account
     2. user can login by giving username( firstName+lastName) and its mandatory field.

* Home page

  After successfull login, user gets to home page.

  Home page contains
   * Created events list
        1. Each events has following details on home page
            1. Event name - by clicking event name, user gets event details page which has more details of that particular event
            2. Event venue
            3. Event date and time
            4. Uddate event button
                By clicking update event button, user gets update event page with all information auto filled to update the event details. User can update and send that event again to the selected users. So that invited users gets the latest updated version of that event.
            5. Delete event button
                Once the user clicks the delete button, this event gets deleted on the user's created event list and also from the invited events list of all the invitees that the user invited( invited user has to refresh page by clicking refresh button to see the this change).

   2. Invited event list
        1. Each events has following details on home page
            1. Event name - by clicking event name, user gets event details page which has details of that particular event
            2. Event Host
            2. Event venue
            3. Event date and time
            4. Send response button with yes and no options
                    1. Once user clicks send response button, application first checks whether that event exits or not. If yes, it sends response. If no, it throws error saying 'host deleted event. Refresh the page'.User has to click refresh button to see latest invited event list.
                    2. User can send response by clicking one of the option. Once invited user sends response, attending/not attending number gets updated on the event of the user who created that event.
                    3. As soon as user clicks send response button, send response button gets replaced with update response button.
                    Update Response Button:
                        1. Once user clicks update response button, application first checks whether that event exits or not. If yes, it sends updated response. If no, it throws error saying 'host deleted event. Refresh the page'.User has to click refresh button to see latest invited event list.
                        2. If the invited user clicks update response button, he will again get two options yes or no.
                        3. He can send updated response by selecting one of the option.
                        4. After invited user sends updated response, attending/not attending number gets updated on the event of the user who created that event. If the invited user sends same response again(for example yes again, attending/not attending will not change. It reamins same).
            5. Delete event
                    1. Once user clicks delete event button, application first checks whether that event exits or not. If yes, it deletes the event. If no, it throws error saying 'host deleted event. Refresh the page'.User has to click refresh button to see latest invited event list.
                    2. Once the user clicks the delete button, this events get deleted from the clicked user invited list only.

   3. Create event button
        user gets create event page after clicking the create event button

   5. Logout
        1. Once the user clicks logout button, Application clears the session by clearing the cookie but don't delete the user info and events associated with that user from the application datastructure. If the same user logins again, user can see all events associated with that user.
        2. After clicking logout button, user gets login page. same user can login again or another user also can login by providing registered username.

   6. Delete Account
        1. Once the user clicks delete account button, Application clears the session by clearing the cookie and delete the user info and all events associated with that user.
        2. After clicking delete account button, user gets login page. If same user likes to use application after deleting accoount, user has to register to use application

    7. Refresh Button
        1. User can use this refresh button, so refresh the page to get the latest event lists.

* Create event page
        1. Create event page has following fields
                Mandatory fields
                    1. event name
                    2. event venue
                    3. event date/time
                    4. event details
                Non mandtory fileds
                    1. contains all registered users except him as invitees list
                    2. Users can select mutiple users from that invitees list
        2. submit button
            1. Once the user enters all information and clicks submit button, this event gets added to the created event list(created user can see that in created List in home page) and also its get added to the invited list of the invited user(user can see that in invited list in home page)
            2. By clicking submit button, user gets event details page to see the event details of the created event.
        3. Link 'back home' to go back to home page

* Event details page
        1. Event details page has following fields
                    1. event name
                    2. event venue
                    3. event date/time
                    4. event details
                    5. Invited user names
                    6. attending number
                    7. not attending number
        2. Link 'back home' to go back to home page

* Update event page
        1. Update event page has following fields in which all these are auto-filled with old information
                Mandatory fields
                    1. event name
                    2. event venue
                    3. event date/time
                    4. event details
                Non mandtory fileds
                    1. contains all registered users except him as invitees list
                    2. Users can select mutiple users from that invitees list
        2. user updates the fields that he wants to change
        3. submit button
            1. Once the user updates and clicks submit button, this event gets added to the created event list(created user can see that in created List in home page) and also its get added to the invited list of the invited user(user can see that in invited list in home page) by deleting the old one
            2. By clicking submit button, user gets event details page to see the event details of the created event.
        3. Link 'back home' to go back to home page

errors:

* Application displays meaningful user friendlier messages when error occurs.


Application has 2 pre-populated users and events for reference

sample events structure:

const events = {
  "1": {
        eventId : 1,
        eventName: "Birthday",
        eventOrganizer: "Amit",
        eventVenue: 'Bothell',
        eventDateTime: 'April 30th 3 to 5pm PST',
        eventDetails: 'lets have fun',
        invitees: ['Bao'],
        attending : 0,
        notAttending: 0,
    },
  "2": {
        eventId : 2,
        eventName: "Marraige",
        eventOrganizer: "Bao",
        eventVenue: 'Bothell',
        eventDateTime: 'April 20th 10 to 5pm PST',
        eventDetails: 'lets have fun',
        invitees: ['Amit'],
        attending : 0,
        notAttending: 0,
    },
};

sample users structure:

const users = {
    "11": {
        username: "AMIT",
        uid: '11',
        createdEventIds: [1],
        invitedEventIds: [{eventId: 2, responded: ''}],
      },
      "43": {
        username: "BAO",
        uid: '43',
        createdEventIds: [2],
        invitedEventIds: [{eventId: 1, responded: ''}],
      },
};