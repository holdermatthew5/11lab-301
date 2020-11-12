# book_app

**Author**: Matthew Holder and Micheal Greene
**Version**: 1.1.1

## Overview

## Time Estimates

Number and name of feature: Feature #1 - Load
Estimate of time needed to complete: 30min
Start time: 1:03pm
Finish time: 2:40pm
Actual time needed to complete: 1hr 37min

Number and name of feature: Feature #2 - Form
Estimate of time needed to complete: 45min
Start time: 2:50pm
Finish time: 5:40pm
Actual time needed to complete: 2hr 30min

Number and name of feature: Feature #3 - Browse
Estimate of time needed to complete: 3hrs
Start time: 8:00pm Tuesday
Finish time: 6:00pm Thursday
Actual time needed to complete: 3hrs

Number and name of feature: Feature #4 - Error
Estimate of time needed to complete: 10min
Start time: 9:45pm
Finish time: 10:00pm
Actual time needed to complete: 15min

Number and name of feature: Feature #5 - Style
Estimate of time needed to complete: 2hrs
Start time: 10:00pm Tuesday
Finish time: 6:30pm Thursday
Actual time needed to complete: 3hrs

Number and name of feature: Feature #6 - Home
Estimate of time needed to complete: 5min
Start time: 6:30pm
Finish time: 6:32pm
Actual time needed to complete: 2min

// Note: These features gave me alot of trouble and wound up bluring together, so finding a distinct time period for each one is pretty much impossible unless you assume they all started and ended at the same time which wouldn't be completely inaccurate.

Number and name of feature: Feature #7 - Index
Estimate of time needed to complete: 3hrs
Start time: 8:00pm Thursday
Finish time: 8:45pm Friday
Actual time needed to finish: 6hrs

Number and name of feature: Feature #8 - Detail
Estimate of time needed to complete: 2hrs
Start time: 8:45pm Friday
Finish time: 9:00pm Tuesday
Actual time needed to finish: 12hrs

Number and name of feature: Feature #9 - Display
Estimate of time needed to complete: 1hrs
Start time: 8:45pm Friday
Finish time: 9:00pm Tuesday
Actual time needed to finish: 12hrs

Number and name of feature: Feature #10 - Server
Estimate of time needed to complete: 30min
Start time: 9:00pm
Finish time: 9:15pm
Actual time needed to finish: 15min

Number and name of feature: Feature #11 - Styling
Estimate of time needed to complete: 3hrs
Start time: 9:15pm Tuesday
Finish time: 6:30pm Wednesday
Actual time needed to finish: 5hrs

## Getting Started

Since this app does not yet contain any API keys (the google books API does not require an API key), building this app on your own computer is as easy as:
- cloning the github repo (`https://github.com/holdermatthew5/11lab-301.git`) onto your machine.
- installing dependencies with `npm install`.
- creating the app in heroku with `heroku create`.
- pushing your new app to heroku with `git push heroku main`.

And finally, enjoying the app.

## Architecture

This project uses:
- express
- ejs
- superagent
- javascript
- html
- CSS
- node.js
- npm
- git
- github
- heroku

## Change Log

10-31-2020 1:03pm - App is created.
10-31-2020 2:40pm - HTML rendered to page and css connected.
10-31-2020 5:40pm - Form now sends useful data to server.
11-03-2020 10:00pm - User and dev are notified when there is an error by presenting the error onscreen (either in the terminal or in show.ejs).
11-05-2020 6:00pm - Feature #3 presents the necessary data about the books found in the search to show.ejs from index.ejs by server.js (server renders index to show for users entertainment).
11-05-2020 6:30pm - Feature #5 presents the data in a dim lightwith well contrasted text to provide optimum reading conditions for a night reader.
11-05-2020 6:30pm - Feature #6 loads the proper file on pageload.
11-07-2020 8:45pm - Feature #7 shows how many books the user has saved and the books themselves.
11-10-2020 0:00pm - Feature #8 gives the user the ability to view the details of a single book from the home page, but in a seperate page.
11-10-2020 0:00pm - Feature #9 gives the ability to add a book to their collection from the search results page then view the details in a seperate view.
11-11-2020 0:00pm - Feature #10 cleaned up the server.js file and created partials to help reduce repeated code.
11-11-2020 0:00pm - Feature #11 finished up the styling and cleaned up the css files.

## Credits and Collaborations

Meyerweb.com gave us the code for our reset.css.
