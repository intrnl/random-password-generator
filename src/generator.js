/**
 * @param {PasswordGenerationOptions} options
 * @returns
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
 * https://stackoverflow.com/a/41452318
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randrange (min, max) {
	const range = max - min;
	const bytes = Math.ceil(Math.log2(range) / 8);

	if (range <= 0 || !bytes) {
		return min;
	}

	const maxn = 256 ** bytes;
	const buf = new Uint8Array(bytes);

	while (true) {
		crypto.getRandomValues(buf);

		let val = 0;

		for (let idx = 0; idx < bytes; idx++) {
			val = (val << 8) + buf[idx];
		}

		if (val < maxn - maxn % range) {
			return min + (val % range);
		}
	}
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
