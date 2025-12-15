<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';


	let termEl;
	let loadEl;
    let finished = false;
    let redirected = false;


	const speed = 50;
	const text = 'инициализация консоли симуляции';
    const LOG_SPEED = 500; // чем больше — тем медленнее

	let i = 0;
	let count = 0;
	let time = 1;

	const output = [
		"[SYS] Game Simulation Core v3.7.12 loading...",
"[SYS] Reality checksum verified",
"[SYS] Initializing Mythical Physics Engine",
"[SYS] Binding narrative threads...",
"[SYS] Dice entropy source: TRUE_RANDOM",
"[SYS] Fate matrix seeded",

"[SERVER] SERVER_ONE and SERVER_TWO are loaded.",

"[WORLD] Loading campaign module: Count to ten",
"[WORLD] Applying world modifiers",
"[WORLD] Timeflow set to: CONSTANT",
"[WORLD] Morality system: DISABLED",
"[WORLD] Consequences: TEMPORARY",

"[MAP] Generating overworld topology",
"[MAP] Terrain layers loaded",
"[MAP] Secret paths allocated",
"[MAP] Fog of War enabled",

"[NPC] Spawning non-player characters",
"[NPC] AI behavior trees compiled",
"[NPC] Dialogue matrices linked",

"[RULES] Initializing RISUS ruleset",
"[RULES] Rules of the world have been loaded.",
"[RULES] The system's points math has been calculated",
"[RULES] Death saving throws armed",

"[MAGIC] Weave synchronization in progress",
"[MAGIC] Spell slots are disabled",
"[MAGIC] Magic schools are disabled",
"[MAGIC] Ballestina's magic is absolute",

"[PARTY] Initializing player party",
"[PARTY] Party size detected: 4",

"[PLAYER] Registering entity: Эд",
"[PLAYER:Эд] Character sheet loaded",
"[PLAYER:Эд] Inventory scanned",
"[PLAYER:Эд] List of cliches calibrated",
"[PLAYER:Эд] Chaos factor elevated",

"[PLAYER] Registering entity: Рин",
"[PLAYER:Рин] Character sheet loaded",
"[PLAYER:Рин] Inventory scanned",
"[PLAYER:Рин] List of cliches calibrated",
"[PLAYER:Рин] The voice of reason has been found",

"[PLAYER] Registering entity: Зереф",
"[PLAYER:Зереф] Character sheet loaded",
"[PLAYER:Зереф] Inventory scanned",
"[PLAYER:Зереф] List of cliches calibrated",
"[PLAYER:Зереф] Uncertainty is heightened",

"[PLAYER] Registering entity: Сыр",
"[PLAYER:Сыр] Character sheet loaded",
"[PLAYER:Сыр] Inventory scanned",
"[PLAYER:Сыр] Improvised cliche detected",
"[PLAYER:Сыр] Chaos factor elevated",

"[PARTY] Party bonds established",
"[PARTY] Shared fate flag: TRUE",

"[QUEST] Initial quest hooks generated",
"[QUEST] Unresolved plot threads detected",
"[QUEST] System intervention allowed",

"[AUDIO] War camp ambience loaded",
"[AUDIO] Distant sounds of void cached",

"[SYS] Saving state snapshot",
"[SYS] Simulation integrity: YET STABLE",
"[SYS] All systems nominal",

"---",
"Game's simulation ready.",
		""
	];

	function append(html) {
		termEl.innerHTML += html;
		window.scrollTo(0, document.body.scrollHeight);
	}

	function runner() {
		append(text.charAt(i));
		i++;

		setTimeout(() => {
			if (i < text.length) {
				runner();
			} else {
				append('<br>');
				i = 0;
				setTimeout(feedbacker, 1000);
			}
		}, Math.floor(Math.random() * 220) + 50);
	}

	function feedbacker() {
		append(`[    ${count / 1000}] ${output[i]}<br>`);

		if (time % 2 === 0) {
			i++;
			append(`[    ${count / 1000}] ${output[i]}<br>`);
		}

		if (time === 3) {
			for (let j = 0; j < 3; j++) {
				i++;
				append(`[    ${count / 1000}] ${output[i]}<br>`);
			}
		}

		i++;
		time = Math.floor(Math.random() * 4) + 1;
		count += time;

		setTimeout(() => {
			if (i < output.length - 2) {
				feedbacker();
			} else {
	if (redirected) return;
	redirected = true;

	append('<br>Initialising...<br>');
	finished = true;

	setTimeout(() => {
		goto('/console');
	}, 1500);
}


		}, time * LOG_SPEED);
	}

	onMount(() => {
		runner();
	});
</script>

<div class="load" bind:this={loadEl}>
	<pre class="term" bind:this={termEl}>console@simulation:~$ </pre>
</div>

<style>
	html,
	body {
		margin: 0 auto;
		height: 100%;
	}

	pre {
		padding: 0;
		margin: 0;
	}

	.load {
		margin: 0 auto;
		min-height: 100%;
		width: 100%;
		background: #1a1a1a;
		transition: opacity 1s;
	}

	.term {
		font-family: monospace;
		color: #fff;
		opacity: 0.8;
		font-size: 2em;
		overflow-y: auto;
		overflow-x: hidden;
		padding-top: 10px;
		padding-left: 20px;
	}

	.term::after {
		content: "_";
		opacity: 1;
		animation: cursor 1s infinite;
	}

	@keyframes cursor {
		0% { opacity: 0; }
		40% { opacity: 0; }
		50% { opacity: 1; }
		90% { opacity: 1; }
		100% { opacity: 0; }
	}
</style>
