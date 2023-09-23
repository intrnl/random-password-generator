const RAND_MAX = 0xffff_ffff_ffff;
const RAND_CACHE = new Uint8Array(6 * 1024);

let RAND_OFFSET = RAND_CACHE.length;

export interface PasswordGeneratorOptions {
	length: number;
	lowercase?: number;
	uppercase?: number;
	number?: number;
	special?: number;
	ambiguous?: boolean;
}

const enum Position {
	LOWERCASE,
	UPPERCASE,
	NUMBER,
	SPECIAL,
	RANDOM,
}

export const generatePassword = (options: PasswordGeneratorOptions) => {
	const { length, lowercase = -1, uppercase = -1, number = -1, special = -1, ambiguous = false } = options;

	const positions: Position[] = [];

	for (let i = 0, l = lowercase; i < l; i++) {
		positions.push(Position.LOWERCASE);
	}

	for (let i = 0, l = uppercase; i < l; i++) {
		positions.push(Position.UPPERCASE);
	}

	for (let i = 0, l = number; i < l; i++) {
		positions.push(Position.NUMBER);
	}

	for (let i = 0, l = special; i < l; i++) {
		positions.push(Position.SPECIAL);
	}

	for (let i = positions.length; i < length; i++) {
		positions.push(Position.RANDOM);
	}

	shuffle(positions);

	let charset = '';

	let lowercaseCharset = 'abcdefghijkmnopqrstuvwxyz';
	let uppercaseCharset = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
	let numberCharset = '23456789';
	let specialCharset = '!@#$%^&*()_+-=.';

	if (ambiguous) {
		lowercaseCharset += 'l';
		uppercaseCharset += 'IO';
		numberCharset += '10';
	}

	if (lowercase > -1) {
		charset += lowercaseCharset;
	}

	if (uppercase > -1) {
		charset += uppercaseCharset;
	}

	if (number > -1) {
		charset += numberCharset;
	}

	if (special > -1) {
		charset += specialCharset;
	}

	let password = '';

	for (let idx = 0; idx < positions.length; idx++) {
		let selectedCharset: string;

		switch (positions[idx]) {
			case Position.LOWERCASE:
				selectedCharset = lowercaseCharset;
				break;
			case Position.UPPERCASE:
				selectedCharset = uppercaseCharset;
				break;
			case Position.NUMBER:
				selectedCharset = numberCharset;
				break;
			case Position.SPECIAL:
				selectedCharset = specialCharset;
				break;
			case Position.RANDOM:
				selectedCharset = charset;
				break;
		}

		password += selectedCharset[randrange(0, selectedCharset.length)];
	}

	return password;
};

const readUInt48BE = (buffer: Uint8Array, offset = 0) => {
	const first = buffer[offset];
	const last = buffer[offset + 5];

	return (
		(first * 2 ** 8 + buffer[++offset]) * 2 ** 32 +
		buffer[++offset] * 2 ** 24 +
		buffer[++offset] * 2 ** 16 +
		buffer[++offset] * 2 ** 8 +
		last
	);
};

const randrange = (min: number, max: number) => {
	const range = max - min;

	if (range <= 0) {
		return min;
	}

	const limit = RAND_MAX - (RAND_MAX % range);

	while (true) {
		if (RAND_OFFSET === RAND_CACHE.length) {
			crypto.getRandomValues(RAND_CACHE);
			RAND_OFFSET = 0;
		}

		const x = readUInt48BE(RAND_CACHE, RAND_OFFSET);
		RAND_OFFSET += 6;

		if (x < limit) {
			return (x % range) + min;
		}
	}
};

const shuffle = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = randrange(0, i);

		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
