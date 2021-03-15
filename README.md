# INCODE - Project 5

## Team Members

- Elly
- Jane
- Jake
- Jo

## Changelog:

#### Contains various logs of every commit:

- 05/03/21 - Initial commit
  - Added README.md
  - Initialised npm (package.json)
  - Added a basic app.js
- 06/03/21 - Set up basic route and layouts
  - Added 'routes' folder
    - Added index.js
  - Added 'pages' folder
    - Added 'layouts' folder
      - Added basiclayout.ejs
    - Added index.ejs
  - Added 'public' folder
    - Added main.css
  - Modified app.js to accomodate the above additions to the repository (see comments)
- 07/03/21 - Added db_schema.md
- 07/03/21 - added and styled scss. Woked a bit with form fomatting and styling. Added footer, header, full-width styles. Added signup route - ejs, js.
- 08/03/21 - Added a sample search function using API callback
  - Added AJAX-README.md
  - Added index.html
  - Added scripts.js
- 09/03/21 - Added sign in validation
  - Added sign in validation
    - Changed packet pgp(pg-promise) to pg
    - installed express-session & express-flash
    - init sessions for user sess detailes
    - installed passport & passport-local for validation and sessions ( for storing our logged in users session details)
    - installed passportConfig.js
  - Working pagination function.
  - Discovered issue with package "bcrypt" can we please change to "bcryptjs" across all .js files there appears to be some issues for windows users. I have not done so in case it affects functionality on anyone's end
  - Seeding initial SQL tables will be difficult as we cannot store hashed password, salt means same string gets hashed differently every time.
- 10/03/21
  - fully completed signup / signin / logout / session
  - fully authenticated passport function
  - Added Logout.js, Login.js, Signup.js, Dashboard.js
  - Added Dashboard.ejs, Login.ejs, Signup.ejs
  - Added passportConfig.js in main route to build passport authentication
  - Added a simple movie display function
    - added /routes/movie.js
    - added /pages/movie.ejs
    - updated scripts/scripts.js
  - Update db_schema.md
  - Passed id parameter across routes and ejs views to display movie details pages; this way can be implemented across all routes.
- 11/03/21
  - Added an autocomplete search function
    - Added an autocomplete search bar on `views/pages/index.ejs` on lines 10-15 
    - Added appropriate script in `scripts/scripts.js` on lines 8-48
  - Modified `views/layouts/full-width.ejs` 
    - Changed line 1 from `<%-body%>` to `%-body%` as it was interfering with the overall layout.
    - Added an external css on line 10 ``//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css` used for the autocomplete search function.
    - Added script `/scripts/jqueryui/jquery-ui.js` on line 19 to be used for the autocomplete search function.
      - Also comes with the downloaded library files found on `/scripts/jqueryui`
- 15/03/21
  - Modified Jane's function that was already inserting user ratings to not accept doubles
  - Added average rating for each movie
