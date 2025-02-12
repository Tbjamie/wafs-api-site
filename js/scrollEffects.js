document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  const parallax = document.querySelector(".parallax-section a:first-of-type");
  const parallax2 = document.querySelector(
    ".parallax-section a:nth-of-type(2)"
  );
  const parallax2Image = document.querySelector(
    ".parallax-section a:nth-of-type(2) img"
  );
  const parallax3 = document.querySelector(".parallax-section a:last-of-type");
  const parallax3Image = document.querySelector(
    ".parallax-section a:last-of-type img"
  );
  const contactForm = document.querySelector(".contact form");
  const contactImage = document.querySelector(".contact div");
  const articles = document.querySelectorAll(
    ".work-section article:nth-of-type(-n+2)"
  );

  const parallaxImages = [parallax2Image, parallax3Image];

  gsap.registerPlugin(ScrollTrigger);

  // enabling lenis smooth scrolling using gsap scrolltrigger

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // parallax effect on the parallax section

  gsap.to(parallax, {
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top 80%",
      scrub: true,
    },
    y: 400,
  });

  gsap.to(parallax2, {
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top 80%",
      scrub: true,
    },
    y: 0,
  });

  parallaxImages.forEach((image) => {
    gsap.to(image, {
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top -20%",
        end: "bottom bottom",
        scrub: true,
      },
      translateY: 100,
    });
  });

  gsap.to(parallax3, {
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top 80%",
      scrub: true,
    },
    y: 100,
  });

  // scrolling text fill animation
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

  // clip path effect on the work section
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
    .to(articles, {
      clipPath: "inset(0 100% 0 0)",
      stagger: 0.5,
    });

  // check if user prefers reduced motion and plays the animation if not

  if (!window.matchMedia("(prefers-reduced-motion)").matches) {
    gsap.from(contactForm, {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 20%",
      },
      clipPath: "inset(100% 0 0 0)",
      duration: 0.7,
    });

    gsap.from(contactImage, {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 20%",
      },
      clipPath: "inset(0 0 100% 0)",
      duration: 0.7,
    });
  }
});
