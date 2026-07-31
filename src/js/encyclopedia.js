// ======================================
// encyclopedia.js
// ======================================

import { loadChapter } from "./chapter.js";

let currentChapter = 0;

let chapters = [];

async function loadMenu(){

    const response = await fetch(
    `${import.meta.env.BASE_URL}data/chapters.json`
);  

    chapters = await response.json();

    const list = document.getElementById("chapter-list");

    list.innerHTML = "";

    let currentVolume = "";
    let currentSection = "";
    let container = null;

    chapters.forEach(chapter=>{

        if(chapter.volume !== currentVolume){

            currentVolume = chapter.volume;

            const volume = document.createElement("h3");

            volume.textContent = currentVolume;

            list.appendChild(volume);

            currentSection = "";
        }

        if(chapter.section !== currentSection){

            currentSection = chapter.section;

            const header = document.createElement("div");

            header.className = "chapter-section";

            header.innerHTML =
                `<span>▼</span> ${currentSection}`;

            const group = document.createElement("div");

         group.className = "chapter-group";

          header.onclick = () => {

          group.classList.toggle("closed");

          header.querySelector("span").textContent =
          group.classList.contains("closed")
          ? "▶"
          : "▼";

         };

        container = group;

            list.appendChild(header);

            list.appendChild(container);

        }

        const button = document.createElement("button");

        button.className = "chapter-button";

        button.textContent =
            `${chapter.id}  ${chapter.title}`;

        button.onclick = ()=>{

            openChapter(chapter.file);

        };

        container.appendChild(button);

    });

}

// ======================================
// Ouvrir un chapitre
// ======================================

async function openChapter(file){

    const container = document.getElementById("chapter");

    const index = chapters.findIndex(c => c.file === file);

    if(index !== -1){

        currentChapter = index;

    }

    const html = await loadChapter(file);

    container.innerHTML = html;

    const chapter = chapters[currentChapter];

    document.getElementById("breadcrumb").innerHTML =

    `Accueil > Encyclopédie > ${chapter.volume} > <span>${chapter.id} — ${chapter.title}</span>`;

    document.querySelector(".chapter-content")
        .scrollTo({

            top:0,

            behavior:"smooth"

        });

    updateNavigation();

}

async function init(){

    await loadMenu();

installSearch();

if (chapters.length) {
    await openChapter(chapters[0].file);
}

if(chapters.length){

    await openChapter(chapters[0].file);

}

}

init();

function installSearch(){

    const input = document.getElementById("chapter-search");

    input.addEventListener("input", () => {

        const search = input.value.toLowerCase();

        document.querySelectorAll(".chapter-button")

            .forEach(button => {

                button.style.display =

                    button.textContent

                        .toLowerCase()

                        .includes(search)

                    ? ""

                    : "none";

            });

    });

}

function updateNavigation(){

    const previous = document.getElementById("previous-chapter");

    const next = document.getElementById("next-chapter");

    // ---------- Bouton précédent ----------

    if(currentChapter === 0){

        previous.disabled = true;

        previous.textContent = "◀ Début de l'encyclopédie";

    }else{

        previous.disabled = false;

        previous.textContent =
            "◀ " +
            chapters[currentChapter - 1].id +
            " — " +
            chapters[currentChapter - 1].title;

    }

    // ---------- Bouton suivant ----------

    if(currentChapter === chapters.length - 1){

        next.disabled = true;

        next.textContent = "Fin de l'encyclopédie ▶";

    }else{

        next.disabled = false;

        next.textContent =
            chapters[currentChapter + 1].id +
            " — " +
            chapters[currentChapter + 1].title +
            " ▶";

    }

    previous.onclick = () => {

        if(currentChapter === 0) return;

        openChapter(chapters[currentChapter - 1].file);

    };

    next.onclick = () => {

        if(currentChapter === chapters.length - 1) return;

        openChapter(chapters[currentChapter + 1].file);

    };

}