import * as moment from 'moment';

const genderCheck = 5;
const southAfrcianCheck = 10;
const penultimate = 11;

export interface idNumberDetails {
	dateOfBirth?: Date;
	southAfrican?: boolean;
	gender?: boolean;
}

export function validateIdNumber(idNumber: string, details? :idNumberDetails): boolean {
	if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) return false;
	const idArray = idNumber.split('').map(c => parseInt(c));
	if (idArray[southAfrcianCheck] > 1 || idArray[penultimate] < 8 || !validateArray(idArray)) return false;
	const dateOfBirth = extarctDateOfBirth(idNumber);
	if (!validateBirthdate(dateOfBirth, idNumber)) return false;
	if (details != null) {
		details.dateOfBirth = dateOfBirth.toDate();
		details.gender = idArray[genderCheck] >= 5;
		details.southAfrican = idArray[southAfrcianCheck] === 0;
	}	
	return true;
}

function validateBirthdate(dateOfBirth: moment.Moment, idNumber: string) {
	return dateOfBirth.format("YYMMDD") == idNumber.substr(0,6);
}

function validateArray(idArray: number[]) {
	const odds = idArray.filter((n, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
    const evens = idArray.filter((n, i) => i % 2 !== 0).map(n => ((n *= 2) > 9) ? n - 9 : n).reduce((a, b) => a + b, 0);
    const ncheck = odds + evens;
    return (ncheck % 10) === 0;
}

function extarctDateOfBirth(idNumber: string): moment.Moment {
 	const now = moment();
	const year = idNumber.substr(0, 2);
	const month = idNumber.substr(2, 2);
	const day = idNumber.substr(4, 2);
	debugger;
	let dateOfBirth = moment(`20${year}-${month}-${day} 00+0200`);
	if (dateOfBirth.isAfter(now)) dateOfBirth = moment(`19${year}-${month}-${day} 00+0200`);
	return dateOfBirth;
}