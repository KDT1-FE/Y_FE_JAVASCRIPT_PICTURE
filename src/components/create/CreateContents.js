import { Component } from "../../core";
import createUser from "../../js/createUser";
import inputValidate from "../../js/inputValidate";

export default class CreateContents extends Component {
  render() {
    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.id = "create-contents";
    this.el.innerHTML = /* html */ `
    <form method="dialog" class="md:grid md:grid-cols-2 md:gap-3">
      <div class="mb-4">
        <h4 class="mb-2">프로필 사진</h4>
        <div
          id="drop_zone"
          class="flex h-[200px] items-center rounded-md border-2 border-dashed border-gray-200 text-center"
        >
          <div class="w-full">
            <span class="material-icons"> cloud_upload </span><br />
            <p class="mb-3 text-gray-500">파일을 이곳으로 드래그 해주세요</p>
            <label
              for="fileUpload"
              class="choose-file inline-block cursor-pointer bg-blue-600 p-3 text-white"
            >
              파일 선택
            </label>
            <input
              type="file"
              class="hidden w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
              id="fileUpload"
              name="file"
            />
          </div>
        </div>
      </div>
      <div class="mb-4">
        <h4 class="mb-2">업로드 미리보기</h4>
        <div class="flex justify-center">
          <div class="h-[200px] aspect-square relative" id="img-thumb">
            <div class="layer absolute top-0 left-0 p-2 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-end items-start">
              <div id="modifyBtn" class="w-[64px] py-1.5 mr-2 text-center rounded-md cursor-pointer text-gray-800 bg-gray-200"><span class="material-icons md-18 align-middle">edit</span> 수정</div>
              <div id="deleteBtn" class="w-[64px] py-1.5 text-center rounded-md cursor-pointer text-white bg-red-600"><span class="material-icons md-18 align-middle">delete</span> 삭제</div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <h4 class="mb-2">성명</h4>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          name="fullName"
          class="w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
          autocomplete="off"
        />
        <p id="fullNameMessage" class="py-2 h-8 text-red-500"></p>
      </div>
      <div class="flex gap-2">
        <div class="w-full">
          <h4 class="mb-2">성별</h4>
          <select name="gender" id="" class="w-full py-2">
            <option value="none">선택안함</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div class="w-full">
          <h4 class="mb-2">직책</h4>
          <select name="category" id="" class="w-full py-2">
            <option value="CEO">CEO</option>
            <option value="Manager">Manager</option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
          </select>
        </div>
      </div>
      <div class="">
        <h4 class="mb-2">이메일</h4>
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          name="email"
          class="w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
          autocomplete="off"
        />
        <p id="emailMessage" class="py-2 h-8 text-red-500"></p>
      </div>
      <div class="">
        <h4 class="mb-2">연락처</h4>
        <input
          type="text"
          placeholder="연락처를 입력해주세요"
          name="phone"
          class="w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
          autocomplete="off"
        />
        <p id="phoneMessage" class="py-2 h-8 text-red-500"></p>
      </div>
      <button
        type="submit"
        class="col-span-2 w-full rounded-md bg-blue-600 p-3 text-white disabled:opacity-75 disabled:cursor-not-allowed"
      >
        추가 완료
      </button>
    </form>
    `;

    createUser(this.el)();
    inputValidate(this.el)();

    const modifyBtn = this.el.querySelector("#modifyBtn");
    const deleteBtn = this.el.querySelector("#deleteBtn");

    modifyBtn.addEventListener("click", () => {
      const imageEditorModal = document.getElementById("ImageEditorModal");
      imageEditorModal.showModal();
    });
    deleteBtn.addEventListener("click", () => {});
  }
}
