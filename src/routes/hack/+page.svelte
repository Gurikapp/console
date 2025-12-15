<svelte:head>
	<title>HACKER PANEL</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';

	let consoleOutput;
	let consoleInput;
	let consoleContent;

	onMount(() => {
		const jsConsole = {
			cmdPrompt: '$>',
			inputBuffer: '',
			cmdHistory: [],
			cmdIndex: -1,

			init: function() {
				this.inputLog('');
				this.log('Simulation OS [Version beta 0.3]');
				this.log('For help on available commands type "help"');
				window.addEventListener('keydown', e => this.handleKey(e));
			},

			log: (text) => {
				const line = document.createElement('div');
				line.textContent = text;
				consoleOutput.appendChild(line);
				consoleContent.scrollTop = consoleContent.scrollHeight;
			},

			inputLog: function(str) {
				this.inputBuffer = str;
				consoleInput.textContent = this.cmdPrompt + str;
			},

			inputClear: function() {
				this.inputBuffer = '';
				consoleInput.textContent = this.cmdPrompt;
			},

			handleKey: function(e) {
				if (e.key === 'Backspace') {
					e.preventDefault();
					this.inputBuffer = this.inputBuffer.slice(0, -1);
					this.inputLog(this.inputBuffer);
				} else if (e.key === 'Enter') {
					const cmdString = this.inputBuffer;
					this.inputClear();
					this.log(this.cmdPrompt + cmdString);
					this.cmdIndex = -1;

					if (cmdString.trim() === '') return;

					const parts = cmdString.trim().split(' ');
					const cmd = parts[0];
					const args = parts.slice(1);

					if (cmd === 'help') {
						this.log('I do not think so. Think by yourself.');
					} else if (cmd === 'clear') {
						consoleOutput.innerHTML = '';
					} else if (cmd === 'cheese') {
						this.log('Игрок Сыр и так зачизил всю игру, не будет тебе сыра!');
					} else if (cmd === 'ballestine') {
						this.log('Will kill you anyway');
					} else {
						this.log('Unknown command: ' + cmd);
					}
				} else if (e.key.length === 1) {
					this.inputBuffer += e.key;
					this.inputLog(this.inputBuffer);
				}
			}
		};

		jsConsole.init();
	});
</script>

<div id="console_window">
	<div id="console_systembar">Simulation OS [Version beta 0.3]</div>
	<div id="console_content" bind:this={consoleContent}>
		<div id="console_output" bind:this={consoleOutput}></div>
		<div id="console_input" bind:this={consoleInput}></div>
		<div id="console_cursor">_</div>
	</div>
</div>

<style>
    #console_input, #console_cursor {
  display: inline-block;
  vertical-align: bottom; 
}

	#console_window {
		font-family: Consolas, monospace;
		font-size: 14px;
		color: #0f0;
        height: 100vh;
		background: #000;
		user-select: none;
	}

	#console_systembar {
		height: 23px;
		background: linear-gradient(to right, #01b829, #37f850);
		color: #000;
		font-weight: bold;
		padding-left: 5px;
	}

	#console_content {
		height: calc(100% - 23px);
		overflow-y: auto;
		padding: 6px;
	}

	#console_output {
		white-space: pre-wrap;
		word-break: break-word;
	}

	#console_input {
		display: inline;
	}

	#console_cursor {
		animation: blink 1.2s infinite;
	}

	@keyframes blink {
		0%, 49% { opacity: 0; }
		50%, 100% { opacity: 1; }
	}
</style>
