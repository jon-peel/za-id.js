import * as moment from 'moment';
import { filter, map, reduce } from 'lodash';

export type gender = 'Male' | 'Female';
export const male: gender = 'Male';
export const female: gender = 'Female';

const genderCheck = 6;
const southAfricanCheck = 10;
const penultimate = 11;

export interface idNumberDetails {
  dateOfBirth?: Date;
  southAfrican?: boolean;
  gender?: gender;
}

export function validateIdNumber(
  idNumber: string,
  details?: idNumberDetails
): boolean {
  if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) return false;
  const idArray = idNumber.split('').map(c => parseInt(c));
  if (
    idArray[southAfricanCheck] > 1 ||
    idArray[penultimate] < 8 ||
    !validateArray(idArray)
  )
    return false;
  const dateOfBirth = extractDateOfBirth(idNumber);
  if (!validateBirthday(dateOfBirth, idNumber)) return false;
  if (details != null) {
    details.dateOfBirth = dateOfBirth.toDate();
    details.gender = idArray[genderCheck] >= 5 ? male : female;
    details.southAfrican = idArray[southAfricanCheck] === 0;
  }
  return true;
}

function validateBirthday(dateOfBirth: moment.Moment, idNumber: string) {
  return dateOfBirth.format('YYMMDD') == idNumber.substr(0, 6);
}

function validateArray(idArray: number[]) {
  const oddPredicate = (n, i: number) => i % 2 === 0;
  const evenPredicate = (n, i: number) => i % 2 !== 0;
  const evenMap = (n: number) => ((n *= 2) > 9 ? n - 9 : n);
  const reduction = (a: number, b: number) => a + b;
  const odds = reduce(filter(idArray, oddPredicate), reduction, 0);
  const evens = reduce(
    map(filter(idArray, evenPredicate), evenMap),
    reduction,
    0
  );
  const nCheck = odds + evens;
  return nCheck % 10 === 0;
}

function extractDateOfBirth(idNumber: string): moment.Moment {
  const now = moment();
  const year = idNumber.substr(0, 2);
  const month = idNumber.substr(2, 2);
  const day = idNumber.substr(4, 2);
  let dateOfBirth = moment(`20${year}-${month}-${day} 00+0200`);
  if (dateOfBirth.isAfter(now))
    dateOfBirth = moment(`19${year}-${month}-${day} 00+0200`);
  return dateOfBirth;
}
