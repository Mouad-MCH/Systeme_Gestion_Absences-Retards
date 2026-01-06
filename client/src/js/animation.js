
import { gsap } from "gsap";

const tl = gsap.timeline({
  yoyo: true,
  duration: 0.5,
  opacity: 0,
  ease: "elastic.out(1, 0.3)",
  delay: 0.1,
});

tl.fromTo(".sidebar", {
  x: -300,
}, {
  x: 0,
  opacity: 1,
  ease: "elastic.out(0.6, 0.3)",
})

tl.fromTo(".navbar", {
  y: -50,
}, {
  y: 0,
  opacity: 1,
})

tl.from(".content-text", {
  y: -40,
  opacity: 0,
  duration: 0.8,
  ease: "elastic.out(1, 0.3)",
}).from("#myChart", {
  scale: 0.5,
  opacity: 0,
  duration: 0.8,
  ease: "elastic.out(1, 0.3)",
});


// Statistics boxs

const boxs = document.querySelectorAll('.statistic-box .item');
const charts = document.querySelectorAll('.charts .box');

function boxanim(boxs) {
  return boxs.forEach(box => {
    tl.fromTo(box, {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: {
        amound: 1,
        ease: "power1.inOut",
      },
    }
    )
  })
}

boxanim(boxs);
boxanim(charts);

charts.forEach(chart => {
  const child = chart.querySelector("canvas");
  tl.from(child, {
    scale: 0,
  })
})


// const turn = () => {
//   gsap.to("#menu-toggle", {
//     rotation: 360,
//     yoyo: true,
//     duration: 0.8,
//   })
// }

// export default turn;


