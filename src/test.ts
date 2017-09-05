import { expect, assert } from 'chai';
import { validateIdNumber as validate, idNumberDetails, gender, male, female } from './index';

const data: id[] = [
	{id: '8401295047080', dob: '1984-01-28T22:00:00.000Z', m: true, sa: true},
	{id: '5309280385089', dob: '1953-09-27T22:00:00.000Z', m: true, sa: true},
	{id: '6410170770080', dob: '1964-10-16T22:00:00.000Z', m: true, sa: true},
	{id: '8412065666082', dob: '1984-12-05T22:00:00.000Z', m: true, sa: true},
	{id: '7103060835084', dob: '1971-03-05T22:00:00.000Z', m: true, sa: true},
	{id: '8302180857080', dob: '1983-02-17T22:00:00.000Z', m: true, sa: true},
	{id: '5411270786084', dob: '1954-11-26T22:00:00.000Z', m: true, sa: true},
	{id: '6212252193086', dob: '1962-12-24T22:00:00.000Z', m: true, sa: true},
	{id: '8101270160086', dob: '1981-01-26T22:00:00.000Z', m: true, sa: true},
	{id: '7202156107083', dob: '1972-02-14T22:00:00.000Z', m: true, sa: true},
	{id: '1010270108085', dob: '2010-10-26T22:00:00.000Z', m: true, sa: true},
	{id: '4812295009181', dob: '1948-12-28T22:00:00.000Z', m: true, sa: false},
	{id: '7009110689084', dob: '1970-09-10T22:00:00.000Z', m: false, sa: true},
	{id: '5503035365087', dob: '1955-03-02T22:00:00.000Z', m: false, sa: true},
	{id: '7005025451081', dob: '1970-05-01T22:00:00.000Z', m: false, sa: true},
	{id: '6911240308082', dob: '1969-11-23T22:00:00.000Z', m: false, sa: true},
	{id: '5201045738084', dob: '1952-01-03T22:00:00.000Z', m: false, sa: true},
	{id: '6108215079083', dob: '1961-08-20T22:00:00.000Z', m: false, sa: true},
	{id: '4709020184083', dob: '1947-09-01T22:00:00.000Z', m: false, sa: true},	
	{id: '9805140397087', dob: '1998-05-13T22:00:00.000Z', m: false, sa: true},
	{id: '9408300571086', dob: '1994-08-29T22:00:00.000Z', m: false, sa: true},
	{id: '8205100657086', dob: '1982-05-09T22:00:00.000Z', m: false, sa: true},
	{id: '4006300395087', dob: '1940-06-29T22:00:00.000Z', m: false, sa: true},
	{id: '7207016182184', dob: '1972-06-30T22:00:00.000Z', m: false, sa: false}
];

describe('za-id', () => {
	describe('validate', () => {
		it('empty string should be invalid', () => expect(validate('')).to.be.false);
		it('does not contain any letters', () => expect(validate('802305047080a')).to.be.false);
		it('invalid birthday should be invalid', () => expect(validate('8402305047080')).to.be.false);
		it('valid number should be valid', () => expect(validate('8401295047080')).to.be.true);
		
		it('birthday is Jan 29', () => {
			const details = {} as idNumberDetails;
			var valid = validate('8401295047080', details);
			if (!details.dateOfBirth) return assert.fail(0,1,"No date of birth returned");
			expect(details.dateOfBirth.toISOString()).to.equal('1984-01-28T22:00:00.000Z');				
		});

		data.forEach(d => {
			const details = {} as idNumberDetails;
			var valid = validate(d.id, details);
			it(`${d.id} is valid`, () => expect(valid).to.be.true);
			it(`${d.id} ${d.sa ? 'is' : 'is not'} South African`, () => expect(details.southAfrican).to.be.equal(d.sa));
			if (!details.gender) return assert.fail(0,1,"No gender returned"); 
			it(`${d.id} is ${d.m ? 'male' : 'female'}`, () => expect((details.gender as gender) === male).to.be.equal(d.m));
			if (!details.dateOfBirth) return assert.fail(0,1,"No date of birth returned");
			it(`${d.id} has correct date of birth`, () => expect((details.dateOfBirth as Date).toISOString()).to.be.equal(d.dob));				
		});
	});
});

interface id {
	id: string;
	dob: string;
	sa: boolean;
	m: boolean;
}