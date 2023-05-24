const targets = document.querySelectorAll(".fade-class");
const options = { root: null, threshold: 0.1, rootMargin: "-0px" };
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("fade-in");
    } else {
      container.classList.remove("fade-in");
    }
  });
}, options);

targets.forEach((target) => {
  observer.observe(target);
});

