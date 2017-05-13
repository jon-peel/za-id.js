# za-id.js

A very small javascript package to help validate South African ID numbers.

## Installation

    npm install za-id.js

## Usage

	var valid = validateIdNumber('000000000000'); //boolean value

or

    var details = {};
	validateIdNumber('000000000000', details);
	console.log(details.dateOfBorth); //Date value
	console.log(details.SouthAfrican); //boolean value
	console.log(details.Gender); //boolean value, male is true

## Prerequisites

This pachage makes use of [moment.js](https://momentjs.com).