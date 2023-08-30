import Header from '../components/Header';
import { Component } from '../core/component';
import { getUrlParam, navigate } from '../core/router';
import { getMemberDetail, setData, uploadImage } from '../store/memberStore';
import { existEmail, existFile, validateEmail } from '../utils/validate';

export default class Edit extends Component {
  template(member) {
    return `
    <form class="detail">
      <label for="file" class="photo-edit" style="background-image: url(https://api.iconify.design/mdi-light/image.svg?color=%23a0aec0)"></label> 
      <input type="file" name="file" id="file" accept=".jpg, .png" class="file-input"/>
      <section class='information-container edit-container'>
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
  }
  async handleSubmit(event, member) {
    let photoUrl = member.photoUrl;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      existEmail(formData.get('email')) &&
      validateEmail(formData.get('email'))
    )
      return;

    if (existFile(formData.get('file'), false)) {
      photoUrl = await uploadImage(formData.get('file'), member.photoUrl);
    }

    const data = {
      name: formData.get('name') || member.name,
      email: formData.get('email') || member.email,
      photoUrl: photoUrl,
    };

    setData(data, member.id);

    navigate();
  }

  async previewImage(event) {
    const photoEdit = this.componentRoot.querySelector('.photo-edit');
    let reader = new FileReader();
    reader.onload = (event) => {
      photoEdit.style.backgroundImage = `url(${event.currentTarget.result})`;
    };
    reader.readAsDataURL(event.currentTarget.files[0]);
  }

  setEvent(member) {
    this.addEvent('submit', '.detail', (event) => {
      this.handleSubmit(event, member);
    });
    this.addEvent('change', '.file-input', (event) => {
      this.previewImage(event);
    });
  }

  async render() {
    const member = await getMemberDetail(getUrlParam());

    if (!member) {
      return navigate('/not-found');
    } // 해당 아이디를 가진 멤버가 존재하지 않을 때

    this.componentRoot.innerHTML = this.template(member);
    this.componentRoot.prepend(new Header().componentRoot);
    this.setEvent(member);
  }
}
