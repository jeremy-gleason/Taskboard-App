import { createProject } from "./projects";
import domMethods from "./dom";
// tasks.js --> projects.js, display.js, index.js ?

const addBtn = document.getElementById('add-new');
const projectsBody = document.querySelector('.projects-body');

const projects = [];

function addProject(e) {
    const title = domMethods.getTitle();
    const description = domMethods.getDescription();
    const newProject = createProject(title, description);
    projects.push(newProject);
    domMethods.clearForm();
    displayProjects(projects);
}

function displayProjects(projects) {
    domMethods.clearDisplay();
    for (let i = 0; i < projects.length; i++) {
        const currProject = projects[i];
        domMethods.displayProject(currProject.getTitle(), currProject.getDescription(), i);
    }
}

function updateProject(projectNode) {
    // update project title & description
    let newTitle, newDescription;
    const children = projectNode.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === 'DIV' && children[i].firstChild.classList.contains('new-title')) {
            newTitle = children[i].firstChild.value;
        }
        if (children[i].tagName === 'DIV' && children[i].firstChild.classList.contains('new-descrip')) {
            newDescription = children[i].firstChild.value;
        }
    }
    projects[projectNode.getAttribute('id')].changeTitle(newTitle);
    projects[projectNode.getAttribute('id')].changeDescription(newDescription);

    // display updates on screen
    domMethods.updateProject(projectNode, newTitle, newDescription);
    domMethods.toggleEditMenu(projectNode);
}

function resetInputFields(projectNode) {
    domMethods.updateInputFields(projectNode, projects[projectNode.getAttribute('id')].getTitle(), projects[projectNode.getAttribute('id')].getDescription());
}

function deleteProject(projectNode) {
    const projectID = parseInt(projectNode.getAttribute('id'));
    projects.splice(projectID, 1);
    displayProjects(projects);
    if (projects.length === 0) {
        domMethods.displayMessage();
    }
}

addBtn.addEventListener('click', addProject);

projectsBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
        domMethods.toggleEditMenu(e.target.parentNode);
    }
    if (e.target.classList.contains('delete')) {
        deleteProject(e.target.parentNode);
    }
    if (e.target.classList.contains('confirm')) {
        updateProject(e.target.parentNode);
    }
    if (e.target.classList.contains('discard-changes')) {
        resetInputFields(e.target.parentNode);
        domMethods.toggleEditMenu(e.target.parentNode);
    }
    // COPY Project
})
