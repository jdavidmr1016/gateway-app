# Gateway-API-REST 1.0.0

## Requirements :

- NodeJS : v20.2 or superior
- MongoDB : v5.5 or superior

## User instructions:

- First open the folder in any Command Line and run the comand **npm install** to fullfill all the packages dependencys.

- Then modify, with your own MongoDB Database conection string LOCAL or from ATLAS , in the _.env_ file the DataBase line for MongoDB named **MONGO_DB_CNN** not modify the name only the string before _=_ this will set the conection string with your own Dabatase.

- The app will run in the _PORT:2023_ you can change it in the _.env_ so you can access from any web browser in the address [http://localhost:2023], or [http://localhost:PORT] if you already changed it

- If you Completed the firsts steps then run the server in production mode with the comand **npm run start** .

- The app is fully testeable from the UI that is running in address [http://localhost:2023].

# Final anotations

- Please before run the automated tests populate the DB with some gateways and devices

- Enjoy

# Those are the enpoints for PostMan (METHOD) Any data is for exmaple

- http://localhost:2023/api/gateways/ (GET) _Get all Gateways_
- http://localhost:2023/api/gateways/8dc2845c-66a1-4e34-b0fb-1ed22c233052 (GET) _Get this Gateway_
- http://localhost:2023/api/gateways/8dc2845c-66a1-4e34-b0fb-1ed22c233052 (DELETE) _Delete this Gateway_
- http://localhost:2023/api/gateways (POST) _Create a Gateway_
- http://localhost:2023/api/gateway/8dc2845c-66a1-4e34-b0fb-1ed22c233052 (POST) _Create a Device_
- http://localhost:2023/api/gateway/8dc2845c-66a1-4e34-b0fb-1ed22c233052 (DELETE) _Delete a Device_
