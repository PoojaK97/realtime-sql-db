
# Realtime SQL Database dashboard
The application renders a dashboard which corresponds to a table in the database. The dashboard gets the real-time updates from the database. The application offers following features-
1. Create new record
2. Update existing record
3. Get updates of record in real-time which are created or updated from elsewhere

## Tech stack used
### Frontend
* React.js
* Socket.io
### Backend
* Node.js
* Express.js
* Sequelize ORM
* Sqlite3
## Run application
### Backend
```bash
cd server
npm install
npm start
# This will start the server on port 8080
```

### Frontend
```bash
cd client
npm install
npm start
# This will frontend on port 3000
```

### Decisions
#### Sqlite
It removes the dependency on other systems like MySQL or Postgres. It gets easier for the assignment.
### Socket.io
Socket io is used to communicate the real-time updates between the frontend and the backend.
### Sequilize
Sequelize ORM abstracts out many operations on SQL using fluent APIs. It also makes it easier to listen to database events.
