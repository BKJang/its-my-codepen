const INTERSECTION_OBSERVER_EXIST = !!window.IntersectionObserver;

const options = {
  root: null,
  rootMargin: '10px 10px 10px 10px',
  threshold: [0.0, 1.0]
}

const renderVisibleText = function (isIntersecting, element) {
  if (isIntersecting) {
    element.innerHTML = '<span>VISIBLE</span>';
  } else {
    element.innerHTML = '<span>UNVISIBLE</span>';
  }
}

const scrollEventWithRect = function (element) {
  window.addEventListener('scroll', function () {
    const rect = element.getBoundingClientRect();
    const inViewport = rect.bottom > 0 && rect.right > 0 &&
      rect.left < window.innerWidth &&
      rect.top < window.innerHeight;

    renderVisibleText(inViewport, element);
  });
}

const io = (function () {
  if (INTERSECTION_OBSERVER_EXIST) {
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const target = entry.target;

        renderVisibleText(entry.isIntersecting, target);
      });
    });
  } else {
    return {
      observe: function (element) {
        scrollEventWithRect(element);
      }
    }
  }
}());

const boxElements = document.querySelectorAll('.box');

Array.prototype.slice.call(boxElements).forEach(function (element) {
  io.observe(element);
});
