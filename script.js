const words = [
    { eng: "To behave in an unexpected and undesired way", rus: "Вести себя неожиданным и нежелательным образом" },
    { eng: "To remain hidden or dormant", rus: "Оставаться скрытым или бездействующим" },
    { eng: "To press a particular combination of keys", rus: "Нажать определённую комбинацию клавиш" },
    { eng: "Attachment", rus: "Вложение" },
    { eng: "To attach to", rus: "Прикрепляться к" },
    { eng: "A removable disk", rus: "Съёмный диск" },
    { eng: "Relatively harmless", rus: "Относительно безвредный" },
    { eng: "Computer environment", rus: "Компьютерная среда" },
    { eng: "Their main goal is survival", rus: "Их главная цель — выживание" },
    { eng: "Crypting/decrypting engine", rus: "Шифрующий/дешифрующий механизм" },
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
let currentMode = 'en-ru';
let isSpeaking = false;

// Элементы интерфейса
const UI = {
    startScreen: document.getElementById('start-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    currentIndex: document.getElementById('current-index'),
    totalQuestions: document.getElementById('total-questions'),
    nextBtn: document.getElementById('next-btn'),
    mainSpeakBtn: document.getElementById('main-speak-btn'),
    scoreText: document.getElementById('score-text'),
    backToMenuBtn: document.getElementById('back-to-menu-btn')
};

// Выбор режима
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-mode');
        startQuiz();
    });
});

function startQuiz() {
    shuffledWords = [...words].sort(() => Math.random() - 0.5);
    UI.startScreen.classList.add('hidden');
    UI.quizScreen.classList.remove('hidden');
    UI.totalQuestions.innerText = words.length;
    currentIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    UI.nextBtn.classList.add('hidden');
    UI.optionsContainer.innerHTML = '';
    
    const currentWord = shuffledWords[currentIndex];

    if (currentMode === 'en-ru') {
        UI.questionText.innerText = currentWord.eng;
        UI.mainSpeakBtn.classList.remove('hidden');
    } else {
        UI.questionText.innerText = currentWord.rus;
        UI.mainSpeakBtn.classList.add('hidden');
    }

    UI.currentIndex.innerText = currentIndex + 1;

    // Определяем правильный ответ для текущего режима
    const correctVal = (currentMode === 'en-ru') ? currentWord.rus : currentWord.eng;
    
    // Генерируем варианты
    let options = [correctVal];
    while (options.length < 4) {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        let randomVal = (currentMode === 'en-ru') ? randomWord.rus : randomWord.eng;
        if (!options.includes(randomVal)) {
            options.push(randomVal);
        }
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        const span = document.createElement('span');
        span.innerText = opt;
        btn.appendChild(span);

        // Иконка звука только для английских вариантов
        if (currentMode === 'ru-en') {
            const sB = document.createElement('div');
            sB.innerHTML = '🔊';
            sB.className = 'mini-speak-btn';
            sB.onclick = (e) => { 
                e.stopPropagation(); 
                speakText(opt, sB); 
            };
            btn.appendChild(sB);
        }

        btn.onclick = () => checkAnswer(opt, correctVal, btn);
        UI.optionsContainer.appendChild(btn);
    });
}

function checkAnswer(sel, cor, btn) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    if (sel === cor) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => {
            if (b.querySelector('span').innerText === cor) {
                b.classList.add('correct');
            }
        });
    }
    UI.nextBtn.classList.remove('hidden');
}

function speakText(t, b = null) {
    if (isSpeaking || !t) return;
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-US';
    u.rate = 0.9;
    u.onstart = () => { isSpeaking = true; if (b) b.classList.add('playing'); };
    u.onend = () => { isSpeaking = false; if (b) b.classList.remove('playing'); };
    u.onerror = () => { isSpeaking = false; if (b) b.classList.remove('playing'); };
    window.speechSynthesis.speak(u);
}

UI.mainSpeakBtn.addEventListener('click', function() {
    speakText(shuffledWords[currentIndex].eng, this);
});

UI.nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < shuffledWords.length) {
        showQuestion();
    } else {
        showResults();
    }
});

UI.backToMenuBtn.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    UI.quizScreen.classList.add('hidden');
    UI.startScreen.classList.remove('hidden');
});

function showResults() {
    UI.quizScreen.classList.add('hidden');
    UI.resultScreen.classList.remove('hidden');
    UI.scoreText.innerText = `Твой результат: ${score} из ${words.length}`;
}

// Защита: отключаем правую кнопку мыши
document.addEventListener('contextmenu', event => event.preventDefault());

// Защита: отключаем F12 и горячие клавиши консоли
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};