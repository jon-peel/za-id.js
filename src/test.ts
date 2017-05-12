import { expect } from 'chai';
import { validate } from './index';

describe('za-id', () => {
	describe('validate', () => {
		it('valid number should be valid', () => expect(validate('8401295047080')).to.be.true);
		it('empty string should be invalid', () => expect(validate('')).to.be.false);
		it('does not contain any letters', () => expect(validate('802305047080a')).to.be.false);
		it('invalid birthday should be invalid', () => expect(validate('8402305047080')).to.be.false);
	});
});