const prizes = [
  { color: '#d9534f', text: '0.01元' },
  { color: '#ffd700', text: '0.6元' },
  { color: '#d9534f', text: '6.66元' },
  { color: '#ffd700', text: '6.66元' },
  { color: '#d9534f', text: '66.66元' },
  { color: '#ffd700', text: '100.00元' }
].reverse();

const wheel = document.getElementById('wheel');
const lotteryBtn = document.getElementById('lotteryBtn');
let isRotating = false;

const today = new Date().toISOString().split('T')[0];
const lastLotted = localStorage.getItem('lastLottedDate');

if (lastLotted === today) {
  lotteryBtn.disabled = true;
  lotteryBtn.textContent = '你已抽奖，留给别人吧';
} else {
  lotteryBtn.addEventListener('click', startLottery);
}

function initWheel() {
  const sliceAngle = 360 / prizes.length;
  prizes.forEach((prize, index) => {
    const slice = document.createElement('div');
    slice.className = 'slice';
    slice.style.backgroundColor = prize.color;
    slice.style.transform = `rotate(${index * sliceAngle}deg)`;

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = prize.text;
    text.style.transform = `rotate(${sliceAngle / 2}deg)`;

    slice.appendChild(text);
    wheel.appendChild(slice);
  });
}

function startLottery() {
  if (isRotating) return;
  isRotating = true;
  const rotations = 5;
  let randomIndex;

  // **确保用户只能抽中 0.01元 或 0.6元**
  if (Math.random() < 0.5) {
    randomIndex = 0; // 0.01元
  } else {
    randomIndex = 1; // 0.6元
  }

  const sliceAngle = 360 / prizes.length;
  const finalAngle = rotations * 360 + randomIndex * sliceAngle;

  wheel.style.transform = `rotate(${finalAngle}deg)`;

  localStorage.setItem('lastLottedDate', today);

  setTimeout(() => {
    isRotating = false;
    const prize = prizes[prizes.length - 1 - randomIndex];

    const resultModal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');
    resultText.textContent = `恭喜获得：${prize.text}`;
    resultModal.style.display = 'flex';

    document.querySelector('.close').onclick = () => {
      resultModal.style.display = 'none';
    };
    window.onclick = (event) => {
      if (event.target === resultModal) {
        resultModal.style.display = 'none';
      }
    };

    lotteryBtn.disabled = true;
    lotteryBtn.textContent = '你已抽奖，留给别人吧';
  }, 5000);
}

initWheel();
