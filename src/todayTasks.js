function addTitle(){
  const contentTitleContainer =  document.querySelector("contentTitleContainer")
  const contentTitle =  document.createElement("h2");
  contentTitle.textContent="Today";
  contentTitleContainer.appendChild(contentTitle);
}
function renderAddButton(){
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent="Add Task";
    
}