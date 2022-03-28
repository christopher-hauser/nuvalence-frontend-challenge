# Nuvalence Front End Challenge - Address Book

## Deployment Instructions

### How to Deploy to AWS Elastic Beanstalk

### How to Run Locally


## Summary
The assignment provided was to create an address book web client that should display a list of persons from the Random User API (https://randomuser.me/).

The main criteria was as follows:
- User should see the list of persons from the address book
- User should be able to select a person from the list and navigate to the details page
- User should be able to see the first name, last name, and phone number on the details page

### Overall Approach
When I first approached this project, I thought about two different kinds of address books: one that acts like a directory (i.e. a list of employees on a company website), and one that
behaves more like a personal contact list (i.e. the one you might find on your phone). The former is pretty simple - you pull the information from the database or API and display it on the page. However, I was hoping to create something a bit more interactive, like a personal contact list where you can favorite contacts, add notes, update information, and more. That is the
premise for the application I built.

### Features
- Contact Selection
The most basic, but integral feature on this site is the ability to select a contact and render their information. Users are able to click on a user from the list (displayed on the left-hand side for large screens, bottom half of the screen on smaller ones) and display information including name, phone numbers (cell and home), email, and home address. This is done with React and
Redux state management.

Redux is implemented to store the current page of contacts, which is pulled out of state by the Contact List component and passed as props down to each individual Contact Select component. This is what creates the clickable list of contacts. When one of those individual contacts is clicked, that contact information is sent to the Redux state, where it can be accessed by the Contact Details component. This is what renders the full contact information for each individual.


- Mobile Responsiveness

### Next Steps and Constraints


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
