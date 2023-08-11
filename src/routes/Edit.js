import { Component } from '../core/component';
import { getUrlParam } from '../core/router';
import { getMemberDetail, memberStore } from '../store/memberStore';
import { storage } from '../api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default class Edit extends Component {
  async render() {
    const id = getUrlParam('id');
    await getMemberDetail(id);
    const member = memberStore.state.member;
    console.log(member);
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

    const previewImage = async (e) => {
      const storageRef = ref(storage, member.photoUrl);
      await uploadBytes(storageRef, e.currentTarget.files[0]);
      const photoUrl = await getDownloadURL(storageRef);
      const photoEdit = this.el.querySelector('.photo-edit');
      photoEdit.style.backgroundImage = `url(${photoUrl})`;
    };
    const imageFile = this.el.querySelector('.file-input');
    imageFile.addEventListener('change', previewImage);
  }
}
