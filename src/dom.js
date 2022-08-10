const domMethods = {
    projectsBody: document.querySelector('.projects-body'),
    header: document.getElementById('header'),
    newTitle: document.getElementById('title'),
    newDescription: document.getElementById('description'),
    displayProject: function(title, description, id) {
        const newProject = document.createElement('article');
        newProject.setAttribute('id', id);
        const projTitle = document.createElement('h3');
        projTitle.innerText = title;
        const projDescription = document.createElement('p');
        projDescription.innerText = description;

        // View & Edit (/pencil SVG) buttons
        const editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('edit');
        editBtn.innerText = 'Edit';

        // remove button (/trash can SVG)
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.classList.add('delete');
        deleteBtn.innerText = 'Delete';

        // text inputs for title and description
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('hidden');
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.classList.add('new-title');
        titleInput.setAttribute('value', title);
        titleDiv.appendChild(titleInput);
        
        const descripDiv = document.createElement('div');
        descripDiv.classList.add('hidden');
        const descripInput = document.createElement('textarea');
        descripInput.setAttribute('rows', '3');
        descripInput.classList.add('new-descrip');
        descripInput.textContent = description;
        // descripInput.setAttribute('value', description);
        descripDiv.appendChild(descripInput);
    
        // confirm & discard changes buttons
        const confirmBtn = document.createElement('button');
        confirmBtn.setAttribute('type', 'button');
        confirmBtn.classList.add('confirm', 'hidden');
        confirmBtn.innerText = 'Confirm';
        
        const discardChangesBtn = document.createElement('button');
        discardChangesBtn.setAttribute('type', 'button');
        discardChangesBtn.classList.add('discard-changes', 'hidden');
        discardChangesBtn.innerText = 'Discard Changes';
        
        // insert inputs & new buttons into DOM
        newProject.appendChild(projTitle);
        newProject.appendChild(projDescription);
        newProject.appendChild(editBtn);
        newProject.appendChild(deleteBtn);
        newProject.appendChild(titleDiv);
        newProject.appendChild(descripDiv);
        newProject.appendChild(confirmBtn);
        newProject.appendChild(discardChangesBtn);
        
        this.projectsBody.appendChild(newProject);
    },
    updateProject: function(projectNode, newTitle, newDescription) {
        const children = projectNode.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (children[i].tagName === 'H3') {
                children[i].textContent = newTitle;
            }
            if (children[i].tagName === 'P') {
                children[i].innerText = newDescription;
            }
        }
    },
    setHeader(text) {
        this.header.innerText = text;
    },
    displayMessage: function(text) {
        const message = document.createElement('p');
        message.setAttribute('id', 'no-projects');
        message.innerText = text;
        this.projectsBody.appendChild(message);
    },
    clearDisplay: function() {
        while (this.projectsBody.hasChildNodes())  {
            this.projectsBody.removeChild(this.projectsBody.firstChild);
        }
    },
    clearForm: function() {
        this.newTitle.value = '';
        this.newDescription.value = '';
    },
    toggleEditMenu: function(projectNode) {
        const children = projectNode.childNodes;

        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains('hidden')) {
                children[i].classList.remove('hidden');
            } else {
                children[i].classList.add('hidden');
            }
        }
    },
    updateInputFields: function(projectNode, title, description) {
        const children = projectNode.childNodes;

        for (let i = 0; i < children.length; i++) {
            if (children[i].tagName === 'DIV' && children[i].firstChild.classList.contains('new-title')) {
                children[i].firstChild.value = title;
            }
            if (children[i].tagName === 'DIV' && children[i].firstChild.classList.contains('new-descrip')) {
                children[i].firstChild.innerText = description;
                children[i].firstChild.value = description;
            }
        }
    },
    getTitle: function() {
        return this.newTitle.value;
    },
    getDescription: function() {
        return this.newDescription.value;
    }
}

export default domMethods;