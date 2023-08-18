const interactionBox = document.querySelector(".interaction");

let i = 0;
let change = 0;
window.addEventListener('click',()=>{
  i++;
  switch(i%4){
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
})

function createParticle (x, y) {

  let size = Math.random() * 35;
  
  x -= (size / 2);
  y -= (size / 2);
  
  let particle = document.createElement('div');
  particle.classList.add('particle');
  interactionBox.appendChild(particle);
  
  TweenMax.set(particle, {
    x: x, 
    y: y,
    width: size,
    height: size,
    background: bgColor(change)
  });
 
  TweenMax.to(particle, Math.random() * 15 + 1, {
    x: x + (Math.random() - 0.5) * 200,
    y: y + (Math.random() - 0.5) * 200,
    opacity: 0,
    scale: 0,
    ease: Power2.easeOut,
    onComplete: function () {
      interactionBox.removeChild(particle);
    }
  });
}

const throttledCreateParticle = _.throttle(createParticle,15);

window.addEventListener('mousemove', function (e) {
  var x = e.clientX;
  var y = e.clientY;
  throttledCreateParticle(x, y);
}, { passive: true });

interactionBox.addEventListener('touchmove', function (e) {
  var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
  e.preventDefault();
  throttledCreateParticle(x, y);
}, { passive: true });


function bgColor (change) {
  return `hsl(${Math.random() *90+change}, 50%, 70%)`
}