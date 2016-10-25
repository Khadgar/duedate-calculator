# emarsys due-date

1. npm install

2. node app.js

3. send post request to: http://localhost:3000/calculate with a payload like: {"job":5,"submitTime":"2016-10-25 09:30"}
job: amount of hours
submitTime: date of submit
(I am using Advanced REST Client chrome plugin)


4. The webserver will send the response back.
If the input values are correct (status 200 if ok, status 400 if the input parameters are bad)

Example:

Bad parameters:
{"status": "Illegal input argument!"}

Good parameters:
{"duedate": "Tuesday, October 25, 2016 2:30 PM"}

Tested with

node --version
v0.10.26

npm --version
1.4.3