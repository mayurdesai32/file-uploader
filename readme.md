# project name

## Project Structure

### a) db
Contains the connection for the database using MySQL and Sequelize.

### b) error handler
- `AppError`: For creating new errors.
- `asyncError`: To handle asynchronous errors.
- `ExpressError`: To handle all Express-related errors.

### c) middleware
- `auth`: For authentication.
- `multer`: To handle file uploads.

### d) models
Contains schema definitions for storing data in the database.

### e) routes
Defines the API endpoints.

### f) controller
Contains the logic for handling requests and responses.

### g) utils
Contains utility functions such as `cookie`, `jwtToken`, `sendEmail`, etc.

## Libraries Used
- `bcryptjs`: ^2.4.3
- `cloudinary`: ^2.2.0
- `cookie-parser`: ^1.4.6
- `cors`: ^2.8.5
- `datauri`: ^4.1.0
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `jsonwebtoken`: ^9.0.2
- `multer`: ^1.4.5-lts.1
- `mysql2`: ^3.10.1
- `nodemailer`: ^6.9.13
- `sequelize`: ^6.37.3
- `validator`: ^13.12.0



Create a `config.env` file in the main project directory and configure the following details:

- CLOUDINARY_NAME=
- CLOUDINARY_API_KEY=
- CLOUDINARY_API_SECRET=

- PORT=

- JWT_SECRET=

- SMTP_HOST=
- SMTP_PORT=
- SMTP_EMAIL=
- SMTP_PASSWORD=
- SMTP_FROM_NAME=
- SMTP_FROM_EMAIL=

- DBHOST=
- DBUSER=
- DATABASE=
- PASSWORD=
- DBPORT=







## Installation
To install the required dependencies, run:
```bash
npm install
```

## Running the Server
### Development Server
To start the development server, run:
```bash
npm run dev
```

Production Server
To start the production server, run:
```bash
npm run start
```



#### User Routes:
1. **Register**: `POST baseurl/v2/api/user/register`
   - Body:
     ```json
     {
       "name": "", 
       "password": "", 
       "email": ""
     }
     ```
2. **Login**: `POST baseurl/v2/api/user/login`
   - Body:
     ```json
     {
       "password": "", 
       "email": ""
     }
     ```
3. **Update User**: `POST baseurl/v2/api/user/update`
4. **User Profile**: `GET baseurl/v2/api/user/profile`

#### Admin Routes:
1. **Get Users**: `POST baseurl/v2/api/user/getuser`
2. **Update User**: `POST baseurl/v2/api/user/update/:productid`
3. **Delete User**: `POST baseurl/v2/api/user/delete/:productId`

#### Post Routes:
1. **Create Post**: `POST baseurl/v2/api/post/create`
   - Body:
     ```json
     {
       "file": "your pdf",
       "filename": ""
     }
     ```
2. **Get all Post**: `POST baseurl/v2/api/post/getall`
    
3. **Update Post**: `PUT baseurl/v2/api/post/update/:postId`