const titleMain = document.getElementById("titleMain");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const triggerHeight = window.innerHeight - 160;
  const fixedOffset = 0; // 50px del top

  if (scrollY >= triggerHeight) {
    titleMain.style.position = "fixed";
    titleMain.style.top = `${fixedOffset}px`;
    titleMain.style.left = "50%";
    titleMain.style.transform = "translateX(-50%)";
    titleMain.style.zIndex = "10";
  } else {
    // Vuelve a la posición normal si subes
    titleMain.style.position = "relative";
    titleMain.style.top = "";
    titleMain.style.left = "";
    titleMain.style.transform = "";
    titleMain.style.zIndex = "";
  }
});
