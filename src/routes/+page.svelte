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
		"[SYS] Arcane Simulation Core v3.7.12 loading...",
"[SYS] Reality checksum verified",
"[SYS] Initializing Mythical Physics Engine",
"[SYS] Binding narrative threads...",
"[SYS] Dice entropy source: TRUE_RANDOM",
"[SYS] Fate matrix seeded",

"[WORLD] Loading campaign module: Forgotten Realms",
"[WORLD] Applying world modifiers",
"[WORLD] Timeflow set to: VARIABLE",
"[WORLD] Morality system: ENABLED",
"[WORLD] Consequences: PERMANENT",

"[MAP] Generating overworld topology",
"[MAP] Terrain layers loaded",
"[MAP] Dungeon instances allocated",
"[MAP] Fog of War enabled",

"[NPC] Spawning non-player entities",
"[NPC] AI behavior trees compiled",
"[NPC] Dialogue matrices linked",

"[RULES] Initializing D&D ruleset",
"[RULES] Advantage / Disadvantage system online",
"[RULES] Critical hit tables loaded",
"[RULES] Death saving throws armed",

"[MAGIC] Weave synchronization in progress",
"[MAGIC] Spell slots indexed",
"[MAGIC] Wild magic probability: NON-ZERO",
"[MAGIC] Counterspell listeners active",

"[PARTY] Initializing player party",
"[PARTY] Party size detected: 4",

"[PLAYER] Registering entity: Эд",
"[PLAYER:Эд] Character sheet loaded",
"[PLAYER:Эд] Inventory scanned",
"[PLAYER:Эд] Spellbook indexed",
"[PLAYER:Эд] Hit points synchronized",

"[PLAYER] Registering entity: Рин",
"[PLAYER:Рин] Character sheet loaded",
"[PLAYER:Рин] Inventory scanned",
"[PLAYER:Рин] Spell slots calibrated",
"[PLAYER:Рин] Passive perception calculated",

"[PLAYER] Registering entity: Зереф",
"[PLAYER:Зереф] Character sheet loaded",
"[PLAYER:Зереф] Inventory scanned",
"[PLAYER:Зереф] Arcane focus attuned",
"[PLAYER:Зереф] Mana flow stabilized",

"[PLAYER] Registering entity: Сыр",
"[PLAYER:Сыр] Character sheet loaded",
"[PLAYER:Сыр] Inventory scanned",
"[PLAYER:Сыр] Improvised weapons detected",
"[PLAYER:Сыр] Chaos factor elevated",

"[PARTY] Party bonds established",
"[PARTY] Shared fate flag: TRUE",

"[QUEST] Initial quest hooks generated",
"[QUEST] Unresolved plot threads detected",
"[QUEST] DM intervention allowed",

"[AUDIO] Tavern ambience loaded",
"[AUDIO] Distant dragon sounds cached",

"[SYS] Saving state snapshot",
"[SYS] Simulation integrity: STABLE",
"[SYS] All systems nominal",

"---",
"Simulation ready.",
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
