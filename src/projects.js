// tasks.js --> projects.js, display.js, index.js ?

const createProject = (title, description) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const changeTitle = (newTitle) => title = newTitle;
    const changeDescription = (newDescription) => description = newDescription;
    // const printTitle = () => console.log(`Project Title: ${title}`);
    const tasks = [];
    const getTasks = () => tasks;
    const addTask = (name) => tasks.push(/*Task.createTask(*/name/*)*/);
    const removeTask = (index) => tasks.splice(index, 1);
    return { getTitle, getDescription, changeTitle, changeDescription, getTasks, addTask, removeTask };
};

export { createProject };