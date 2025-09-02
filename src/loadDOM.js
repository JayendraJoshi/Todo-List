import "./styles.css";

export const loadDOM = function(){
    function loadHeader(){
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
    };
    function loadAside(){
        const aside = document.querySelector("aside");
        const filterContainer = document.createElement("div");
        filterContainer.classList.add("filterContainer");
        const filterContainerTitle = document.createElement("h2");

        filterContainerTitle.textContent="Filter";

        const todayTasksLink  = document.createElement("a");
        const importantTasksLink = document.createElement("a");
        const nextSevenDaysTasksLink = document.createElement("a");
        const unplannedTasksLink = document.createElement("a");
        const allTasksLink = document.createElement("a");

        todayTasksLink.textContent="Today";
        importantTasksLink.textContent="Important";
        nextSevenDaysTasksLink.textContent="Next 7 Days";
        unplannedTasksLink.textContent="Unplanned";
        allTasksLink.textContent="All Tasks";

        filterContainer.appendChild(filterContainerTitle);
        filterContainer.appendChild(todayTasksLink);
        filterContainer.appendChild(importantTasksLink);
        filterContainer.appendChild(nextSevenDaysTasksLink);
        filterContainer.appendChild(unplannedTasksLink);
        filterContainer.appendChild(allTasksLink);

        aside.appendChild(filterContainer);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("projectContainer");
        const projectContainerTitle = document.createElement("h2");
        const addProjectButton = document.createElement("button");

        projectContainerTitle.textContent="Projects";
        addProjectButton.textContent="+ Add Project";

        projectContainer.appendChild(projectContainerTitle);
        projectContainer.appendChild(addProjectButton);

        aside.appendChild(projectContainer);
    };
    return{
        loadAside,
    }
}