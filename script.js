// Зашифрованные данные (Base64)
const _data = [
    { e: "To behave in an unexpected and undesired way", r: "0JLQtdGB0YLQuCDRgdC10LHRjyDQvdC10L7QttC40LTQsNC90L3Ri9C8INC4INC90LXQttC10LvQsNGC0LXQu9GM0L3Ri9C8INC+0LHRgNCw0LfQvtC8" },
    { e: "To remain hidden or dormant", r: "0J7RgdGC0LDQstCw0YLRjNGB0Y8g0YHQutGA0YvRgtGL0Lwg0LjQu9C4INCx0LXQt9C00LXQudGB0YLQstGD0Y7RidC40Lw=" },
    { e: "To press a particular combination of keys", r: "0J3QsNC20LDRgtGMINC+0L/RgNC10LTQtdC70ZHRgtC90YPRjiDQutC+0LzQsdC40L3QsNGG0QuNGOINC60LvQsNCy0LjRiA==" },
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
    { e: "System halt", r: "0J7RgdGC0LDQvdC+0LLQutCwINGB0QuRgdGC0LXQvNGL" },
    { e: "Contamination", r: "0JfQsNCz0YDRj9C30L3QtdC90QuQtSAo0LfQsNGA0LDQttC10L3QuNC1KQ==" },
    { e: "To restrict execution of destructive actions", r: "0J7Qs9GA0LDQvdC40YfQuNGC0Ywg0LLRi9C/0L7Qu9C90LXQvdC40LUg0YDQsNC30YDRg9GI0LjRgtC10LvR0L3Ri9GFINC00LXQudGB0YLQstC40Lk=" },
    { e: "To prevent", r: "0J/RgNC10LTQvtGC0LLRgNCw0YnQsNGC0Yw=" },
    { e: "To wipe out hard disk", r: "0KHRgtC40YDQsNGC0Ywg0LTQsNC90L3Ri9C1INGBINC20ZHRgdGC0LrQvtCz0L4g0LTQuNGB0LrQsA==" },
    { e: "A cracked copy", r: "0J/QuNGA0LDRgtGB0LrQsNGPINC60L7Qv9C40Y8=" },
    { e: "Criminal responsibility", r: "0KPQs9C+0LvQvtCy0L3QsNGPINC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjA==" },
    { e: "To bring profits", r: "0J/RgNC40L3QvtGB0LjRgtGMINC00L7RhdC+0LQ=" },
    { e: "Double-dealing", r: "0JTQstC+0LnQvdCw0Y8g0YHQvNC10LvQutCw" },
    { e: "An antiviral protection", r: "0JDQvdGC0LjQstC40YDRg9GB0L3QsNGPINC30LDRidC40YLQsA==" },
    { e: "Remedy", r: "0JvQtdGH0LXQvdC40LUsINC70LXQutCw0YDRgdGC0LLQvtA=" }
];

// Функция декодирования UTF-8 из Base64
const _d = (s) => decodeURIComponent(escape(atob(s)));

let currentIndex = 0;
let score = 0;
let shuffledWords = [];
let currentMode = 'en-ru';
let isSpeaking = false;

const backToMenuBtn = document.getElementById('back-to-menu-btn');

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-mode');
        startQuiz();
    });
});

function startQuiz() {
    shuffledWords = [..._data].sort(() => Math.random() - 0.5);
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('total-questions').innerText = _data.length;
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

    if (currentMode === 'en-ru') {
        questionDisplay.innerText = currentWord.e;
        mainSpeakBtn.classList.remove('hidden');
    } else {
        questionDisplay.innerText = _d(currentWord.r);
        mainSpeakBtn.classList.add('hidden');
    }

    document.getElementById('current-index').innerText = currentIndex + 1;

    let correctVal = (currentMode === 'en-ru') ? _d(currentWord.r) : currentWord.e;
    let options = [correctVal];
    
    while (options.length < 4) {
        let rW = _data[Math.floor(Math.random() * _data.length)];
        let rV = (currentMode === 'en-ru') ? _d(rW.r) : rW.e;
        if (!options.includes(rV)) options.push(rV);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        const span = document.createElement('span');
        span.innerText = opt;
        btn.appendChild(span);

        if (currentMode === 'ru-en') {
            const sB = document.createElement('div');
            sB.innerHTML = '🔊';
            sB.classList.add('mini-speak-btn');
            sB.onclick = (e) => { e.stopPropagation(); speakText(opt, sB); };
            btn.appendChild(sB);
        }

        btn.onclick = () => checkAnswer(opt, correctVal, btn);
        optionsContainer.appendChild(btn);
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
    document.getElementById('next-btn').classList.remove('hidden');
}

function speakText(t, b = null) {
    if (isSpeaking) return;
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'en-US';
    u.onstart = () => { isSpeaking = true; if (b) b.classList.add('playing'); };
    u.onend = () => { isSpeaking = false; if (b) b.classList.remove('playing'); };
    window.speechSynthesis.speak(u);
}

document.getElementById('main-speak-btn').addEventListener('click', function() {
    speakText(shuffledWords[currentIndex].e, this);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < shuffledWords.length) showQuestion();
    else showResults();
});

backToMenuBtn.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
});

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('score-text').innerText = `Твой результат: ${score} из ${_data.length}`;
}

// Защита: отключаем правую кнопку мыши
document.addEventListener('contextmenu', event => event.preventDefault());

// Защита: отключаем горячие клавиши F12, Ctrl+Shift+I и т.д.
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};