const form = document.querySelector("#snapshotForm");
const statusEl = document.querySelector("#formStatus");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "Generating your snapshot receipt...";

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("/api/snapshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      const firstError = result.errors ? Object.values(result.errors)[0] : "Please check the form and try again.";
      statusEl.textContent = firstError;
      return;
    }
    statusEl.textContent = `Snapshot receipt created (${result.receipt_id}). Check email, or ask for the $497 reviewed audit.`;
    form.reset();
  } catch (error) {
    statusEl.textContent = "Could not reach the snapshot service. Please try again in a minute.";
  }
});
