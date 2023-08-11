import { Component } from '../core/component';
import { routeRender } from '../core/router';
import { uploadData, uploadImage } from '../store/memberStore';
import { v4 as uuidv4 } from 'uuid';

export default class Write extends Component {
  render() {
    this.el.innerHTML = `
    <header class="header">
    <div class="title">직원 관리 시스템</div></header>
    <section class="write-title">
    직원을 등록해주세요
    </section>
    <form class="write-container" id='form'>
    <input class="write-name" placeholder="이름을 입력해주세요" name="name"/>
    <input class="write-email" placeholder="이메일을 입력해주세요" name="email"/>
    <div class="image-container">
    <input class="write-image" value='' placeholder="이미지를 첨부해주세요" disabled>
    <label for="file" class="file-label">파일 선택</label> 
    <input type="file" name="file" id="file" accept=".jpg, .png" class="file-input">
    </div>
    <button class="add-member" type="submit">등록</button>
    </form>
        `;

    const imageFile = this.el.querySelector('.file-input');
    const writeImage = this.el.querySelector('.write-image');
    imageFile.addEventListener('change', () => {
      writeImage.value = imageFile.value;
    });
    const form = this.el.querySelector('.write-container');

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      if (
        formData.get('file').name === '' ||
        formData.get('name') === '' ||
        formData.get('email') === ''
      ) {
        alert('모든 값을 입력해주세요');
        return;
      } //submit을 누르면  모두 입력이 되었는 지 확인

      const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (!emailRegex.test(formData.get('email'))) {
        alert('이메일 형식을 지켜주세요');
        return;
      } // 이메일 형식을 확인

      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
      };
      const fileData = formData.get('file');

      const photoUrl = await uploadImage(fileData, uuidv4());
      data.photoUrl = photoUrl;
      await uploadData(data);

      window.history.pushState(null, null, '/');
      routeRender(); // 메인 페이지로 이동
    }; // submit을 누르면  모두 입력이 되었는 지 확인

    form.addEventListener('submit', handleSubmit);
  }
}
