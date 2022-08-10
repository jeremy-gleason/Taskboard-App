import { createProject } from "./projects";
import domMethods from "./dom";

const nav = document.querySelector('.main-nav');
const addBtn = document.getElementById('add-new');
const projectsBody = document.querySelector('.projects-body');

// check whether storage is supported/available
function localStorageAvailable() {
    let storage;
    try {
        storage = window.localStorage;
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && 
            (storage && storage.length !== 0);
    }
}

function updateStorage(projects) {
    if (localStorageAvailable()) {
        window.localStorage.setItem('titles', concatItems(projects, 'title'));
        window.localStorage.setItem('descriptions', concatItems(projects, 'description'));
    }
}

function concatItems(projects, field) {
    let items = '';
    for (let i = 0; i < projects.length; i++) {
        if (field === 'title') {
            items += '///' + projects[i].getTitle();
        } else {
            items += '///' + projects[i].getDescription();
        }
    }
    return items;
}

function addProject(e) {
    const title = domMethods.getTitle();
    const description = domMethods.getDescription();
    const newProject = createProject(title, description);
    projects.push(newProject);
    updateStorage(projects);
    domMethods.clearForm();
    domMethods.setHeader('Your Projects');
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
    updateStorage(projects);

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
    updateStorage(projects);
    displayProjects(projects);
    if (projects.length === 0) {
        domMethods.displayMessage(`You haven't added any projects yet.`);
    }
}
let projects = [];

if (localStorageAvailable() && window.localStorage.getItem('titles')) {
    const titles = window.localStorage.getItem('titles').split('///');
    const descriptions = window.localStorage.getItem('descriptions').split('///');

    if (titles.length > 1) {
        for (let i = 1; i < titles.length; i++) {
            projects.push(createProject(titles[i], descriptions[i]));
        }
        displayProjects(projects);
    }
}

nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        if (e.target.id === 'nav-about') {
            domMethods.clearDisplay();
            domMethods.setHeader('About');
            domMethods.displayMessage(`TaskBoard is an all-in-one project management system that makes it easy to track the work that matters most to you.
            
            Get started by creating a new project!`);
        } else {
            domMethods.setHeader('Your Projects');
            if (projects.length === 0) {
                domMethods.clearDisplay();
                domMethods.displayMessage("You haven't added any projects yet.");
            } else {
                displayProjects(projects);
            }
        }
    }
});

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
});