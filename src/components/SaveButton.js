import { createData, updateData } from '../firebase/data.js';

export default class SaveButton {
  constructor(type, id) {
    this.el = document.createElement('button');
    this.type = type;
    this.id = id;
    this.render();
  }
  render() {
    this.el.classList.add('btn', 'save', this.type);
    this.el.innerText = '저장';

    // 새로 생성
    if (this.type === 'create') {
      this.el.addEventListener('click', () => {
        const msg = checkInfo();
        const newInfo = setInfo();
        if (msg === '성공') {
          alert(`${newInfo.name}을(를) 새로운 멤버로 등록했어요!`);
          createData(newInfo);
          closeModal();
        } else {
          alert(msg);
        }
      });
    }

    // 업데이트
    if (this.type === 'update') {
      this.el.addEventListener('click', () => {
        const msg = checkInfo();
        const newInfo = setInfo();
        if (msg === '성공') {
          alert(`${newInfo.name}의 정보를 성공적으로 변경하였어요.`);
          updateData(this.id, newInfo);
          closeModal();
        } else {
          alert(msg);
        }
      });
    }
  }
}

const checkInfo = () => {
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const department = document.querySelector('select[name="department"]').value;

  if (!name) return '이름을 입력해주세요!';
  if (!/^01\d{1}-?\d{4}-?\d{4}$/.test(phone))
    return '010을 포함한 휴대폰 번호 11자리를 모두 입력해주세요.';
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      email
    )
  )
    return '이메일 정보를 확인해주세요';
  if (!department) return '부서를 선택해주세요!';
  else {
    return '성공';
  }
};

const setInfo = () => {
  const newInfo = {};
  // image
  const infoImg = document.querySelector('.info_img img');
  newInfo['photo'] = infoImg.src;

  // text
  let infoTxt = document.querySelectorAll('.info_txt > *');
  infoTxt.forEach((input) => {
    if (input.name === 'phone') {
      if (input.value.length == 11) {
        newInfo[input.name] =
          input.value.substring(0, 3) +
          '-' +
          input.value.substring(3, 7) +
          '-' +
          input.value.substring(7);
      }
    } else {
      newInfo[input.name] = input.value;
    }
  });

  return newInfo;
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.remove();
};
