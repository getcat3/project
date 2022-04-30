const parent = document.querySelector('.container');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const children = document.querySelector('.child');
const LS_key = 'save';

loadData();
input.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        sendMessage()
    }
})
btn.addEventListener('click', sendMessage())

function sendMessage() {
    const child = document.createElement('div');
    child.textContent = input.value;
    child.classList.add('child');
    if (input.value !== '') {
        saveText(input.value);
        parent.append(child);
    }
    input.value = '';
}
function saveText(child) {
    const oldData = JSON.parse(localStorage.getItem(LS_key)) || [];
    oldData.push({ child })
    localStorage.setItem(LS_key, JSON.stringify(
        oldData
    ))

}
function loadData() {
    const data = JSON.parse(localStorage.getItem(LS_key)) || [];
    data.forEach(items => {
        const text = document.createElement('div');
        text.classList.add('text');
        text.textContent = items.child;
        parent.append(text);
    });
}
const arr = 'https://raw.githubusercontent.com/getcat3/news/main/news.json';
fetch(arr)
    .then(res => res.json())
    .then(data => {
        data.forEach(makeCard)
    })
const news = document.querySelector('.news');
const cardTemplate = document.querySelector('#tmpl');
function makeCard({ title, description, img }) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('h1').textContent = title;
    card.querySelector('p').textContent = description;
    //card.querySelector('img').src = `${URL}/${img}`;
    news.append(card);
}
const PHRASES = [
    'Привет',
    'Как дела',
    'Изучаем JavaScript',
    'лол',
    'Удачи',
    'А я никто',
    'по больше веселья',
    'Математика пригодится',
    'Хочу есть',
    'ДИСКОТЕКА',
    'Я люблю мокороны'
];
const getRandomEl = (arr) => {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}
const generateWords = () => {
    const text = document.createElement('div')
    text.textContent = getRandomEl(PHRASES);
    parent.append(text);
}

const delayBtn = document.querySelector('.delay');
const cancelBtn = document.querySelector('.cancel');

btn.addEventListener('click', generateWords)

delayBtn.addEventListener('click', () => {
  
    delayTimerId = setTimeout(() => {
        alert('Чат в темно комнате - это чат с рандомом, у которого есть только определенноеколичество фраз, но он всегда сможет вас выслушать')
    }, 1000)
})



cancelBtn.addEventListener('click', () => {
  
    clearTimeout(delayTimerId);
})