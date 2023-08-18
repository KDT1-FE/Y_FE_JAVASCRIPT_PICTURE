
document.addEventListener("DOMContentLoaded", function() {
    let addButton = document.querySelector('.button--state-add');
    let deleteButton = document.querySelector('.button--state-delete');
    let deleteButton2 = document.querySelectorAll('.button--state-delete2');
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


    deleteButtons2.forEach(function(button) {
        button.addEventListener('click', function() {
            let modal = document.querySelector('.modal--delete2');
            modal.classList.remove('hidden');
        });
    });

    // // 수정 모달 보이기
    // editButtons.forEach(function(button) {
    //     button.addEventListener('click', function() {
    //         let modal = document.querySelector('.modal--edit');
    //         modal.classList.remove('hidden');
    //     });
    // });

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

