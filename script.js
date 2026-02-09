const backToMenuBtn = document.getElementById('back-to-menu-btn');
const words = [
    { eng: "To behave in an unexpected and undesired way", rus: "Вести себя неожиданным и нежелательным образом" },
    { eng: "To remain hidden or dormant", rus: "Оставаться скрытым или бездействующим" },
    { eng: "To press a particular combination of keys", rus: "Нажать определённую комбинацию клавиш" },
    { eng: "Attachment", rus: "Вложение" },
    { eng: "To attach to", rus: "Прикрепляться к" },
    { eng: "A removable disk", rus: "Съёмный диск" },
    { eng: "Relatively harmless", rus: "Относительно безвредный" },
    { eng: "Computer environment", rus: "Компьютерная среда" },
    { eng: "Their main goal is survival", rus: "Их главная цель - выживание" },
    { eng: "Crypting decrypting engine", rus: "Шифрующий дешифрующий механизм" },
    { eng: "Disguise", rus: "Маскировка" },
    { eng: "To download from a network system", rus: "Скачивать из сетевой системы" },
    { eng: "A response to the altitude of society", rus: "Реакция на отношение общества" },
    { eng: "Reproducing program", rus: "Программа воспроизведения" },
    { eng: "Destructive action", rus: "Разрушительное действие" },
    { eng: "System halt", rus: "Остановка системы" },
    { eng: "Contamination", rus: "Загрязнение (заражение)" },
    { eng: "To restrict execution of destructive actions", rus: "Ограничить выполнение разрушительных действий" },
    { eng: "To prevent", rus: "Предотвращать" },
    { eng: "To wipe out hard disk", rus: "Стирать данные с жёсткого диска" },
    { eng: "A cracked copy", rus: "Пиратская копия" },
    { eng: "Criminal responsibility", rus: "Уголовная ответственность" },
    { eng: "To bring profits", rus: "Приносить доход" },
    { eng: "Double-dealing", rus: "Двойная сделка" },
    { eng: "An antiviral protection", rus: "Антивирусная защита" },
    { eng: "Remedy", rus: "Лечение, лекарство" }
];

let currentIndex = 0;
let score = 0;
let shuffledWords = [];
let currentMode = 'en-ru'; // По умолчанию
let isSpeaking = false; // Флаг для контроля озвучки

// Выбор режима и старт
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-mode');
        startQuiz();
    });
});

function startQuiz() {
    shuffledWords = [...words].sort(() => Math.random() - 0.5);
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-questions').innerText = words.length;
    showQuestion();
}

function showQuestion() {
    const nextBtn = document.getElementById('next-btn');
    const optionsContainer = document.getElementById('options-container');
    const mainSpeakBtn = document.getElementById('main-speak-btn');
    
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    const currentWord = shuffledWords[currentIndex];
    const questionDisplay = document.getElementById('question-text');

    // Настройка вопроса в зависимости от режима
    if (currentMode === 'en-ru') {
        questionDisplay.innerText = currentWord.eng;
        mainSpeakBtn.classList.remove('hidden');
    } else {
        questionDisplay.innerText = currentWord.rus;
        mainSpeakBtn.classList.add('hidden'); // Прячем общую озвучку, если вопрос на русском
    }

    document.getElementById('current-index').innerText = currentIndex + 1;

    // Генерация вариантов
    let correctValue = (currentMode === 'en-ru') ? currentWord.rus : currentWord.eng;
    let options = [correctValue];
    
    while (options.length < 4) {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        let randomValue = (currentMode === 'en-ru') ? randomWord.rus : randomWord.eng;
        if (!options.includes(randomValue)) options.push(randomValue);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(optionText => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        
        // Текст ответа
        const textSpan = document.createElement('span');
        textSpan.innerText = optionText;
        btn.appendChild(textSpan);

        // Если ответы на английском — добавляем иконку звука
        if (currentMode === 'ru-en') {
            const sBtn = document.createElement('div');
            sBtn.innerHTML = '🔊';
            sBtn.classList.add('mini-speak-btn');
            sBtn.onclick = (e) => {
                e.stopPropagation(); // Чтобы не засчитался ответ при клике на звук
                speakText(optionText, sBtn);
            };
            btn.appendChild(sBtn);
        }

        btn.onclick = () => checkAnswer(optionText, correctValue, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        allButtons.forEach(b => {
            const val = b.querySelector('span').innerText;
            if (val === correct) b.classList.add('correct');
        });
    }
    document.getElementById('next-btn').classList.remove('hidden');
}

// Универсальная функция озвучки
function speakText(text, btnElement = null) {
    if (isSpeaking) return; // Если уже говорит — игнорируем нажатие

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onstart = () => {
        isSpeaking = true;
        if (btnElement) btnElement.classList.add('playing');
    };

    utterance.onend = () => {
        isSpeaking = false;
        if (btnElement) btnElement.classList.remove('playing');
    };

    window.speechSynthesis.speak(utterance);
}

// Озвучка главного вопроса (для режима en-ru)
document.getElementById('main-speak-btn').addEventListener('click', function() {
    const text = shuffledWords[currentIndex].eng;
    speakText(text, this);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < shuffledWords.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score-text').innerText = `Твой результат: ${score} из ${words.length}`;
}

backToMenuBtn.addEventListener('click', () => {
    // Останавливаем озвучку, если она идет
    window.speechSynthesis.cancel();
    isSpeaking = false;

    // Сбрасываем прогресс
    currentIndex = 0;
    score = 0;

    // Переключаем экраны
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
});