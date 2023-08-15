// // const openButton = document.querySelector("button");
// const addButton = document.querySelector(".button--state-add");
// // const addButton = document.querySelector(".button--state-add");
// const modifyButton = document.querySelector(".button--state-modify");
// const deleteButton = document.querySelector(".button--state-delete");
// const cancelButton = document.querySelector(".button--state-cancel");
// const modal = document.querySelector(".modal");
// const closeButton = modal.querySelector("button");
// const modalBackground = document.querySelector(".modal__background");
// // const modalBackground = modal.querySelector(".modal__background");


// function displayModal(){
//     modal.classList.toggle("hidden");
//     // modalBackground.classList.toggle("hidden"); 
// }
// // openButton.addEventListener("click", displayModal);
// addButton.addEventListener("click", displayModal);
// modifyButton.addEventListener("click", displayModal);
// cancelButton.addEventListener("click", displayModal);
// closeButton.addEventListener("click", displayModal);
// deleteButton.addEventListener("click", displayModal);
// modalBackground.addEventListener("click", displayModal)


// document.addEventListener("DOMContentLoaded", function() {
//     // 모든 수정 버튼에 이벤트 리스너 추가
//     let modifyButtons = document.querySelectorAll('.button--state-modify');
//     modifyButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             displayModal('modify');
//         });
//     });

//     // 모든 삭제 버튼에 이벤트 리스너 추가
//     let deleteButtons = document.querySelectorAll('.button--state-delete');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             displayModal('delete');
//         });
//     });

//     // ... 추가 버튼에 대한 이벤트 리스너 등도 필요합니다.

//     let modalCloses = document.querySelectorAll('.modal__close, .modal__overlay');
//     modalCloses.forEach(close => {
//         close.addEventListener('click', function() {
//             hideAllModals();
//         });
//     });
// });

// function displayModal(type) {
//     hideAllModals(); // 모든 모달을 숨기고 시작
//     let targetModal = document.querySelector(`.modal--${type}`);
//     if (targetModal) {
//         targetModal.style.display = 'block';
//     }
// }

// function hideAllModals() {
//     let allModals = document.querySelectorAll('.modal');
//     allModals.forEach(modal => {
//         modal.style.display = 'none';
//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     let addButton = document.querySelector('.button--state-add');
//     let deleteButton = document.querySelector('.button--state-delete');
//     // let deleteButton2 = document.querySelector('.button--state-delete2');
//     let editButtons = document.querySelectorAll('.button--state-edit');  // 수정 버튼
//     let cancelButtons = document.querySelectorAll('.button--state-cancel');
    
//     // 등록 모달 보이기
//     addButton.addEventListener('click', function() {
//         let modal = document.querySelector('.modal');
//         modal.classList.remove('hidden');
//     });
    
//     // 삭제 모달 보이기
//     deleteButton.addEventListener('click', function() {
//         let modal = document.querySelector('.modal--delete');
//         modal.classList.remove('hidden');
//     });


//         // // 삭제 모달 보이기
//         // deleteButton2.addEventListener('click', function() {
//         //     let modal = document.querySelector('.modal--delete2');
//         //     modal.classList.remove('hidden');
//         // });
    
//     // 수정 모달 보이기
//     editButtons.forEach(function(button) {  // 수정 버튼을 모두 선택
//         button.addEventListener('click', function() {
//             let modal = document.querySelector('.modal--edit');  // 수정을 위한 모달 선택
//             modal.classList.remove('hidden');
//         });
//     });

//     // 모든 취소 버튼에 대한 이벤트 리스너
//     cancelButtons.forEach(function(button) {
//         button.addEventListener('click', function() {
//             hideAllModals();
//         });
//     });
// });

// function hideAllModals() {
//     let modals = document.querySelectorAll('.modal');
//     modals.forEach(function(modal) {
//         modal.classList.add('hidden');
//     });
// }

document.addEventListener("DOMContentLoaded", function() {
    let addButton = document.querySelector('.button--state-add');
    let deleteButton = document.querySelector('.button--state-delete');
    let deleteButton2 = document.querySelector('.button--state-delete2');
    let editButtons = document.querySelectorAll('.button--state-edit');  // 수정 버튼
    let cancelButtons = document.querySelectorAll('.button--state-cancel');
    
    // 등록 모달 보이기
    addButton.addEventListener('click', function() {
        let modal = document.querySelector('.modal');
        modal.classList.remove('hidden');
    });
    
    // 삭제 모달 보이기
    deleteButton.addEventListener('click', function() {
        let modal = document.querySelector('.modal--delete');
        modal.classList.remove('hidden');
    });

    // 삭제 모달2 보이기
    deleteButton2.addEventListener('click', function() {
        let modal = document.querySelector('.modal--delete2');
        modal.classList.remove('hidden');
    });
    
    // 수정 모달 보이기
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let modal = document.querySelector('.modal--edit');
            modal.classList.remove('hidden');
        });
    });

    // 모든 취소 버튼에 대한 이벤트 리스너
    cancelButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            hideAllModals();
        });
    });
});

function hideAllModals() {
    let modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.classList.add('hidden');
    });
}

