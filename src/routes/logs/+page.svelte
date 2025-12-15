<svelte:head>
	<title>Game Simulation Logs</title>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import '/src/routes/console.css';

const lines = [
	{ type: 'system', content: '[SYSTEM] Инициализация журнала событий симуляции...' },
	{ type: 'divider', content: '================================================================================' },
	{ type: 'session', content: 'СЕССИЯ: #GAME_SIM_BETA' },
	{ type: 'divider', content: '================================================================================' },
	{ type: 'session', content: 'ДАТА НА СЕРВЕРЕ: 31.10.2025' },
	{
		type: 'boot',
		content: '[BOOT] Запуск сервера SIMULATION_ONE.'
	},
	{ type: 'load', content: '[LOAD] Загружен сценарий: 0 прохождение.' },
	{ type: 'separator', content: '--------------------------------------------------------------------' },
	{
		type: 'zone',
		content: '<span class="tag">[03:00 – 06:00] [ZONE]:</span> Игроки вошли в локацию «<span class="location">Подъем на скалу</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INFO]:</span> Игроки приняли квест «<span class="quest">Обучение</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INFO]:</span> Игрок «<span class="highlight">Эд</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Изобретатель</span>». Получен предмет «<span class="item">4 пары когтей-кошки</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INFO]:</span> Игрок «<span class="highlight">Рин</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Теорист</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INFO]:</span> Игрок «<span class="highlight">Зереф</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Стрелок</span>». Получен предмет «<span class="item">Короткий лук</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INFO]:</span> Игрок «<span class="highlight">Сыр</span>» прошёл испытание, используя клише «<span class="highlight-cyan">Делец</span>». Получен предмет «<span class="item">Монах</span>».'
	},
	{
		type: 'quest-complete',
		content: '<span class="tag">[03:00 – 06:00] [QUEST_COMPLETE]:</span> Квест «<span class="quest">Обучение</span>» выполнен. Начислены награды.'
	},
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Подъем на скалу</span>». Игроки вошли в локацию «<span class="location">Секретная тропа</span>». Получен предмет «<span class="item">Я хочуууууу!</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [FAST_TRAVEL]:</span> Игроки совершили быстрое перемещение из локации «<span class="location">Секретная тропа</span>» в локацию «<span class="location">Скала над каньоном</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Скала над каньоном</span>». Игроки вошли в локацию «<span class="location">Лагерь людей</span>».'
	},
	{
		type: 'faction',
		content: '<span class="tag">[06:00 – 12:00] [FACTION]:</span> Игроки присоединились к стороне «<span class="highlight-cyan">Лагерь людей</span>». Репутация: «<span class="highlight-cyan">Лагерь людей</span>» <span class="positive">+2</span>. Репутация: «<span class="highlight-cyan">Маги</span>» <span class="negative">-2</span>.'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[06:00 – 12:00] [DIALOGUE_FAIL]:</span> Игроки не смогли вступить в диалог с NPC «<span class="npc">Лайгус</span>». Причина: недостаточный уровень репутации у стороны «<span class="highlight-cyan">Лагерь людей</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [DIALOGUE]:</span> Игроки вступили в диалог с NPC «<span class="npc">Кассадор</span>». Благодаря особым условиям, Репутация: «<span class="highlight-cyan">Лагерь людей</span>» +1.'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [MINIGAME]:</span> Пройдена мини-игра "Ханойская башня". Уровень сложности: 1. Репутация: «<span class="highlight-cyan">Лагерь Магов</span>» -2. Благодаря особым условиям, репутация: «<span class="highlight-cyan">Лагерь людей</span>» +2.'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [QUEST_ISSUED]:</span> Игроки дали задание NPC «<span class="npc">Кузнец</span>». Время выполнения: 1 временной эпизод.'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [QUEST_ISSUED]:</span> Игроки создали квест «<span class="quest">Найти жилу с водой</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [INVENTORY]:</span> Получен предмет: «<span class="item">Бур?</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[12:00 – 18:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Лагерь людей</span>». Игроки перешли в локацию «<span class="location">Север каньона</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[12:00 – 18:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Север каньона</span>». Игроки перешли в локацию «<span class="location">Ущелье тайн</span>».'
	},
	{
		type: 'quest-complete',
		content: '<span class="tag">[12:00 – 18:00] [QUEST_COMPLETE]:</span> Квест «<span class="quest">Найти жилу с водой</span>» выполнен. Получен предмет «<span class="item">Координаты жилы с водой</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [QUEST_FAILED]:</span> Побочный квест «<span class="quest">Спор в лагере людей</span>» провален. Репутация: «<span class="highlight-cyan">Лагерь людей</span>» <span class="negative">-2</span>.'
	},
	{
		type: 'zone',
		content: '<span class="tag">[18:00 – 00:00] [FAST_TRAVEL]:</span> Игроки «<span class="highlight">Зереф</span>», «<span class="highlight">Сыр</span>» совершили быстрое перемещение из локации «<span class="location">Ущелье тайн</span>» в локацию «<span class="location">Лагерь людей</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[18:00 – 00:00] [DIALOGUE]:</span> Игрок «<span class="highlight">Зереф</span>» вступил в диалог с NPC_6.'
	},
	{
		type: 'info',
		content: '<span class="tag">[18:00 – 00:00] [DIALOGUE]:</span> Игрок «<span class="highlight">Сыр</span>» вступил в диалог с NPC «<span class="npc">Кассадор</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [WARNING]:</span> NPC «<span class="npc">Кассадор</span>» убит NPC «<span class="npc">Страж_повелителя_людей_7</span>» и NPC «<span class="npc">Страж_повелителя_людей_8</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [WARNING]:</span> Игрок «<span class="highlight">Эд</span>» умер от переохлаждения и был принудительно отключён от симуляции.'
	},
	{
		type: 'zone',
		content: '<span class="tag">[18:00 – 00:00] [ZONE]:</span> Игрок «<span class="highlight">Сыр</span>» покинул локацию «<span class="location">Лагерь людей</span>». Игрок вошёл в локацию: «<span class="location">Шатер повелителя людей</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [WARNING]:</span> Игрок «<span class="highlight">Сыр</span>» заколот насмерть NPC «<span class="npc">Лайгус</span>». Утрачен предмет «<span class="item">Монах</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [WARNING]:</span> Игрок «<span class="highlight">Рин</span>» умерла от удушения и была принудительно отключена от симуляции.'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[18:00 – 00:00] [WARNING]:</span> Игрок «<span class="highlight">Зереф</span>» умер от удушения из-за NPC_34, NPC_8, NPC_51 и NPC_19 и был принудительно отключён от симуляции.'
	},
	{ type: 'separator', content: '--------------------------------------------------------------------' },
	{
		type: 'system',
		content: '[SYSTEM] 0 прохождение принудительно завершено.'
	},
	{
		type: 'info',
		content: '<span class="tag">[INVENTORY]</span> Получены предметы: «<span class="item">Купон</span>», «<span class="item">Купон</span>», «<span class="item">Поросячий хвостик</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[INVENTORY]</span> Предмет «<span class="item">Обычный лутбокс</span>» утрачен. Получен предмет: «<span class="item">Живой саженец</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[INVENTORY]</span> Утрачены предметы: «<span class="item">4 пары когтей-кошки</span>», «<span class="item">Короткий лук</span>», «<span class="item">Купон</span>», «<span class="item">Бур?</span>».'
	},
	{
		type: 'system',
		content: '[SYSTEM] Игра длилась 4 временных эпизода.'
	},
	{
		type: 'info',
		content: '<span class="tag">[ACHIEVEMENT]</span> Игроки получили достижения: «<span class="highlight">Потраченного времени не жаль (а жаль)</span>», «<span class="highlight">Каре</span>».'
	},
	{
		type: 'system',
		content: '[SYSTEM] Примерное количество начисленных очков системы: 7 о.с.'
	},
	{ type: 'divider', content: '================================================================================' },
	{ type: 'load', content: '[LOAD] Загружен сценарий: 1 прохождение.' },
	{ type: 'system', content: '[SYSTEM] Игроками включён быстрый режим.' },
	{ type: 'system', content: '[SYSTEM] Награда за временные эпизоды недоступна.' },
	{
		type: 'info',
		content: '<span class="tag">[ACHIEVEMENT]</span> Игроки получили достижения: «<span class="highlight">Невозможное невозможно, но</span>».'
	},
	{ type: 'system', content: '[SYSTEM] Примерное количество начисленных очков системы: 1 о.с.' },
	{ type: 'divider', content: '================================================================================' },
	{ type: 'session', content: 'ДАТА НА СЕРВЕРЕ: 04.11.2025' },
	{ type: 'boot', content: '[BOOT] Запуск сервера SERVER_ONE.' },
	{ type: 'load', content: '[LOAD] Загружен сценарий: 2 прохождение.' },
	{ type: 'separator', content: '--------------------------------------------------------------------' },
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [ZONE]:</span> Игроки вошли в локацию «<span class="location">Подъем на скалу</span>».'
	},
	{
		type: 'faction',
		content: '<span class="tag">[06:00 – 12:00] [FACTION]:</span> Игроки присоединились к стороне «<span class="highlight-cyan">Лагерь людей</span>». Репутация: «<span class="highlight-cyan">Лагерь людей</span>» <span class="positive">+2</span>. Репутация: «<span class="highlight-cyan">Лагерь Магов</span>» <span class="negative">-2</span>.'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [DIALOGUE]:</span> Игроки «<span class="highlight">Зереф</span>», «<span class="highlight">Рин</span>» вступили в диалог с NPC «<span class="npc">Эпл</span>». Получен предмет: «<span class="item">2 порции еды</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [DIALOGUE]:</span> Игроки «<span class="highlight">Эд</span>», «<span class="highlight">Сыр</span>» вступили в диалог с NPC «<span class="npc">Кассадор</span>». Благодаря особым условиям, Репутация: «<span class="highlight-cyan">Лагерь людей</span>» +1.'
	},
	{
		type: 'info',
		content: '<span class="tag">[06:00 – 12:00] [MINIGAME]:</span> Пройдена мини-игра "Ханойская башня". Уровень сложности: 2. Репутация: «<span class="highlight-cyan">Лагерь Магов</span>» -2. Репутация: «<span class="highlight-cyan">Лагерь людей</span>» +1.'
	},
	{ type: 'session', content: 'ДАТА НА СЕРВЕРЕ: 13.11.2025' },
	{ type: 'boot', content: '[BOOT] Запуск сервера SERVER_ONE.' },
	{ type: 'load', content: '[LOAD] Загружен сценарий: 2 прохождение.' },
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Лагерь людей</span>». Игроки перешли в локацию «<span class="location">Юг каньона</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[06:00 – 12:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Юг каньона</span>». Игроки перешли в локацию «<span class="location">Лагерь людей</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [DIALOGUE]:</span> Игроки вступили в диалог с NPC «<span class="npc">Эпл</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [MINIGAME]:</span> Пройдена мини-игра "Досье" на стороне людей.'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [DIALOGUE]:</span> Игроки вступили в диалог с NPC «<span class="npc">Ирида</span>».'
	},
	{
		type: 'faction',
		content: '<span class="tag">[12:00 – 18:00] [FACTION]:</span> Игроки присоединились к фракции «<span class="highlight-cyan">Несогласие</span>» у стороны «<span class="highlight-cyan">Лагерь людей</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [INVENTORY]:</span> Получен предмет «<span class="item">Магический порох</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [QUEST]:</span> Игроки дали задание кузнецу. Время выполнения: 1/2 временного эпизода. Игрок «<span class="highlight">Эд</span>» участвует в выполнении задания. Получен предмет: «<span class="item">Ручница</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [MINIGAME]:</span> Игрок «<span class="highlight">Зереф</span>» участвует в мини-игре "Порох". Утрачен предмет: «<span class="item">Магический порох</span>». Израсходовано пороха: 100%. Создано колб: 5. Потрачено колб: 3.'
	},
	{
		type: 'quest-complete',
		content: '<span class="tag">[18:00 – 00:00] [QUEST_ISSUED]:</span> Игроки «<span class="highlight">Сыр</span>», «<span class="highlight">Рин</span>» принимают побочный квест «<span class="quest">Спор в лагере людей</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[12:00 – 18:00] [DIALOGUE]:</span> Игрок «<span class="highlight">Сыр</span>» вступил в диалог с NPC «<span class="npc">Рита</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[18:00 – 00:00] [INVENTORY]:</span> Игрок «<span class="highlight">Сыр</span>» получил предмет: «<span class="item">Досье на игрока «Сыр»</span>», «<span class="item">Досье Кассадора</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[18:00 – 00:00] [INVENTORY]:</span> Игрок «<span class="highlight">Рин</span>» получил предмет «<span class="item">Досье Лайгуса</span>».'
	},
	{
		type: 'quest-complete',
		content: '<span class="tag">[18:00 – 00:00] [QUEST_COMPLETE]:</span> Квест «<span class="quest">Спор в лагере людей</span>» выполнен. Репутация: «<span class="highlight-cyan">Лагерь людей</span>» повышен.'
	},
	{
		type: 'zone',
		content: '<span class="tag">[00:00 – 05:00] [FAST_TRAVEL]:</span> Игроки совершили быстрое перемещение в локацию «<span class="location">Ущелье тайн</span>».'
	},
	{
		type: 'zone',
		content: '<span class="tag">[00:00 – 05:00] [ZONE]:</span> Игроки покинули локацию «<span class="location">Ущелье тайн</span>». Игроки вошли в локацию «<span class="location">Пещеры тайн</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[00:00 – 05:00] [INVENTORY]:</span> Потрачено колб: 2.'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[00:00 – 05:00] [WARNING]:</span> Игрок «<span class="highlight">Рин</span>» умерла от взрыва и была принудительно отключена от симуляции.'
	},
	{
		type: 'info',
		content: '<span class="tag">[00:00 – 05:00] [DIALOGUE]:</span> Игроки «<span class="highlight">Эд</span>», «<span class="highlight">Зереф</span>», «<span class="highlight">Сыр</span>» вступили в диалог с NPC «<span class="npc">Пенелопа</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[00:00 – 05:00] [WARNING]:</span> Игрок «<span class="highlight">Сыр</span>» умер от рук игрока «<span class="highlight">Сыр</span>» и был принудительно отключён от симуляции.'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[00:00 – 05:00] [WARNING]:</span> Игрок «<span class="highlight">Эд</span>» умер от рук игрока «<span class="highlight">Эд</span>» и был принудительно отключён от симуляции.'
	},
	{
		type: 'zone',
		content: '<span class="tag">[00:00 – 05:00] [ZONE]:</span> Игрок «<span class="highlight">Зереф</span>» покинул локацию «<span class="location">Пещеры тайн</span>». Игрок вошёл в локацию «<span class="location">Ущелье тайн</span>».'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[05:00 – 06:00] [WARNING]:</span> NPC «<span class="npc">Лайгус</span>», NPC «<span class="npc">Кассадор</span>», NPC_3, NPC_1, NPC_22, NPC_14, NPC_15, NPC_6, NPC_7, NPC_8, NPC_19, NPC_30, NPC_28, NPC_12, NPC_23, NPC_17, NPC_15, NPC_34, NPC_8, NPC_51, NPC_19, NPC_9, NPC_4, NPC_35, NPC_2, NPC_5, NPC_16, NPC_11, NPC_44, NPC_38, NPC «Страж_повелителя_людей_7», NPC «Страж_повелителя_людей_8», NPC «Страж_повелителя_людей_6», NPC «Страж_повелителя_людей_5» были раздавлены entity.Spawn class{<span class="negative">Метеорит</span>}.'
	},
	{
		type: 'dialogue-fail',
		content: '<span class="tag">[05:00 – 06:00] [WARNING]:</span> Игрок «<span class="highlight">Зереф</span>» был отключён от симуляции. <span class="system">Причина: Server closed.</span>'
	},
	{ type: 'separator', content: '--------------------------------------------------------------------' },
	{
		type: 'system',
		content: '[SYSTEM] 2 прохождение было завершено.'
	},
	{
		type: 'info',
		content: '<span class="tag">[INVENTORY]</span> Получено предметов: «<span class="item">Сейв слот</span>», «<span class="item">Ручница</span>», «<span class="item">Желтая карточка Сыра</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[INVENTORY]</span> Утрачены предметы: «<span class="item">Досье на игрока «Сыр»</span>», «<span class="item">Досье «Лайгуса»</span>», «<span class="item">Досье Кассадора</span>».'
	},
	{
		type: 'system',
		content: '[SYSTEM] Игра длилась 5 временных эпизода.'
	},
	{
		type: 'info',
		content: '<span class="tag">[ACHIEVEMENT]</span> Открыто 1 правило мира.'
	},
	{
		type: 'info',
		content: '<span class="tag">[ACHIEVEMENT]</span> Игроки получили достижения: «<span class="highlight">Я начинаю понимать!</span>», «<span class="highlight">Без правил</span>», «<span class="highlight">Я подчиняю реальность под клише</span>».'
	},
	{
		type: 'system',
		content: '[SYSTEM] Примерное количество начисленных очков системы: 10 о.с.'
	},
	{ type: 'divider', content: '================================================================================' },
	{ type: 'session', content: 'ДАТА НА СЕРВЕРЕ: 04.12.2025' },
	{ type: 'boot', content: '[BOOT] Запуск сервера SERVER_ONE.' },
	{ type: 'load', content: '[LOAD] Загружен сценарий: 3 прохождение.' },
	{ type: 'separator', content: '--------------------------------------------------------------------' },
	{
		type: 'info',
		content: '<span class="tag">[04:00 – 06:00] [DIALOGUE]:</span> NPC_3 вступил в диалог с NPC «<span class="npc">Кассадор</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[04:00 – 06:00] [QUEST_ISSUED]:</span> NPC_3 дал кузнецу задание.'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [DIALOGUE]:</span> NPC «<span class="npc">Кассадор</span>» вступил в диалог с NPC «<span class="npc">Лайгус</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INVENTORY]:</span> NPC «<span class="npc">Кассадор</span>» получил предмет «<span class="item">Секретные досье</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INVENTORY]:</span> NPC «<span class="npc">Кассадор</span>» получил предмет: «<span class="item">Кошель «Кассадора»</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [INVENTORY]:</span> NPC «<span class="npc">Кассадор</span>» утратил предмет: «<span class="item">Кошель «Кассадора»</span>».'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [DIALOGUE]:</span> NPC «<span class="npc">Кассадор</span>» вступил в разговор с NPC_3.'
	},
	{
		type: 'info',
		content: '<span class="tag">[03:00 – 06:00] [DIALOGUE]:</span> NPC «<span class="npc">Кассадор</span>» вступил в диалог с NPC «<span class="npc">Ирида</span>».'
	},
	{ type: 'divider', content: '================================================================================' },
	{
		type: 'system',
		content: '[SYSTEM] Журнал событий приостановлен. Ожидание новых данных...'
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
		<p class="divider">===============================================================================================</p>
		<p class="console-text">
██████╗  ██████╗ ██╗   ██╗███╗   ██╗ ████████╗   ████████╗  ██████╗    ████████╗ ███████╗ ███╗   ██╗
██╔════╝██╔═══██╗██║   ██║████╗  ██║ ╚══██╔══╝   ╚══██╔══╝ ██╔═══██╗   ╚══██╔══╝ ██╔════╝ ████╗  ██║
██║     ██║   ██║██║   ██║██╔██╗ ██║    ██║         ██║    ██║   ██║      ██║    █████╗   ██╔██╗ ██║
██║     ██║   ██║██║   ██║██║╚██╗██║    ██║         ██║    ██║   ██║      ██║    ██╔══╝   ██║╚██╗██║
╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║    ██║         ██║    ╚██████╔╝      ██║    ███████╗ ██║ ╚████║
 ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝    ╚═╝         ╚═╝     ╚═════╝       ╚═╝    ╚══════╝ ╚═╝  ╚═══╝

		</p>
				<p class="divider">===============================================================================================</p>
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