const audits = [
  {
    clinic: "North Loop Aesthetics",
    url: "northloop.example",
    claim: "GLP-1 weight loss with certain outcome language",
    risk: "High",
    status: "Reviewed",
  },
  {
    clinic: "Everwell Med Spa",
    url: "everwell.example",
    claim: "Clinician-led options for eligible patients",
    risk: "Low",
    status: "Receipt ready",
  },
  {
    clinic: "Brightline Skin + Body",
    url: "brightline.example",
    claim: "Lose up to 30 pounds with our program",
    risk: "Medium",
    status: "Needs evidence note",
  },
  {
    clinic: "Halo Wellness Studio",
    url: "halo.example",
    claim: "Compounded treatment framed with agency-review language",
    risk: "High",
    status: "Rewrite queued",
  },
];

const cards = document.querySelector("#auditCards");
const filters = document.querySelectorAll("[data-risk]");

function render(risk = "All") {
  cards.innerHTML = "";
  audits
    .filter((audit) => risk === "All" || audit.risk === risk)
    .forEach((audit) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div>
          <h2>${audit.clinic}</h2>
          <p>${audit.url} - ${audit.claim}</p>
          <p>${audit.status}</p>
        </div>
        <span class="risk ${audit.risk}">${audit.risk}</span>
        <button type="button">PDF</button>
      `;
      cards.appendChild(card);
    });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.risk);
  });
});

render();
