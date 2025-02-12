document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  const parralaxImage = document.querySelector(
    ".parallax-section a:first-of-type"
  );
  const parralaxImage2 = document.querySelector(
    ".parallax-section a:nth-of-type(2)"
  );
  const parralaxImage3 = document.querySelector(
    ".parallax-section a:last-of-type"
  );

  const firstWorkArticle = document.querySelectorAll(
    ".work-section article:first-of-type"
  );
  const secondWorkArticle = document.querySelectorAll(
    ".work-section article:nth-of-type(2)"
  );
  const lastWorkArticle = document.querySelectorAll(
    ".work-section article:last-of-type"
  );

  gsap.registerPlugin(ScrollTrigger);

  lenis.on("scroll", ScrollTrigger.update);

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // gsap.to(".body", {
  //   scrollTrigger: {
  //     trigger: ".split-text",
  //     start: "top 60%",
  //     scrub: true,
  //   },
  //   backgroundColor: "purple",
  //   duration: 2,
  // });

  gsap.fromTo(
    parralaxImage,
    { y: 0 },
    {
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top 80%",
        scrub: true,
      },
      y: 400,
    }
  );

  gsap.to(".parallax-section a:first-of-type img", {
    scrollTrigger: {
      trigger: parralaxImage,
      start: "top 20%",
      end: "top 0%",
      scrub: true,
    },
    transformOrigin: "0% 100%",
  });

  gsap.to(parralaxImage2, {
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top 80%",
      scrub: true,
    },
    y: 0,
  });

  gsap.to(parralaxImage3, {
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top 80%",
      scrub: true,
    },
    y: 100,
  });

  gsap.fromTo(
    firstWorkArticle,
    {
      clipPath: "inset(0 0 0 0)",
    },
    {
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 0",
        scrub: true,
        pin: true,
      },
      clipPath: "inset(0 100% 0 0)",
    }
  );

  gsap.fromTo(
    secondWorkArticle,
    {
      clipPath: "inset(0 0 0 0)",
    },
    {
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 0",
        scrub: true,
        pin: true,
      },
      clipPath: "inset(0 100% 0 0)",
    }
  );

  // SOURCE: https://www.youtube.com/watch?v=VeTwNnZUPlw&ab_channel=DesignCourse

  const splitTypes = document.querySelectorAll(".split-text");
  splitTypes.forEach((word) => {
    splitTypes.forEach((word, i) => {
      const text = new SplitType(word, { types: "chars,words" });

      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: word,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        color: "transparent",
        stagger: 1,
      });
    });
  });
});
