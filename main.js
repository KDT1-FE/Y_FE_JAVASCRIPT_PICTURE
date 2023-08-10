const list  = document.getElementById('list');
const btn1 = document.getElementById('nav-btn1');


let staffs = [];

btn1.addEventListener('click',createNewStaff);

function createNewStaff () {
     const item = {
        id: new DataTransfer().getTime(),
        text: "",
        complete:false

     }

     createStaffElemnt();
   
}
function createStaffElemnt(item) {
    const itemEl = document.createElement('div')
    
}