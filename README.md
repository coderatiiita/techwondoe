# techwondoe_assignment


Please find below the assignment. 
The assignment is to write a simple microservice API in the language of your choice and the database of your choice.

## Non Functional requirements:

Node JS + Typescript

Lint and prettier configurations

Readme file on how to run the service

Docker config


## Functional Requirements

Resources  

Company 

-- UUID (primary Key)

-- Company name

-- Company CEO

-- Company address

-- Inception date

Team 

-- UUID (primary Key)

-- CompanyID (Foreign Key)

-- Team Lead Name


## APIs to be exposed

Create Company

Create Team (Should have company ID in path)

GET Company by ID

Search company by the name

Get All Teams (Return all teams as an array grouped within company object)


APIs should validate a JWT token before allowing access to the caller.



## Postman Collection
https://www.getpostman.com/collections/54d4db90103f32ac6a35

# How to test the code

Database: MongoDB

Create a .env file and fill the below values -

PORT=               // application port number
DB_HOST=            // IP of server or its hostname on which DB is hosted
DB_USER=            // user name to login to DB
DB_PASS=            // password for user for that DB
DB_NAME=            // db name 
JWT_SECRET=         // secret for jwt token



----------------------------------------------------------------

## API Specs:-

### Login:-

```js
POST /api/login/
Sample Response Body:
[{
	// A Sample user is hardcoded into server, send empty body
}, {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InNodWJodmFzaCIsImVtYWlsIjoic2h1YmhAZ21haWwuY29tIn0sImlhdCI6MTYzOTI0NDY2MCwiZXhwIjoxNjM5MzMxMDYwfQ.Wax8IcvCV4p-kSsRi3nlzgvr6gumddd_y6UGUVsFmaQ"
}]
Status: 200
```

### Create Company:-

```js
POST /api/companies
Sample Request Body:
{
    "name" : "coca cola",
    "ceo" : "toh holland",
    "address" : "usa",
    "inceptionDate": "2003-05-22"
}

Sample Response Body:
{
    "uuid": "5e744d97-c507-4f68-8c94-fe655ce1b749",
    "inceptionDate": "2003-05-22T00:00:00.000Z",
    "createdAt": "2021-12-11T17:44:16.463Z",
    "updatedAt": "2021-12-11T17:44:16.463Z",
    "_id": "61b4e3dd686e68c35ab30670",
    "name": "coca cola",
    "ceo": "toh holland",
    "address": "usa",
    "__v": 0
}
Status: 201 (Company Created), 400 (any param missing), 500
```

### Create a team:-

```js
POST /api/teams/:companyId
Sample Response Body:
{
    "uuid": "66fb4fdf-3dc6-48f8-977a-7aa90664c987",
    "createdAt": "2021-12-11T17:57:36.639Z",
    "updatedAt": "2021-12-11T17:57:36.639Z",
    "_id": "61b4e6d1c50346c72db47b67",
    "teamLeadName": "gaurav chandak",
    "companyId": "5e744d97-c507-4f68-8c94-fe655ce1b749",
    "__v": 0
}]
}
Status: 201 (Team Created), 400 (any param missing), 500
```

### Get Company by ID:-

```js
GET /api/companies/:companyId

Sample Response Body:
{
    "uuid": "36430c09-b3dc-4d11-b22d-c891b919191f",
    "inceptionDate": "2001-01-16T00:00:00.000Z",
    "createdAt": "2021-12-11T15:26:51.148Z",
    "updatedAt": "2021-12-11T15:26:51.148Z",
    "_id": "61b4c34f12a68693920914b2",
    "name": "tesla",
    "ceo": "elon musk",
    "address": "usa",
    "__v": 0
}
Status: 200, 404 (company not found by given id), 500
```

### Search company by name:-

```js
GET /api/companies/search/:companyName

get all companies having 'companyName' in their name

Sample Response Body:
{
    "companies": [
        {
            "uuid": "36430c09-b3dc-4d11-b22d-c891b919191f",
            "inceptionDate": "2001-01-16T00:00:00.000Z",
            "createdAt": "2021-12-11T15:26:51.148Z",
            "updatedAt": "2021-12-11T15:26:51.148Z",
            "_id": "61b4c34f12a68693920914b2",
            "name": "tesla",
            "ceo": "elon musk",
            "address": "usa",
            "__v": 0
        },
        {
            "uuid": "f517fa5e-f3b8-4ca6-ad3c-ab3e21c95de9",
            "inceptionDate": "2001-01-16T00:00:00.000Z",
            "createdAt": "2021-12-11T15:49:56.141Z",
            "updatedAt": "2021-12-11T15:49:56.141Z",
            "_id": "61b4c8c4e05cc797cfeb5166",
            "name": "testa",
            "ceo": "jeff bezos",
            "address": "usa",
            "__v": 0
        }
    ]
}

Status: 200, 500
```

### Get all teams:-

```js
GET /api/teams/

Sample Response Body:
{
    "36430c09-b3dc-4d11-b22d-c891b919191f": {
        "uuid": "36430c09-b3dc-4d11-b22d-c891b919191f",
        "inceptionDate": "2001-01-16T00:00:00.000Z",
        "createdAt": "2021-12-11T15:26:51.148Z",
        "updatedAt": "2021-12-11T15:26:51.148Z",
        "_id": "61b4c34f12a68693920914b2",
        "name": "tesla",
        "ceo": "elon musk",
        "address": "usa",
        "__v": 0,
        "teams": [
            {
                "uuid": "66fb4fdf-3dc6-48f8-977a-7aa90664c987",
                "createdAt": "2021-12-11T17:57:36.639Z",
                "updatedAt": "2021-12-11T17:57:36.639Z",
                "_id": "61b4e695c50346c72db47b5d",
                "teamLeadName": "shubham vashishtha",
                "companyId": "36430c09-b3dc-4d11-b22d-c891b919191f",
                "__v": 0
            },
            {
                "uuid": "66fb4fdf-3dc6-48f8-977a-7aa90664c987",
                "createdAt": "2021-12-11T17:57:36.639Z",
                "updatedAt": "2021-12-11T17:57:36.639Z",
                "_id": "61b4e69ec50346c72db47b60",
                "teamLeadName": "udit agarwal",
                "companyId": "36430c09-b3dc-4d11-b22d-c891b919191f",
                "__v": 0
            }
        ]
    },
    "f517fa5e-f3b8-4ca6-ad3c-ab3e21c95de9": {
        "uuid": "f517fa5e-f3b8-4ca6-ad3c-ab3e21c95de9",
        "inceptionDate": "2001-01-16T00:00:00.000Z",
        "createdAt": "2021-12-11T15:49:56.141Z",
        "updatedAt": "2021-12-11T15:49:56.141Z",
        "_id": "61b4c8c4e05cc797cfeb5166",
        "name": "testa",
        "ceo": "jeff bezos",
        "address": "usa",
        "__v": 0,
        "teams": []
    },
    "5e744d97-c507-4f68-8c94-fe655ce1b749": {
        "uuid": "5e744d97-c507-4f68-8c94-fe655ce1b749",
        "inceptionDate": "2003-05-22T00:00:00.000Z",
        "createdAt": "2021-12-11T17:44:16.463Z",
        "updatedAt": "2021-12-11T17:44:16.463Z",
        "_id": "61b4e3dd686e68c35ab30670",
        "name": "coca cola",
        "ceo": "toh holland",
        "address": "usa",
        "__v": 0,
        "teams": [
            {
                "uuid": "66fb4fdf-3dc6-48f8-977a-7aa90664c987",
                "createdAt": "2021-12-11T17:57:36.639Z",
                "updatedAt": "2021-12-11T17:57:36.639Z",
                "_id": "61b4e6d1c50346c72db47b67",
                "teamLeadName": "gaurav chandak",
                "companyId": "5e744d97-c507-4f68-8c94-fe655ce1b749",
                "__v": 0
            }
        ]
    }
}

Status: 200, 500
```


