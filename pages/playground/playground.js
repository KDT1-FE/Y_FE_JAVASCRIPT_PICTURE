const interactionBox = document.querySelector(".interaction");

let i = 0;
let change = 0;
//클릭 시 색깔 변경
window.addEventListener("click", () => {
  i++;
  switch (i % 4) {
    case 0:
      change = 0;
      break;
    case 1:
      change = 200;
      break;
    case 2:
      change = 100;
      break;
    case 3:
      change = 300;
      break;
  }
});
//파티클 생성 함수
function createParticle(x, y) {
  let size = Math.random() * 35;
  //파티클 중심이 커서에 위치하도록
  x -= size / 2;
  y -= size / 2;

  let particle = document.createElement("div");
  particle.classList.add("particle");
  interactionBox.appendChild(particle);
  //초기 파티클 TweenMax.set(element, {property: value});
  TweenMax.set(particle, {
    x: x,
    y: y,
    width: size,
    height: size,
    background: bgColor(change),
  });
  //애니메이션 TweenMax.to(element, duration, {property:value});
  TweenMax.to(particle, Math.random() * 15 + 1, {
    x: x + (Math.random() - 0.5) * 200,
    y: y + (Math.random() - 0.5) * 200,
    opacity: 0,
    scale: 0,
    ease: Power2.easeOut,
    onComplete: function () {
      interactionBox.removeChild(particle);
    },
  });
}
//최적화
const throttledCreateParticle = _.throttle(createParticle, 15);

//커서에 따라 파티클 생성 (PC)
window.addEventListener(
  "mousemove",
  function (e) {
    //현재 커서 위치
    let x = e.clientX;
    let y = e.clientY;
    throttledCreateParticle(x, y);
  },
  { passive: true }
);

//터치에 따라 파티클 생성 (모바일)
interactionBox.addEventListener(
  "touchmove",
  function (e) {
    //현재 터치 위치
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    e.preventDefault();
    throttledCreateParticle(x, y);
  },
  { passive: true }
);
//비슷한 계열의 색깔이 랜덤하게 나오게 해주는 함수
function bgColor(change) {
  return `hsl(${Math.random() * 90 + change}, 50%, 70%)`;
}
