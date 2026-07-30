document.querySelectorAll(".tab").forEach(button => {

    button.onclick = () => {

        document
            .querySelectorAll(".tab")
            .forEach(tab => tab.classList.remove("active"));

        document
            .querySelectorAll(".tab-content")
            .forEach(content => content.classList.remove("active"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.tab + "-tab")
            .classList.add("active");

    };

});