// текущий правильный ответ
let correctAnswer;
let incorrectAnswer;
// количество правильных ответов
let score = 0;
let mistake = 0;

// переменные для HTML-элементов
// кнопка «ответить»
const button = document.querySelector('#button');
// количество правильных ответов
const scoreHolder = document.querySelector('#score-holder');
const mistakeHolder = document.querySelector('#mistake-holder');
// текст — правильный/неправильный ответ
const feedback = document.querySelector('#feedback');
const back = document.querySelector('#back');
// таймер с обратным отсчетом
const timerHolder = document.querySelector('#timer-holder');
// текущий вопрос
const task = document.querySelector('#task');
// инпут для ввода ответа
const input = document.querySelector('#input');
input.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        let answer = +input.value;
    
        if (answer === correctAnswer) {
            // увеличиванем количество правильных ответов
            score++;
            // и обновляем значение в интерфейсе
            scoreHolder.textContent = `Score: ${score}`;
            // выводим соответствующий текст
            setFeedback('correct');
            // генерируем новое задание
            generateTask();
        } else {
            // ответили неправильно — показываем сообщение об этом
            setFeedback('incorrect');
            mistake++;
            mistakeHolder.textContent = `Mistake: ${mistake}`;
            input.value = '';

        }
    }
    
})

// обработчик клика на кнопку «ответить»
button.addEventListener('click', function () {
    // считываем ответ, который ввел пользователь
    answer;

    // если ответ правильный
    if (answer === correctAnswer) {
        // увеличиванем количество правильных ответов
        score++;
        // и обновляем значение в интерфейсе
        scoreHolder.textContent = `Score: ${score}`;
        // выводим соответствующий текст
        setFeedback('correct');
        // генерируем новое задание
        generateTask();
    } else {
        // ответили неправильно — показываем сообщение об этом
        setFeedback('incorrect');
    }
});

// фунция для обратной связи в интерфейсе
// возможные состояния:
// * correct — правильный ответ
// * incorrect — неправильный ответ
// * out-of-time — время вышло
function setFeedback(status = 'correct') {
    switch (status) {
        case 'correct':
            feedback.textContent = `Correct!`;
            feedback.style.color = 'white';
            input.value = '';
            break;
        case 'incorrect':
            feedback.style.color = 'red';
            feedback.textContent = `Incorrect!`;
            break;
        case 'out-of-time':
            feedback.textContent = `You ran out of time!`;
            feedback.style.color = 'orange';
            button.disabled = true;
            if(score >=6){
                back.textContent = `Молодец!`;
                back.style.color = '#F7FF00';
            }
            if(score <=5){
                back.textContent = `Надо потренироваться`;
                back.style.color = '#F7FF00';
            }
            
    }
   
}

// генерируем новое задание
function generateTask() {
    // получаем два рандомных числа в пределах от 0 до 10 включительно
    const first = arbitraryRandom(0, 50);
    const second = arbitraryRandom(0, 50);
    const therd = arbitraryRandom(0,5);
    // обновляем переменную с правильным ответом
    correctAnswer = (first + second) * therd;
    // обновляем текст вопроса в интерфейсе
    task.textContent = `(${first} + ${second})  * ${therd}= `;
}

// функция для генерации случайных чисел
function arbitraryRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function minents(sec){
    let min = Math.floor(sec / 60).toString().padStart(2, '0');
    let secund = (sec%60).toString().padStart(2, '0');
    return`${min}:${secund}`

}
// функция с запуском таймера
function startTimer() {
    // начальное значение таймера в секундах
    let timer = 180;
    // генерируем вопрос
    generateTask();

    // запускаем таймер и сохраняем его intervalId
    let intervalId = setInterval(() => {
        // каждый раз уменьшаем количество прошедших секунд
        timer--;

        // если значение таймера меньше равно нуля
        if (timer <= 0) {
            // остановить таймер
            clearInterval(intervalId);
            // вывести в интерфейсе сообщение, что время кончилось
            setFeedback('out-of-time');
        }

        // вывести, сколько времени осталось
        timerHolder.textContent = minents(timer);

    }, 1000);
}

// запустить таймер
startTimer();