import signinSchema from './schema.js';
import { auth, signinSubmit } from '../../firebase/firebase.js';

const $signinForm = document.getElementById('signin-form');
const $submit = $signinForm.submit;
const schema = signinSchema;

/* -------------------------------- Function -------------------------------- */
// input요소를 클릭했을 때 스타일 변경
const signinFocus = e => {
  // console.log(e.target.name);
  document
    .getElementById(`label-${e.target.name}`)
    .classList.add('-top-1/2', 'ease-out', 'duration-200', 'font-medium');
};

// input 유효성 검사 결과에 따라 hidden 스타일을 제거
const toggleValidationResult = inputName => {
  // console.log(schema[inputName].valid);
  $signinForm
    .querySelector(`input[name=${inputName}] ~ #${inputName}-success`)
    .classList.toggle('hidden', schema[inputName].valid);

  $signinForm
    .querySelector(`input[name=${inputName}] ~ #${inputName}-error`)
    .classList.toggle('hidden', !schema[inputName].valid);
};

// 유효성 검사 실패 시 error 출력
const setErrorMessage = inputName => {
  $signinForm.querySelector(`input[name=${inputName}] ~ #${inputName}-error-msg`).textContent = schema[inputName].valid
    ? ''
    : schema[inputName].error;
};

// signin 버튼 활성화
const activateSubmitButton = () => {
  document.getElementById('submit-button').disabled = !schema.valid;
};

/**
 * 유효성 검증
 * 사용자가 입력필드에 값을 입력하면 schema의 해당 입력필드의 value(schema.<input-field-name>.value. 예를 들어 schema.userid.value)에 입력값을 할당한다.
 * 접근자 프로퍼티인 schema의 입력필드의 valid(schema.<input-field-name>.valid)를 참조하면 입력값의 유효성 검증 로직이 실행된다.
 * 접근자 프로퍼티 valid는 toggleValidationResultIcon, setErrorMessage, activateSubmitButton 함수에 의해 사용된다.
 *
 * 서로 연관이 있는 입력필드가 존재할 수 있다. 예를 들어 password가 변경되면 confirm-password의 유효성 검증이 다시 실행되어야 한다.
 * 이를 위해 입력필드의 값이 변경되면 모든 입력 필드의 입력값을 대상으로 toggleValidationResultIcon, setErrorMessage 함수를 호출해 유효성 검증을 다시 실행한다.
 * 단, 사용자가 입력필드의 값을 변경해 schema의 dirty가 true로 변경된 입력필드만 유효성 검증한다.
 * 다시 말해, 사용자가 입력필드에 값을 입력한 적이 없는 입력필드(pristine)는 유효성 검증에서 제외한다.*/

const validate = _.debounce(e => {
  const { name, value } = e.target;

  schema[name].value = value.trim();
  // 사용자가 입력필드의 값을 변경해 schema의 dirty가 true로 변경된 입력필드만 유효성 검증한다.
  schema[name].dirty = true;

  Object.keys(schema)
    .filter(name => name !== 'valid' && schema[name].dirty)
    .forEach(name => {
      toggleValidationResult(name);
      setErrorMessage(name);
    });

  activateSubmitButton();
}, 300);

// signin 버튼 클릭시 실행
const request = e => {
  e.preventDefault();

  // submit 요청의 기본 동작 제거
  // 로그인 정보 전달(????) 파이어베이스? 머랑 비교??
};

/* ------------------------------ Event handler ----------------------------- */
window.addEventListener('DOMContentLoaded', e => {
  if (JSON.stringify(localStorage.getItem('isSignin')) !== 'null') {
    location.replace('main.html');
  }
});

document.getElementById('signin-email').addEventListener('focus', e => {
  signinFocus(e);
});

document.getElementById('signin-password').addEventListener('focus', e => {
  signinFocus(e);
});

$signinForm.addEventListener('input', validate);

$signinForm.addEventListener('submit', request);

$submit.addEventListener('click', e => {
  const [$email, $password] = $signinForm;

  e.preventDefault();

  signinSubmit(auth, $email.value, $password.value);
});
