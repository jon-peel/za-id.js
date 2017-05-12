
export function validate(idNumber: string): boolean {
	if (idNumber.length != 13) return false;
	return true;
}