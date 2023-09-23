import { type Accessor, type Setter, batch, createEffect, createRenderEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import { generatePassword } from './generator.ts';
import './style.css';

const modelNumber = (getter: Accessor<number>, setter: Setter<number>) => {
	return (node: HTMLInputElement) => {
		createRenderEffect(() => {
			node.valueAsNumber = getter();
		});

		node.addEventListener('input', () => {
			setter(node.valueAsNumber);
		});
	};
};

const modelChecked = (getter: Accessor<boolean>, setter: Setter<boolean>) => {
	return (node: HTMLInputElement) => {
		createRenderEffect(() => {
			node.checked = getter();
		});

		node.addEventListener('input', () => {
			setter(node.checked);
		});
	};
};

const STORAGE_KEY = 'randompass';

const DEFAULTS = {
	length: 16,
	lowercase: 1,
	uppercase: 1,
	number: 1,
	special: 1,
	ambiguous: false,
};

const App = () => {
	const options: typeof DEFAULTS = {
		...DEFAULTS,
		...JSON.parse(localStorage.getItem(STORAGE_KEY)!),
	};

	const [length, setLength] = createSignal(options.length);
	const [lowercase, setLowercase] = createSignal(options.lowercase);
	const [uppercase, setUppercase] = createSignal(options.uppercase);
	const [number, setNumber] = createSignal(options.number);
	const [special, setSpecial] = createSignal(options.special);
	const [ambiguous, setAmbiguous] = createSignal(options.ambiguous);

	const [password, setPassword] = createSignal('');

	let input: HTMLInputElement | undefined;

	const generate = (ev?: SubmitEvent) => {
		if (ev) {
			ev.preventDefault();
		}

		setPassword(
			generatePassword({
				length: length(),
				lowercase: lowercase(),
				uppercase: uppercase(),
				number: number(),
				special: special(),
				ambiguous: ambiguous(),
			}),
		);
	};

	const copy = () => {
		input!.select();
		document.execCommand('copy');
	};

	const reset = () => {
		batch(() => {
			setLength(DEFAULTS.length);
			setLowercase(DEFAULTS.lowercase);
			setUppercase(DEFAULTS.uppercase);
			setSpecial(DEFAULTS.special);
			setAmbiguous(DEFAULTS.ambiguous);
		});
	};

	createEffect(() => {
		const persist: typeof DEFAULTS = {
			length: length(),
			lowercase: lowercase(),
			uppercase: uppercase(),
			number: number(),
			special: special(),
			ambiguous: ambiguous(),
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
	});

	generate();

	return (
		<form onSubmit={generate}>
			<h3>random password generator</h3>

			<div class="password">
				<input ref={input} readonly value={password()} />
				<button type="button" onClick={copy}>
					copy
				</button>
				<button type="submit">generate</button>
			</div>

			<hr />

			<label>
				<span>length</span>
				<input required type="number" min="1" ref={modelNumber(length, setLength)} />
			</label>

			<label>
				<span>lowercase</span>
				<input required type="number" min="-1" ref={modelNumber(lowercase, setLowercase)} />
			</label>

			<label>
				<span>uppercase</span>
				<input required type="number" min="-1" ref={modelNumber(uppercase, setUppercase)} />
			</label>

			<label>
				<span>number</span>
				<input required type="number" min="-1" ref={modelNumber(number, setNumber)} />
			</label>

			<label>
				<span>special</span>
				<input required type="number" min="-1" ref={modelNumber(special, setSpecial)} />
			</label>

			<label>
				<span>ambiguous</span>
				<input type="checkbox" ref={modelChecked(ambiguous, setAmbiguous)} />
			</label>

			<hr />

			<div class="footer">
				<a target="_blank" href="https://codeberg.org/intrnl/random-password-generator">
					source code
				</a>

				<button type="button" onClick={reset}>
					reset
				</button>
			</div>
		</form>
	);
};

render(() => <App />, document.body);
