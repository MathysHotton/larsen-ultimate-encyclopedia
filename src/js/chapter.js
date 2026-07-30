// ======================================
// chapter.js
// ======================================

import { marked } from "marked";

export async function loadChapter(file) {

    const response = await fetch(`/src/chapters/${file}`);

    if (!response.ok){

        throw new Error(`Impossible de charger ${file}`);

    }

    const markdown = await response.text();

    return marked.parse(markdown);

}