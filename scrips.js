window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.getElementById("titleMain").style.transform = `translateY(${
    scrollY * 0.4
  }px)`;
  document.getElementById("titleSubMain").style.transform = `translateY(${
    scrollY * 0.4
  }px)`;
});
