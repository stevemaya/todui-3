const readline = require('readline');
const data = require('./data.js');


const todos = data.todos;

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.

`;

const add = function (userInput) {
  const todo = {
    text: userInput,
    isComplete: false,
    priority: 2,
  };
  todos.unshift(todo);
  display();
  interface.question(menu, handleMenu);
};

const display = () => {
  console.clear();
  console.log("Your todos are:");
  for (let i = 1; i < todos.length; i++) {
    console.log(`${i}. ${todos[i].text}`);
  }
};

const remove = (selection) => {
  const num = selection;
  todos.splice(num, 1);
  display();
  interface.question(menu, handleMenu);
};

const handleMenu = cmd => {
  switch (cmd) {
    case '1':
      console.clear();
      interface.question('What should go on your todo list?\n\n', add);
      break;
    case '2':
      console.clear();
      display();
      interface.question('Which todo do you want to remove?\n\n', remove);
      break;
    case '3':
    case '4':
    case '5':
      console.clear();
      console.log(`Feature ${cmd} is still under construction. Sorry!`);
      console.log('Type 6 to quit!');
      interface.question(menu, handleMenu);
      break;
    case '6':
      console.log('Quitting!');
      interface.close();
      break;
  };
};


console.clear();
display();
interface.question(menu, handleMenu);