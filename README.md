# ParseTime #

## Summary ##

A short JavaScript function that parses a time string and returns a Date object. It handles a wide variety of time input formats.

## Details ##

Takes a string representing a time and returns a Date object with January 1, 1970 and the specified time. Returns null if given a null or empty time string. Returns a Date object representing an invalid date if the time string is invalid.

Example formats:
```
1:32 PM
1:32 p.m.
1:32p
1p
13:32
1332
```

See test/tests.html for the full list of supported time input formats.

## Usage ##

### Step 1 ###

Include the script.

```html
<head>
	<script src="parseTime.js"></script>
</head>
```

### Step 2 ###

Call the function, passing in the string to parse.

```javascript
parseTime('9:45 AM'); // -> Date object (Jan 01 1970 09:45)
parseTime(''); // -> null
parseTime('abc'); // -> Date object (Invalid Date)
```

You can use the utility functions to detect invalid dates.
```javascript
isValidDate(parseTime('9:45 AM')); // -> true
isInvalidDate(parseTime('abc')); // -> true
```

## License ##

Public Domain
