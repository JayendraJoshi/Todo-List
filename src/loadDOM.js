import "./styles.css";

export function loadDom(){
    (function loadHeader(){
        const header = document.querySelector("header");
        const showLinksButton = document.createElement("button");
        showLinksButton.classList.add("showLinks");
        showLinksButton.appendChild(document.createElement("span"));
        showLinksButton.appendChild(document.createElement("span"));
        showLinksButton.appendChild(document.createElement("span"));
        

        const title = document.createElement("h1");
        title.textContent="To-Do's"

        header.appendChild(showLinksButton);
        header.appendChild(title);
    })();
}