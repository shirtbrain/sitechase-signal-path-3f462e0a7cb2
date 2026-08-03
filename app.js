(() => {
  const story = document.querySelector("[data-motion-story]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!story || reducedMotion.matches) return;

  const root = document.documentElement;
  const images = [...story.querySelectorAll("[data-motion-image]")];
  const copies = [...story.querySelectorAll("[data-motion-copy]")];
  const railItems = [...story.querySelectorAll(".motion-rail li")];
  const railFill = story.querySelector(".motion-rail__track i");
  const count = story.querySelector(".motion-count strong");
  const cue = story.querySelector(".motion-cue");
  const paths = [...story.querySelectorAll(".signal-path")];
  const sceneCount = Math.min(images.length, copies.length);

  if (!sceneCount) return;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (value) => {
    const x = clamp(value);
    return x * x * (3 - (2 * x));
  };

  root.classList.add("is-motion-ready");

  let frameRequested = false;

  const render = () => {
    frameRequested = false;

    const rect = story.getBoundingClientRect();
    const scrollRange = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / scrollRange);
    const phase = progress * (sceneCount - 1);
    const activeIndex = Math.round(phase);

    images.forEach((image, index) => {
      const distance = Math.abs(phase - index);
      const opacity = distance >= 1 ? 0 : 1 - smoothstep(distance);
      const driftX = ((index - phase) * 1.1) - (progress * 1.4);
      const driftY = ((progress - 0.5) * -1.8) + ((index % 2) * 0.8);
      const scale = 1.055 + (distance * 0.018) + (progress * 0.012);

      image.style.opacity = opacity.toFixed(4);
      image.style.transform = `translate3d(${driftX.toFixed(2)}%, ${driftY.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
    });

    copies.forEach((copy, index) => {
      const distance = Math.abs(phase - index);
      const copyWindow = 0.5;
      const opacity = distance >= copyWindow
        ? 0
        : 1 - smoothstep(distance / copyWindow);
      const translateY = (index - phase) * 54;

      copy.style.opacity = opacity.toFixed(4);
      copy.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
    });

    railItems.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
      item.classList.toggle("is-passed", index < activeIndex);
    });

    if (railFill) railFill.style.width = `${(progress * 100).toFixed(2)}%`;
    if (count) count.textContent = String(activeIndex + 1).padStart(2, "0");
    if (cue) cue.style.opacity = clamp(1 - (progress * 9)).toFixed(3);

    paths.forEach((path, index) => {
      const routeProgress = clamp((progress * 1.12) - (index * 0.07));
      path.style.strokeDashoffset = String(100 - (routeProgress * 100));
    });
  };

  const requestRender = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(render);
  };

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  window.addEventListener("orientationchange", requestRender, { passive: true });
  window.addEventListener("pageshow", requestRender, { passive: true });

  requestRender();
})();
