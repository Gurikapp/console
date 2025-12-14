<script>
	import { onMount } from 'svelte';
	import '/src/routes/console.css';

	const lines = [
		{ type: 'system', content: '[SYSTEM] Инициализация журнала событий симуляции...' },
		{ type: 'divider', content: '================================================================================' },
		{ type: 'session', content: 'СЕССИЯ: #DND_SIM_ALPHA' },
		{ type: 'session', content: 'ВРЕМЯ НА СЕРВЕРЕ: [TIMESTAMP SYNCHRONIZED]' },
		{ type: 'divider', content: '================================================================================' },
		{ type: 'spacer', content: null },
		{
			type: 'boot',
			content:
				'[BOOT] Запуск симуляции. Профиль: Группа "<span class="highlight">Эд</span>", "<span class="highlight">Рин</span>", "<span class="highlight">Зереф</span>", "<span class="highlight">Сыр</span>".'
		},
		{ type: 'load', content: '[LOAD] Загружен сценарий: 0 прохождение' },
		{ type: 'separator', content: '--------------------------------------------------------------------' },
		{
			type: 'info',
			content:
				'<span class="tag">[03:00 – 06:00] INFO:</span> Игроки приняли квест «<span class="quest">Обучение</span>».'
		},
		{
			type: 'info',
			content:
				'<span class="tag">[03:00 – 06:00] INFO:</span> Игрок «<span class="highlight">Эд</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Изобретатель</span>». Получен предмет «<span class="item">4 пары когтей-кошки</span>».'
		},
		{
			type: 'info',
			content:
				'<span class="tag">[03:00 – 06:00] INFO:</span> Игрок «<span class="highlight">Рин</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Теорист</span>».'
		},
		{
			type: 'info',
			content:
				'<span class="tag">[03:00 – 06:00] INFO:</span> Игрок «<span class="highlight">Зереф</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Стрелок</span>». Получен предмет «<span class="item">Короткий лук</span>».'
		},
		{
			type: 'info',
			content:
				'<span class="tag">[03:00 – 06:00] INFO:</span> Игрок «<span class="highlight">Сыр</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Делец</span>». Получен предмет «<span class="item">Монах</span>».'
		},
		{
			type: 'quest-complete',
			content:
				'<span class="tag">[03:00 – 06:00] QUEST_COMPLETE:</span> Квест «<span class="quest">Обучение</span>» выполнен.'
		},
		{ type: 'spacer', content: null },
		{
			type: 'zone',
			content:
				'<span class="tag">[06:00 – 12:00] ZONE:</span> Игроки вошли в локацию «<span class="location">Секретная тропа</span>». Получен предмет «<span class="item">Я хочуууууу!</span>».'
		},
		{
			type: 'faction',
			content:
				'<span class="tag">[06:00 – 12:00] FACTION:</span> Игроки присоединились к стороне «<span class="highlight-cyan">Лагерь людей</span>». Репутация: «<span class="highlight-cyan">Лагерь людей</span>» <span class="positive">+2</span>. Репутация: «<span class="highlight-cyan">Маги</span>» <span class="negative">-2</span>.'
		},
		{
			type: 'dialogue-fail',
			content:
				'<span class="tag">[06:00 – 12:00] DIALOGUE_FAIL:</span> Игроки не смогли вступить в диалог с NPC «<span class="npc">Лайгус</span>». Причина: недостаточный уровень репутации у стороны «<span class="highlight-cyan">Лагерь людей</span>».'
		}
	];

	let visibleLines = 0;
	let isComplete = false;
	let timer;

	onMount(() => {
		step();
		return () => clearTimeout(timer);
	});

	function step() {
		if (isComplete) return;

		if (visibleLines < lines.length) {
			timer = setTimeout(() => {
				visibleLines += 1;
				step();
			}, 120);
		} else {
			isComplete = true;
		}
	}

	function skipAnimation() {
		visibleLines = lines.length;
		isComplete = true;
		clearTimeout(timer);
	}
</script>

<div class="console">
	{#if !isComplete}
		<button class="skip-button" on:click={skipAnimation}>
			[SKIP] ▶▶
		</button>
	{/if}

	<div class="console-content">
		{#each lines.slice(0, visibleLines) as line, index}
			{#if line.type === 'spacer'}
				<br />
			{:else}
				<p class="{line.type} typewriter">
					{@html line.content}
				</p>
			{/if}
		{/each}

		{#if isComplete}
			<p class="cursor-line"><span class="cursor">_</span></p>
		{/if}
	</div>
</div>