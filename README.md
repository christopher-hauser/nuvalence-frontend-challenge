# Nuvalence Front End Challenge - Address Book

## Deployment Instructions

### How to Deploy to AWS Amplify
This application is deployed using AWS Amplify. For quick access to the live site, visit https://main.d3eldjvm4tvlyj.amplifyapp.com/. If you'd like to deploy the application with Amplify
using your own AWS account, follow the instructions below.

#### 1. Clone this project into a new GitHub repository.
1. Create a new empty repository.
2. Make a local copy of the project:
    ```
    git clone https://github.com/christopher-hauser/nuvalence-frontend-challenge.git
    ```
3. Add your empty repository as an upstream remote.
    ```
    cd nuvalence-frontend-challenge
    git remote add upstream https://github.com/<YOUR_USERNAME>/<YOUR_EMPTY_REPO>.git
    ```
4. Update your empty repository.
    ```
    git pull upstream master
    ```
5. Finally, push your forked copy of the original project back to GitHub.

#### 2. Deploy using AWS Amplify.
1. Create an AWS account or log in to an existing one at https://aws.amazon.com/amplify/.
2. Create the application.
    * If you don't have any applications deployed yet, you will see a "Get Started" button. Click it and then click the next "Get Started" button under "Host your web app".
    * Select GitHub as the source for your existing code. Click continue.
    * Under recently updated repositories, select the new repository you pushed the code from step 1 to. (Note: You may need to authorize GitHub. If so, follow the instructions provided to log in.)
    * Select main as your branch. Click next.
    * Input a name for your app.
    * Under Build and test settings, click edit. This is to add one line of code to run our tests on deploy.  (See 'npm test --watchAll=false' in the commands under preBuild)
    - The code should look like this:
        ```
            version: 1
            frontend:
            phases:
                preBuild:
                commands:
                    - npm install
                    - npm test --watchAll=false
                build:
                commands:
                    - npm run build
            artifacts:
                baseDirectory: build
                files:
                - '**/*'
            cache:
                paths:
                - node_modules/**/*
        ```
    * Check the "Allow AWS Amplify to automatically deploy all files hosted in your project root directory,' then click next.
    * Save and deploy!
3. Access the app!
* You should now be able to see information on the newly deployed application. It will begin the deployment process and will likely be on the "Provision" stage. It may take a few minutes to fully deploy.
* Once deployment has completed and the application has been verified, you can click on the link provided by AWS.

### How to Run Locally
Running the application locally can get the app up and running on your system quickly. However, you will need to have Node.js and the npm command line interface installed to do this.

1. Clone the directory to your local machine.
    ```
    git clone https://github.com/christopher-hauser/nuvalence-frontend-challenge.git
    ```
2. Install all dependencies.
    ```
    npm install
    ```
3. Run the app! This should open a new tab in your browser with the app. If not, you can access it in the browser at http://localhost:3000/.
    ```
    npm start
    ```

## Summary
The assignment provided was to create an address book web client that should display a list of persons from the Random User API (https://randomuser.me/).

The main criteria was as follows:
- User should see the list of persons from the address book
- User should be able to select a person from the list and navigate to the details page
- User should be able to see the first name, last name, and phone number on the details page
- The application should be responsive

### Overall Approach
When I first approached this project, I thought about two different kinds of address books: one that acts like a directory (i.e. a list of employees on a company website), and one that
behaves more like a personal contact list (i.e. the one you might find on your phone). The former is pretty simple - you pull the information from the database or API and display it on the page. However, I was hoping to create something a bit more interactive, like a personal contact list where you can favorite contacts, add notes, update information, and more. That is the
premise for the application I built.

### Features
#### Contact Selection
    The most basic, but integral feature on this site is the ability to select a contact and render their information. Users are able to click on a user from the list and display their name, phone numbers (cell and home), email, and home address. This is done with React and Redux state management.

    Redux is implemented to store the current page of contacts, which is pulled out of state by the Contact List component and passed as props down to each individual Contact Select component. This is what creates the clickable list of contacts. When one of those individual contacts is clicked, that contact information is sent to the Redux state as an object, where it can be accessed by the Contact Details component. This is what renders the full contact information for each individual.

#### Favorite Contacts
    Thinking about this app as more of an individual's contacts as opposed to a large directory, I wanted to implement a Favorites feature. Users can click the stars on the right-hand side of each
    contact's element in the list to favorite or unfavorite them. They are then added to the carousel with their name and photos for easy access. There is no limit to how many contacts a user can favorite.

    Given that I was working with a randomly-generated list of users and not a database where I could modify information, I decided to store these favorite contacts in localStorage. This means that
    users can favorite contacts, navigate away from the page, and return to see those favorites persist. Again, this is something much better implemented with a database that can keep track of the favorited status of a user, but localStorage provides a unique fix for this kind of assignment.

#### Responsiveness
    Part of this assignment was to ensure that the application was responsive to multiple different browser sizes. This was done using media queries in sass to adjust layout, font-sizes, view heights, and more depending on the screens width and height. Media queries based on screen width often handle the majority of responsive styling issues, however, providing additional queries based on height ensures that wide and short screens (i.e. iPads) also clean.

#### Favorites Carousel
    One basic HTML/CSS trick I implemented was the Favorites carousel. This is something that might be done more robustly by building out a full React Carousel component or using some of the existing Carousel compoenent libraries that are out there, but given the assignment, it made sense to make a simple one on my own. The carousel functions using an in-line style attribute that dynamically changes the ```transform: translateX()``` property on the inner carousel div whenever the 'slidePosition' variable in state changes. There is some logic in a useEffect that keeps track of the index of the selected contact and updates that state of 'slidePosition' accordingly.


### Next Steps and Constraints
The biggest constraint of this project was the API. Not having a database meant that I was unable to do many of the things one might expect from an interactive contact list. Some of these features include adding notes to contacts, being able to update and delete individual's contact information, add brand new contacts, and more. I was glad to still implement one database-dependent feature utilizing localStorage, but building a fully functioning contact list application with multiple CRUD features solely utilizing localStorage might have been excessive for this purpose, especially considering performance and how unrealistic that would be in any other modern app.

Search was one feature that I implemented initially, but ultimately decided to remove in the final product. The API was once again the cause for this. I was glad to implement pagination to ensure quality page performance, something which the Random User API makes quite easy. However, this also meant the page was only loading a small chunk of users for each page. Searching through a small list like this without having access to the users on all of the other pages felt a bit trivial. That said, it is absolutely something I would expect to implement in a fully-fleshed out contact list application with access to consistent data, probably using debouncing for page optimization.

Similarly to search, I also began to implement a nationalities filter before realizing that the API did not support querying by nationality on top of the existing pagination and seed parameters I was setting. I would have set the nationalities in state using checkboxes and then had the URL in the API fetch to dynamically update on state change or, for better page performance, on a button click. Filtering like this (or by other information like location), might be another feature I'd consider in a more fleshed out version of this application.


### Technologies Implemented
#### Site
- React
- Redux
- JavaScript
- Sass

#### Testing
- React Testing Library
- Jest
- Enzyme
