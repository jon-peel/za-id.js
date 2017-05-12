import { expect } from 'chai';
import { validate } from '../src/za-id';

describe('za-id', () => {
	describe('validate', () => {
		it('valid number should be valid', () => expect(validate('8401295047080')).to.be.true);
		it('empty string should be invalid', () => expect(validate('')).to.be.false);
	});
});