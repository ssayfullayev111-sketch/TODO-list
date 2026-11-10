
const search = document.getElementById("search");
const send = document.getElementById("send");
const notes = document.getElementById("notes");
const theme = document.getElementById("theme");

function addNote() {
    const text = search.value.trim();

    if (text === "") {
        alert("Iltimos, note kiriting!");
        return;
    }

    const note = document.createElement("div");
    note.className = "note";

    note.innerHTML = `
        <input type="checkbox">
        <span></span>
        <div class="actions">
            <button class="edit">✎</button>
            <button class="delete">♙</button>
        </div>
    `;

    note.querySelector("span").textContent = text;
    notes.appendChild(note);
    search.value = "";
}

send.addEventListener("click", addNote);

search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addNote();
    }
});

notes.addEventListener("click", function (e) {
    const note = e.target.closest(".note");

    if (!note) return;

    if (e.target.classList.contains("delete")) {
        note.remove();
    }

    if (e.target.classList.contains("edit")) {
        const span = note.querySelector("span");
        const newText = prompt("Note matnini o'zgartiring:", span.textContent);

        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    }
});

notes.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
        const note = e.target.closest(".note");
        note.classList.toggle("completed", e.target.checked);
    }
});

search.addEventListener("input", function () {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".note").forEach(note => {
        const text = note.querySelector("span").textContent.toLowerCase();
        note.style.display = text.includes(value) ? "flex" : "none";
    });
});

theme.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    theme.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});
