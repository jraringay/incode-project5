# INCODE - Project 5

## Team Members

- Elly
- Jane
- Jake

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
  Changed packet pgp(pg-promise) to pg
  installed express-session & express-flash
  init sessions for user sess detailes
  installed passport & passport-local for validation and sessions ( for storing our logged in users session details)
  installed passportConfig.js
- Working pagination function.
- Discovered issue with package "bcrypt" can we please change to "bcryptjs" across all .js files there appears to be some issues for windows users. I have not done so in case it affects functionality on anyone's end
- Seeding initial SQL tables will be difficult as we cannot store hashed password, salt means same string gets hashed differently every time.
  -10/03/21
  fully completed signup / signin / logout / session
  fully authenticated passport function
