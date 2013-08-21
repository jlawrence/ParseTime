/*
	ParseTime v1.1
	https://github.com/jlawrence/ParseTime
	
	parseTime is a small function that parses a time string. This file also includes utility functions; however, the parseTime function is not dependent upon them.
	
	Author: Joshua Lawrence
	License: Public Domain
*/

/*
	Takes a string representing a time and returns a Date object with January 1, 1970 and the specified time.
	Returns null if given a null or empty time string. Returns a Date object representing an invalid date if the time string is invalid.
*/
function parseTime(timeString) {
	if (timeString == null) {
		return null;
	}

	var invalidDate = new Date(NaN);
	
	// Preserve whitespace and periods used as separators.
	timeString = timeString.replace(/(\d)[\s\.]+(\d)/g, '$1:$2');
	
	// Remove other whitespace and periods that may appear in a.m. or p.m., and convert to lowercase.
	timeString = timeString.replace(/[\s\.]/g, '').toLowerCase();
	
	if (timeString == '') {
		return null;
	}

	var captures = /^(\d\d?)(\D?(\d\d))?((a|p)m?)?$/.exec(timeString);

	if (captures === null) {
		return invalidDate;
	}

	var hours = parseInt(captures[1], 10);
	var minutes = parseInt(captures[3], 10) || 0;
	var amPm = captures[5];

	if (hours == 12 && amPm == 'a') {
		hours = 0;
	} else if (hours < 12 && amPm == 'p') {
		hours += 12;
	}

	if (hours < 0 || hours > 23 || (hours > 12 && amPm == 'a') || minutes < 0 || minutes > 59) {
		return invalidDate;
	}

	return new Date(1970, 0, 1, hours, minutes);
}

/*
	Returns whether or not the specified object is a Date object.
*/
function isDate(input) {
	// Avoid cross-frame issues by using toString.
	return Object.prototype.toString.call(input) === '[object Date]';
}

/*
	Returns true if the specified object is a valid Date object, and false otherwise.
	Note: The result of the inverse of this function is not necessarily an invalid Date object. For example, !isValidDate('abc') would return true, since 'abc' is not a Date, but 'abc' is not an invalid Date object.
*/
function isValidDate(input) {
	return isDate(input) && isFinite(input);
}

/*
	Returns true if the specified object is an invalid Date object, and false otherwise.
	Note: The result of the inverse of this function is not necessarily a valid Date object. For example, !isInvalidDate('abc') would return true, since 'abc' is not a Date.
*/
function isInvalidDate(input) {
	return isDate(input) && isNaN(input);
}

/*
	 Extracts the time portion of a date and returns it as a string. Handles invalid dates and null values.
*/
function dateToTimeString(date) {
	if (date == null) {
		return '';
	}
	
	if (isInvalidDate(date))  {
		return 'Invalid Date';
	}
	
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var minuteString = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
	
	if (hours > 12) {
		return (hours - 12) + ':' + minuteString + ' PM';
	} else if (hours == 0) {
	 	return 12 + ':' + minuteString + ' AM';
	} else if (hours == 12) {
		return 12 + ':' + minuteString + ' PM';
	} else {
		return hours + ':' + minuteString + ' AM';
	}
}