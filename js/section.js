// const list = document.getElementById('list');
// let profile = [];

// createBtn.addEventListener('click', createNewTodo);

// function createNewTodo() {
//     // 새로운 아이템 객체 생성
//     const item = {
//         id: new Date().getTime(),
//         text: "",
//         complete: false
//     }

//     // 배열에 처음에 새로운 아이템을 추가
//     todos.unshift(item)

//     // 요소 생성하기 
//     const { itemEl, inputEl } = createTodoElement(item);

//     list.prepend(itemEl);

//     saveToLocalStorage()

// }

// function createTodoElement(item) {

//     const itemEl = document.createElement('div');
//     itemEl.classList.add('item');

//     const checkboxEl = document.createElement('input');
//     checkboxEl.type = 'checkbox';
//     checkboxEl.checked = item.complete;


//     if (item.complete) {
//         itemEl.classList.add('complete');
//     }

//     const inputEl = document.createElement('input');
//     inputEl.type = 'text';
//     inputEl.value = item.text;
//     inputEl.setAttribute('disabled', "");

//     const actionsEl = document.createElement('div');
//     actionsEl.classList.add('actions');

//     const editBtnEl = document.createElement('button');
//     editBtnEl.classList.add('material-icons');
//     editBtnEl.innerText = 'edit';

//     const removeBtnEl = document.createElement('button');
//     removeBtnEl.classList.add('material-icons', 'remove-btn');
//     removeBtnEl.innerText = 'remove_circle';

//     //Events
//     checkboxEl.addEventListener('change',()=>{
//         item.complete = checkboxEl.checked
//         if(item.complete){
//             itemEl.classList.add('complete')
//         }else{
//             itemEl.classList.remove('complete')
//         }
//         saveToLocalStorage()
//     })
    
//     inputEl.addEventListener('input',()=>{
//         item.text = inputEl.value
//     })

//     inputEl.addEventListener('blur',()=>{
//         inputEl.setAttribute('disabled',"")
//         saveToLocalStorage()
//     })

//     editBtnEl.addEventListener('click',() => {
//         inputEl.removeAttribute('disabled')
//         inputEl.focus()
//         saveToLocalStorage()
//     })

//     removeBtnEl.addEventListener('click',()=>{
//         todos=todos.filter(t => t.id !== item.id)
//         itemEl.remove()
//     })

//     actionsEl.append(editBtnEl);
//     actionsEl.append(removeBtnEl);

//     itemEl.append(checkboxEl);
//     itemEl.append(inputEl);
//     itemEl.append(actionsEl);

//     return { itemEl, inputEl, editBtnEl, removeBtnEl }

// }

// function displayTodos(){
//     // localStorage에서 todos 데이터 가져오기
//     loadFromLocalStorage()
//     for(let i=0;i<todos.length;i++){
//         const item = todos[i]

//         // list item 요소 생성
//         const {itemEl} = createTodoElement(item)

//         // list div 안에 추가
//         list.append(itemEl)
//     }
// }

// displayTodos()

// function saveToLocalStorage(){
//     const data = JSON.stringify(todos)
//     localStorage.setItem('my_todos', data)
// }

// function loadFromLocalStorage(){
//     const data = localStorage.getItem('my_todos')

//     if(data){
//         todos = JSON.parse(data)
//     }
// }