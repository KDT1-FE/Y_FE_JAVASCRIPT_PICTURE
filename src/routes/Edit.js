import { Component } from '../core/component';
import { getUrlParam, routeRender } from '../core/router';
import {
  getMemberDetail,
  memberStore,
  setData,
  uploadImage,
} from '../store/memberStore';

export default class Edit extends Component {
  async render() {
    const id = getUrlParam('id');
    await getMemberDetail(id);
    const member = memberStore.state.member;
    let photoUrl = member.photoUrl;
    let imageLoading = false;
    this.el.innerHTML = `
    <header class="header">
  <div class="title">직원 관리 시스템</div></header>
  <form class="detail">
    <label for="file" class="photo-edit" style="background-image: url(https://api.iconify.design/mdi-light/image.svg?color=%23a0aec0)"></label> 
    <input type="file" name="file" id="file" accept=".jpg, .png" class="file-input"/>
    <section class='information-container'>
      <section class='information-title'>
      정보를 수정해주세요
      </section>
      <p class='information'>
        <span class='detail-category'>NAME</span>
        <input class="detail-value edit-name" placeholder="${member.name}" name="name" />
      </p>
      <p class='information'>
        <span class='detail-category'>EMAIL</span>
        <input class="detail-value edit-email" placeholder="${member.email}" name="email"/>
      </p>
      <button class="editButton" type="submit">완료</button>
    </section>

  </form> 
    `;

    const previewImage = async (event) => {
      imageLoading = true; // 이미지 미리보기전에 submit 방지
      photoUrl = await uploadImage(
        event.currentTarget.files[0],
        member.photoUrl
      );
      const photoEdit = this.el.querySelector('.photo-edit');
      photoEdit.style.backgroundImage = `url(${photoUrl})`; // 미리보기
      imageLoading = false;
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (imageLoading) {
        alert('이미지 로딩 후 완료 버튼을 클릭해주세요');
        return;
      } // 이미지 미리보기전에 submit 방지
      const formData = new FormData(event.currentTarget);

      const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (
        formData.get('email') !== '' &&
        !emailRegex.test(formData.get('email'))
      ) {
        alert('이메일 형식을 지켜주세요');
        return;
      } // 이메일을 바꿨는데 형식을 안 지킬때

      const data = {
        name: formData.get('name') === '' ? member.name : formData.get('name'),
        email:
          formData.get('email') === ''
            ? member.email
            : FormDataEvent.get('email'),
        photoUrl: photoUrl,
      };

      await setData(data, member.id);

      window.history.pushState(null, null, '/');
      routeRender(); // 메인 페이지로 이동
    };
    const imageFile = this.el.querySelector('.file-input');
    const form = this.el.querySelector('.detail');
    imageFile.addEventListener('change', previewImage);
    form.addEventListener('submit', handleSubmit);
  }
}
