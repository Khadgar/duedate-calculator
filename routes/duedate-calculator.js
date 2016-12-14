var moment = require('moment');

// This function handles the routing for express
var dueDateCalculator = function(app) {

    //POST request handling
    app.post('/calculate', function(req, res) {
        var result = calculate(req.body.submitTime, req.body.job);
        if (result) { // If everything is OK then the result will be generated
            res.status(200).json({
                duedate: result
            });
        } else { // Error code: 400 when the input is bad
            res.status(400).json({
                status: "Illegal input argument!"
            });
        }
    });
};

// This function calculates the due-date
// Parameters:
// submit: date object or string for moment js http://momentjs.com/docs/#/parsing/
// turnaround: integer, amount of hours
var calculate = function(submit, turnaround) {
    var startHour = 9;
    var endHour = 17;
    var submit_date = moment(submit);
    var turn_around = parseInt(turnaround);

    // Check the input parameters
    if (!checkInput(submit_date, turn_around)) {
        return null;
    }

    // Recursive function calculates the due-date
    function loop(turnaround, submit_date) {
        if (turnaround === 0) {
            return submit_date.format("LLLL");
        } else {
            submit_date.add(1, "hours");
            if (isWeekDay(submit_date) && isWorkingHour(submit_date)) {
                turnaround -= 1;
            }
            return loop(turnaround, submit_date);
        }
    }

    return loop(turnaround, submit_date);

    // Helper functions
    //
    // Check the inputs
    function checkInput(submit_date, turnaround) {
        if (!turnaround || turnaround < 0) {
            return false;
        }
        // http://momentjs.com/docs/#/query/is-a-moment/
        if (!moment.isMoment(submit_date) || !isWorkingHour(submit_date)) {
            return false;
        }

        return true;
    }

    // Check the day if a weekday http://momentjs.com/docs/#/get-set/day/
    function isWeekDay(date) {
        return !(date.day() === 6 || date.day() === 0);
    }

    // Check the hour is a working hour
    function isWorkingHour(date) {
        return (date.hours() >= startHour && date.hours() <= endHour);
    }

};

exports.dueDateCalculator = dueDateCalculator;