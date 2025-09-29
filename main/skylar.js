
const scroll = new LocomotiveScroll({
    el: document.body,
    smooth: true,
});

const target = document.querySelector('#section-ii');

scroll.on('call', func => {
    scroll.scrollTo(target);
});


document.getElementById("img-top").setAttribute("src", `../photos/${Math.floor(Math.random() * 84)}.jpg`)
setInterval(() => {
  document.getElementById("img-top").setAttribute("src", `../photos/${Math.floor(Math.random() * 84)}.jpg`)
}, 1500);
