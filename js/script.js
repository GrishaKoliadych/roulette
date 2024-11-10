const cells = 30;

const items = [
  {name: 'iPhone', img: 'IMG/case/100$.webp', text: '+5 нових заявок зранку кожного дня'},
  {name: 'Keyboard', img: 'IMG/case/keyboard.png', text: '100$'},
  {name: 'Headphones', img: 'IMG/case/headphones.png', text: 'Нічого'},
  {name: 'Keyboard', img: 'IMG/case/keyboard.png', text: 'Безоплатні обіди на протязі тижня'},
  {name: 'Keyboard', img: 'IMG/case/keyboard.png', text: 'Всі куплені авто рахуються в ЗП на 50$ більше на протязі тижня'},
  {name: 'Keyboard', img: 'IMG/case/keyboard.png', text: 'Заявки зі всіх джерел'},
  {name: 'Keyboard', img: 'IMG/case/keyboard.png', text: 'Зйомка інтерв`ю в інстаграм'},
]

function generateItems() {
  document.querySelector('.list').remove();
  document.querySelector('.scope').innerHTML = `
    <ul class="list"></ul>
  `;
  const list = document.querySelector('.list')
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const li = document.createElement('li');
      li.setAttribute('data-item', JSON.stringify(item));
      li.classList.add('list__item');
      // li.innerHTML = `
      //   <img src="${item.img}" alt="" />
      // `;
      li.innerHTML = `<div class="text-prize">${item.text}</div>`;
      list.append(li);
    }
  }
};

let isStarted = false;

function start() {
  if (isStarted) return;
  isStarted = true;

  generateItems(); 

  setTimeout(() => {
    const list = document.querySelector('.list');
    list.style.transition = 'none';
    list.style.transform = 'translate3d(0, 0, 0)';
    void list.offsetWidth;
    list.style.transition = '5s cubic-bezier(0.21, 0.53, 0.29, 0.99)';

    const randomNumber = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    const listWidth = list.getBoundingClientRect().width;
    const scopeWidth = document.querySelector('.scope').getBoundingClientRect().width;

    const maxOffset = listWidth - scopeWidth;
    const targetOffset = (randomNumber / 100) * maxOffset;
    list.style.transform = `translate3d(-${targetOffset}px, 0, 0)`;
    const items = Array.from(list.querySelectorAll('li'));
    let cumulativeWidth = 0;
    let winnerIndex = 0;

    for (let i = 0; i < items.length; i++) {
      const itemWidth = items[i].getBoundingClientRect().width;
      cumulativeWidth += itemWidth;
      if (cumulativeWidth >= targetOffset + scopeWidth / 2) {
        winnerIndex = i;
        break;
      }
    }

    const winnerItem = items[winnerIndex];
    list.addEventListener('transitionend', () => {
      isStarted = false;
      winnerItem.classList.add('active');
      const data = JSON.parse(winnerItem.getAttribute('data-item'));

      console.log('Вибрано елемент:', data);
    }, { once: true });
  }, 0);
}

generateItems();
