(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hasRoom = window.matchMedia("(min-width: 961px)");
  const steps = [...document.querySelectorAll(".story-step")];
  const images = [...document.querySelectorAll(".stage-image")];
  const nodes = [...document.querySelectorAll(".route-node")];
  const counter = document.querySelector(".stage-counter b");
  const progress = document.querySelector(".stage-progress span");

  if (!("IntersectionObserver" in window) || prefersReducedMotion.matches || !hasRoom.matches || !steps.length) {
    return;
  }

  root.classList.add("is-enhanced");
  steps[0].classList.add("is-active");

  const activate = (index) => {
    steps.forEach((step, itemIndex) => step.classList.toggle("is-active", itemIndex === index));
    images.forEach((image, itemIndex) => image.classList.toggle("is-active", itemIndex === index));
    nodes.forEach((node, itemIndex) => node.classList.toggle("is-active", itemIndex === index));

    if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    if (progress) progress.style.width = `${((index + 1) / steps.length) * 100}%`;
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) activate(Number(visible.target.dataset.phase));
  }, {
    rootMargin: "-28% 0px -42% 0px",
    threshold: [0.05, 0.25, 0.5, 0.75]
  });

  steps.forEach((step) => observer.observe(step));
})();
