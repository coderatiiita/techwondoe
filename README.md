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
