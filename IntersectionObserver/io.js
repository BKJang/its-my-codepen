const INTERSECTION_OBSERVER_EXIST = !!window.IntersectionObserver;

const options = {
  root: null,
  rootMargin: '10px 10px 10px 10px',
  threshold: [0.0, 1.0]
}

const renderVisibleText = (isIntersecting, element) => {
  if (isIntersecting) {
    element.innerHTML = `<span>VISIBLE</span>`;
  } else {
    element.innerHTML = `<span>UNVISIBLE</span>`;
  }
}

const scrollEventWithRect = element => {
  window.addEventListener('scroll', () => {
    const rect = element.getBoundingClientRect();
    const inViewport = rect.bottom > 0 && rect.right > 0 &&
      rect.left < window.innerWidth &&
      rect.top < window.innerHeight;

    renderVisibleText(inViewport, element);
  });
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const target = entry.target;

    renderVisibleText(entry.isIntersecting, target);
  })
}, options)


const boxElements = document.querySelectorAll('.box');

boxElements.forEach(element => {
  if (!INTERSECTION_OBSERVER_EXIST) {
    io.observe(element);
  } else {
    scrollEventWithRect(element);
  }
});
