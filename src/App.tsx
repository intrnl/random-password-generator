import { type Accessor, type Setter, createRenderEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';

import { generatePassword } from './generator';
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

const App = () => {
	const [length, setLength] = createSignal(16);
	const [lowercase, setLowercase] = createSignal(1);
	const [uppercase, setUppercase] = createSignal(1);
	const [number, setNumber] = createSignal(1);
	const [special, setSpecial] = createSignal(1);
	const [ambiguous, setAmbiguous] = createSignal(false);

	const [password, setPassword] = createSignal('');

	let input: HTMLInputElement | undefined;

	const generate = (ev?: SubmitEvent) => {
		if (ev) {
			ev.preventDefault();
		}

		setPassword(generatePassword({
			length: length(),
			lowercase: lowercase(),
			uppercase: uppercase(),
			number: number(),
			special: special(),
			ambiguous: ambiguous(),
		}));
	};

	const copy = () => {
		input!.select();
		document.execCommand('copy');
	};

	generate();

	return (
		<form onSubmit={generate}>
			<h3>random password generator</h3>

			<div class='password'>
				<input ref={input} readonly value={password()} />
				<button type='button' onClick={copy}>
					copy
				</button>
				<button type='submit'>
					generate
				</button>
			</div>

			<hr />

			<label>
				<span>length</span>
				<input required type='number' min='1' ref={modelNumber(length, setLength)} />
			</label>

			<label>
				<span>lowercase</span>
				<input required type='number' min='-1' ref={modelNumber(lowercase, setLowercase)} />
			</label>

			<label>
				<span>uppercase</span>
				<input required type='number' min='-1' ref={modelNumber(uppercase, setUppercase)} />
			</label>

			<label>
				<span>number</span>
				<input required type='number' min='-1' ref={modelNumber(number, setNumber)} />
			</label>

			<label>
				<span>special</span>
				<input required type='number' min='-1' ref={modelNumber(special, setSpecial)} />
			</label>

			<label>
				<span>ambiguous</span>
				<input type='checkbox' ref={modelChecked(ambiguous, setAmbiguous)} />
			</label>

			<hr />

			<p>
				<a target='_blank' href='https://codeberg.org/intrnl/random-password-generator'>
					source code
				</a>
			</p>
		</form>
	);
};

render(() => <App />, document.body);
