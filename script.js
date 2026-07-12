particlesJS("particles-js", {
  particles: {
    number: {
      value: 70
    },
    color: {
      value: "#3b82f6"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.4
    },
    size: {
      value: 0.7,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#3b82f6",
      opacity: 0.15,
      width: 0.5
    },
    move: {
      enable: true,
      speed: 1.2
    }
  }
});

const text =
"Front-End Developer | Python | AI | Arduino";

let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML +=
      text.charAt(i);

    i++;

    setTimeout(type, 80);
  }
}

type();



const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});