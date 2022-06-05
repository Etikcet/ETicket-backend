Sql codes to initialize the database tables

```sql
CREATE TABLE Route (ID varchar(36),Bus_Number varchar(10),Start varchar(50),Finish varchar(50),Arrival_Time varchar(10),Departure_time varchar(10),price NUMERIC(10,2),PRIMARY KEY (ID));

CREATE TABLE Bus (ID varchar(36),Route_ID varchar(36),Seat int,Driver varchar(50),Conductor varchar(50),PRIMARY KEY (ID),FOREIGN KEY (Route_ID) REFERENCES Route(ID));

CREATE TABLE Schedule (ID varchar(36),Bus_ID varchar(36),Date date,Departure varchar(50),Arrival varchar(50),Departure_at timestamp,Arival_at timestamp,Status varchar(15),PRIMARY KEY (ID),FOREIGN KEY (Bus_ID) REFERENCES Bus(ID));

CREATE TABLE Users (ID varchar(36),Username varchar(30),Password varchar(255),Name varchar(50),User_Type varchar(15),Phone_Number varchar(10),PRIMARY KEY (ID));

CREATE TABLE Booking (ID varchar(36),User_ID varchar(36),Route_ID varchar(36),Price decimal(15,2),Status varchar(15),PRIMARY KEY (ID), FOREIGN KEY (Route_ID) REFERENCES Route(ID),FOREIGN KEY (User_ID) REFERENCES Users(ID));

```
