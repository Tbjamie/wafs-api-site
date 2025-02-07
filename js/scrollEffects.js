document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);

  lenis.on("scroll", ScrollTrigger.update);

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  gsap.to(".body", {
    scrollTrigger: {
      trigger: ".split-text",
      start: "top 20%",
      end: "bottom 0%",
      scrub: true,
    },
    background: "#4000a7",
    duration: 2,
  });

  // SOURCE: https://www.youtube.com/watch?v=VeTwNnZUPlw&ab_channel=DesignCourse

  const splitTypes = document.querySelectorAll(".split-text");

  splitTypes.forEach((char, i) => {
    const text = new SplitType(char, { types: "chars" });

    gsap.from(text.chars, {
      scrollTrigger: {
        trigger: char,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      color: "transparent",
      stagger: 0.1,
    });
  });
});
