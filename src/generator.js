const RAND_MAX = 0xFFFF_FFFF_FFFF;
const RAND_CACHE = new Uint8Array(6 * 1024);

let RAND_OFFSET  = RAND_CACHE.length;

/**
 * @param {PasswordGenerationOptions} options
 * @returns {string}
 */
export function generatePassword (options) {
	const positions = [];

	for (let i = 0, l = options.lowercase; i < l; i++) {
		positions.push('l');
	}

	for (let i = 0, l = options.uppercase; i < l; i++) {
		positions.push('u');
	}

	for (let i = 0, l = options.number; i < l; i++) {
		positions.push('n');
	}

	for (let i = 0, l = options.special; i < l; i++) {
		positions.push('s');
	}

	for (let i = positions.length; i < options.length; i++) {
		positions.push('r');
	}

	shuffle(positions);

	let charset = '';

	let lowercaseCharset = 'abcdefghijkmnopqrstuvwxyz';
	let uppercaseCharset = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
	let numberCharset = '23456789';
	let specialCharset = '!@#$%^&*()_+-=.';

	if (options.ambiguous) {
		lowercaseCharset += 'l';
		uppercaseCharset += 'IO';
		numberCharset += '10';
	}

	if (options.lowercase > -1) {
		charset += lowercaseCharset;
	}

	if (options.uppercase > -1) {
		charset += uppercaseCharset;
	}

	if (options.number > -1) {
		charset += numberCharset;
	}

	if (options.special > -1) {
		charset += specialCharset;
	}

	let password = '';

	for (let idx = 0; idx < positions.length; idx++) {
		let selectedCharset;

		switch (positions[idx]) {
			case 'l':
				selectedCharset = lowercaseCharset;
				break;
			case 'u':
				selectedCharset = uppercaseCharset;
				break;
			case 'n':
				selectedCharset = numberCharset;
				break;
			case 's':
				selectedCharset = specialCharset;
				break;
			case 'r':
				selectedCharset = charset;
				break;
		}

		password += selectedCharset[randrange(0, selectedCharset.length)];
	}

	return password;
}

/**
 * https://stackoverflow.com/a/12646864
 * @param {any[]} array
 */
function shuffle (array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = randrange(0, i);

		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randrange (min, max) {
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
}

/**
 * @param {Uint8Array} buffer
 * @param {number} offset
 * @returns {number}
 */
function readUInt48BE (buffer, offset = 0) {
	const first = buffer[offset];
	const last = buffer[offset + 5];

	return (
		(first * 2 ** 8 + buffer[++offset]) * 2 ** 32 + buffer[++offset] * 2 ** 24 +
		buffer[++offset] * 2 ** 16 + buffer[++offset] * 2 ** 8 + last
	);
}

/**
 * @typedef {object} PasswordGenerationOptions
 * @property {number} length Password length
 * @property {number} lowercase Include lowercase characters
 * @property {number} uppercase Include uppercase characters
 * @property {number} number Include number characters
 * @property {number} special Include special characters
 * @property {boolean} ambiguous Include potentially ambiguous characters
 */
