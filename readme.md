# za-id.js

A very small javascript package to help validate South African ID numbers.

## Installation

    npm install za-id

## Usage

	var valid = validateIdNumber('000000000000'); //boolean value

or

    var details = {};
	validateIdNumber('000000000000', details);
	console.log(details.dateOfBirth); // Date value
	console.log(details.SouthAfrican); // boolean value
	console.log(details.Gender); // 'Male' | 'Female'

## Prerequisites

This package makes use of [moment.js](https://momentjs.com), and [lodash](https://lodash.com).

## Typescript

a `d.ts` file is included in the package

## Licence

[ISC License](./licence.md).
Copyright (c) 2017, Jonathan Peel.