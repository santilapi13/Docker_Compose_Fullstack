# Fullstack application with Docker Compose 🐳
This is a fullstack application with a React frontend, an Express and Node.js backend and a CouchDB database. 
## Frontend ⚛️
The frontend is a simple web page that displays a list of characters from films and an input field used to send new characters to the database. It's located in the "frontend_container" directory. The Alpine Linux image is used to build the frontend container from the Dockerfile.

The container port 8080 is mapped to the host port 3001: http://localhost:3001
## Backend 🟢
The backend is a REST API that serves the list of characters to the frontend after fetching them from the database. It also receives new characters from the frontend and sends them to the database. The backend is constantly loading random characters to the database. It's located in the "backend_container" directory. The Node image is used to build the backend container from the Dockerfile.

The container port 3000 is mapped to the host port 3000, in the /data endpoint: http://localhost:3000/data
## Database 🛋️
The database is a CouchDB instance that stores the characters and persists in the "dbdata" volume after the container is stopped. The container is loaded directly from the official CouchDB image. 

The container port 5984 is mapped to the host port 5984 http://localhost:5984/_utils

# Members
- Santiago Lapiana
- Wenceslao Ávalos

# Requirements
Docker and Docker Compose installed on your machine (https://docs.docker.com/engine/install/)

# How to run
1. Clone the repository with `git clone https://github.com/santilapi13/Docker_Compose_Fullstack.git`
2. Navigate to the project directory with `cd Docker_Compose_Fullstack`
3. Run `docker-compose up --build` to build and start the containers
4. Open your browser and go to http://localhost:3001 to see the frontend