const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const runnersList = document.getElementById("runners-list");
const form = document.getElementById("runner-form");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

async function getRunners () {
  try {
    const response = await fetch("http://localhost:3000/runners");
    const runners = await response.json();

    runnersList.innerHTML = "";

    runners.forEach((runner) => {
      const card = document.createElement("div");
      card.classList.add("runner-card");

      card.innerHTML = `
      <h3>${runner.name}</h3>
      <p>Goal: ${runner.goal}</p>`;

      runnersList.appendChild(card);
    });
  } catch (error) {
    runnersList.innerHTML = "<p>Unable to load runners.</p>";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const goal = document.getElementById("goal").value;

  try {
    const response = await fetch("http://localhost:3000/runners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, goal })
    });

    if (!response.ok) {
      throw new Error("Error creating runner");
    }

    form.reset();

    getRunners();

  } catch (error) {
    alert("Error creating runner");
  }
});

getRunners();