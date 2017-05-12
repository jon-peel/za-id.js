import * as dateFormat from 'dateformat';

export function validate(idNumber: string): boolean {
	if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) return false;
	const birth = extarctBirthDate(idNumber);
	if (!validateBirthdate(birth, idNumber)) return false;
	return true;
}

function validateBirthdate(birth: Date, idNumber: string) {
	return dateFormat(birth, "yymmdd") == idNumber.substr(0,6);
}

function extarctBirthDate(idNumber: string): Date {
 	const now = new Date();
	const year = parseInt(idNumber.substr(0, 2));
	const month = parseInt(idNumber.substr(2, 2));
	const day = parseInt(idNumber.substr(4, 2));	
	let birthdate = new Date(2000 + year, month, day);
	if (birthdate > now) birthdate = new Date(1900 + year, month - 1, day);
	return birthdate;
}