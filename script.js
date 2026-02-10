// Очищенные зашифрованные данные
const _data = [
    { e: "To behave in an unexpected and undesired way", r: "0JLQtdGB0YLQuCDRgdC10LHRjyDQvdC10L7QttC40LTQsNC90L3Ri9C8INC4INC90LXQttC10LvQsNGC0LXQu9GM0L3Ri9C8INC+0LHRgNCw0LfQvtC8" },
    { e: "To remain hidden or dormant", r: "0J7RgdGC0LDQstCw0YLRjNGB0Y8g0YHQutGA0YvRgtGL0Lwg0LjQu9C4INCx0LXQt9C00LXQudGB0YLQstGD0Y7RidC40Lw=" },
    { e: "To press a particular combination of keys", r: "0J3QsNC20LDRgtGMINC+0L/RgNC10LTQtdC70LXQvdC90YPRjiDQutC+0LzQsdC40L3QsNGG0QuNGOINC60LvQsNCy0LjRiA==" },
    { e: "Attachment", r: "0JLQu9C+0LbQtdC90LjQtQ==" },
    { e: "To attach to", r: "0J/RgNC40LrRgNC10L/Qu9GP0YLRjNGB0Y8g0Lo=" },
    { e: "A removable disk", r: "0KHRitGR0LzQvdGL0Lkg0LTQuNGB0Lo=" },
    { e: "Relatively harmless", r: "0J7RgtC90L7RgdC40YLQtdC70YzQvdC+INCx0LXQt9Cy0YDQtdC00L3Ri9C5" },
    { e: "Computer environment", r: "0JrQvtC80L/RjNGO0YLQtdGA0L3QsNGPINGB0YDQtdC00LA=" },
    { e: "Their main goal is survival", r: "0JjRhSDRgtC70LDQstC90DRRjyDRhtC10LvRjCDigJQg0LLRi9C20LjQstCw0L3QuNC1" },
    { e: "Crypting/decrypting engine", r: "0KjQuNGE0YDRg9GO0YnQuNC5L9C00LXRiNC40YTRgNGD0Y7RidC40Lkg0LzQtdGF0LDQvdC40LfQvQ==" },
    { e: "Disguise", r: "0JzQsNGB0LrQuNGA0L7QstC60LA=" },
    { e: "To download from a network system", r: "0KHQutCw0YfQuNCy0LDRgtGMINC40Lcg0YHQtdGC0LXQstC+0Lkg0YHQuNGB0YLQtdC80Ys=" },
    { e: "A response to the altitude of society", r: "0KDQtdCw0LrRhtC40Y8g0L3QsCDQvtGC0L3QvtGI0LXQvdC40LUg0L7QsdGJ0LXRgdGC0LLQsA==" },
    { e: "Reproducing program", r: "0J/RgNC+0LPRgNCw0LzQvNCwINCy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjRjw==" },
    { e: "Destructive action", r: "0KDQsNC30YDRg9GI0LjRgtC10LvRjNC90L7QtSDQtNC10LnRgdGC0LLQuNC1" },
    { e: "System halt", r: "0J7RgdGC0LDQvdC+0LLQutCwINGB0LjRgdGC0LXQvNGL" },
    { e: "Contamination", r: "0JfQsNCz0YDRj9C30L3QtdC90LjQtSAo0LfQsNGA0LDQttC10L3QuNC1KQ==" },
    { e: "To restrict execution of destructive actions", r: "0J7Qs9GA0LDQvdC40YfQuNGC0Ywg0LLRi9C/0L7Qu9C90LXQvdC40LUg0YDQsNC30YDRg9GI0LjRgtC10LvRjNC90YvRhSDRgdC40YHRgtC10LzQvdGL0YUg0LTQtNC50YHRgtCy0LjQuQ==" },
    { e: "To prevent", r: "0J/RgNC10LTQvtGC0LLRgNCw0YnQsNGC0Yw=" },
    { e: "To wipe out hard disk", r: "0KHRgtC40YDQsNGC0Ywg0LTQsNC90L3Ri9C1INGBINC20ZHRgdGC0LrQvtCz0L4g0LTQuNGB0LrQsA==" },
    { e: "A cracked copy", r: "0J/QuNGA0LDRgtGB0LrQsNGPINC60L7Qv9C40Y8=" },
    { e: "Criminal responsibility", r: "0KPQs9C+0LvQvtCy0L3QsNGPINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjA==" },
    { e: "To bring profits", r: "0J/RgNC40L3QvtGB0LjRgtGMINC00L7RhdC+0LQ=" },
    { e: "Double-dealing", r: "0JTQstC+0LnQvdCw0Y8g0YHQvNC10LvQutCw" },
    { e: "An antiviral protection", r: "0JDQvdGC0LjQstC40YDRg9GB0L3QsNGPINC30LDRidC40YLQsA==" },
    { e: "Remedy", r: "0JvQtdGH0LXQvdC40LUsINC70LXQutCw0YDRgdGC0LLQvtA=" }
];

// Улучшенная функция декодирования с обработкой ошибок
const _d = (s) => {
    try {
        // Убираем возможные пробелы и символы, которые могут сломать декодер
        const cleanS = s.replace(/[^A-Za-z0-9+/=]/g, "");
        return decodeURIComponent(escape(atob(cleanS)));
    } catch (err) {
        console.error("Ошибка декодирования:", s);
        return "Ошибка данных";
    }
};

let currentIndex = 0;
let score = 0;
let shuffledWords = [];
let currentMode = 'en-ru';
let isSpeaking = false;

// Элементы интерфейса (кэшируем один раз)
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

// Режимы
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-mode');
        startQuiz();
    });
});

function startQuiz() {
    shuffledWords = [..._data].sort(() => Math.random() - 0.5);
    UI.startScreen.classList.add('hidden');
    UI.quizScreen.classList.remove('hidden');
    UI.totalQuestions.innerText = _data.length;
    currentIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    UI.nextBtn.classList.add('hidden');
    UI.optionsContainer.innerHTML = '';
    
    const currentWord = shuffledWords[currentIndex];
    const rusTranslation = _d(currentWord.r);

    if (currentMode === 'en-ru') {
        UI.questionText.innerText = currentWord.e;
        UI.mainSpeakBtn.classList.remove('hidden');
    } else {
        UI.questionText.innerText = rusTranslation;
        UI.mainSpeakBtn.classList.add('hidden');
    }

    UI.currentIndex.innerText = currentIndex + 1;

    let correctVal = (currentMode === 'en-ru') ? rusTranslation : currentWord.e;
    let options = [correctVal];
    
    // Безопасная генерация вариантов
    while (options.length < 4) {
        let rW = _data[Math.floor(Math.random() * _data.length)];
        let rV = (currentMode === 'en-ru') ? _d(rW.r) : rW.e;
        if (!options.includes(rV) && rV !== "Ошибка данных") {
            options.push(rV);
        }
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        
        const span = document.createElement('span');
        span.innerText = opt;
        btn.appendChild(span);

        if (currentMode === 'ru-en') {
            const sB = document.createElement('div');
            sB.innerHTML = '🔊';
            sB.className = 'mini-speak-btn';
            sB.onclick = (e) => { e.stopPropagation(); speakText(opt, sB); };
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
            if (b.querySelector('span').innerText === cor) b.classList.add('correct');
        });
    }
    UI.nextBtn.classList.remove('hidden');
}

function speakText(t, b = null) {
    if (isSpeaking || !t || t === "Ошибка данных") return;
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-US';
    u.rate = 0.9;
    u.onstart = () => { isSpeaking = true; if (b) b.classList.add('playing'); };
    u.onend = () => { isSpeaking = false; if (b) b.classList.remove('playing'); };
    u.onerror = () => { isSpeaking = false; if (b) b.classList.remove('playing'); };
    window.speechSynthesis.speak(u);
}

UI.mainSpeakBtn.addEventListener('click', function() {
    speakText(shuffledWords[currentIndex].e, this);
});

UI.nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < shuffledWords.length) showQuestion();
    else showResults();
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
    UI.scoreText.innerText = `Твой результат: ${score} из ${_data.length}`;
}

// Защита от открытия консоли
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};