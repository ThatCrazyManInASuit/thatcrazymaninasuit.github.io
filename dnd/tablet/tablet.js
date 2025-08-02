
addEventListener("DOMContentLoaded", (event) => { 
/* Updated script: handles ANY number of <p class="magic-text"> */
document.querySelectorAll('.magic-text').forEach(p => {
  const tokens = p.textContent.split(/(\s+)/);   // words & the spaces between
  p.innerHTML = '';

  tokens.forEach(tok => {
    if (/^\s+$/.test(tok)) {                     // it's a space
      const space = document.createElement('span');
      space.className = 'magic-space';
      space.textContent = '\u00A0';              // NBSP so it has width
      p.appendChild(space);
      return;
    }

    /* it’s a word */
    const wordWrap = document.createElement('span');
    wordWrap.className = 'magic-word';
    [...tok].forEach(ch => {
      const span = document.createElement('span');
      span.textContent = ch;
      applySwayAndFlicker(span);                 // your sway / flicker helper
      wordWrap.appendChild(span);
    });
    p.appendChild(wordWrap);
  });
});

/* sway + subtle‑random‑flicker helper (unchanged logic) */
function applySwayAndFlicker(span){
  const swayDur = (Math.random()*1.5+1.5).toFixed(2);
  const delay   = (Math.random()*2).toFixed(2);
  const dir     = Math.random()>0.5?'alternate':'alternate-reverse';

  span.style.animation = `sway ${swayDur}s ${dir} ease-in-out ${delay}s infinite`;

  const base=[241,152,49], alt=[205,118,19];
  const flicker=()=>{                                   // subtle, random
    const i1=Math.random()*0.6+0.4, i2=Math.random()*0.6+0.4;
    span.style.textShadow =
      `0 0 ${(i1*6).toFixed(1)}px rgba(${base},${i1.toFixed(2)}) ,
       0 0 ${(i2*12).toFixed(1)}px rgba(${alt },${i2.toFixed(2)})`;
  };
  setInterval(flicker, Math.random()*300+100);
}
})