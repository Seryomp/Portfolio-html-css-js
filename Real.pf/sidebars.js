  const boutons = document.querySelectorAll(".C1");
  const sections = document.querySelectorAll(".content-section");

  boutons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.style.display = "block";
        } else {
          sec.style.display = "none";
        }
      });
    });
  });