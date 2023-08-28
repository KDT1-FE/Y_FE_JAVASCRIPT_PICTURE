import { Component } from "../../core";
import createUser from "../../js/createUser";
import inputValidate from "../../js/inputValidate";
import memberStore from "../../store/memberlist";
import CreateInput from "./CreateInput";
import CreateSelc from "./CreateSelc";

export default class CreateContents extends Component {
  constructor({ props }) {
    super({
      props: {
        mode: props.mode,
        memberDetail: props.memberDetail ?? {},
      },
    });
  }
  async render() {
    const form = document.createElement("form");
    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.id = "create-contents";
    form.className = "md:grid md:grid-cols-2 md:gap-3";
    form.method = "dialog";
    form.innerHTML = /* html */ `
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
        <div class="w-[200px] relative ${
          this.props?.memberDetail.fileUrl ? "aspect-square" : ""
        }" id="img-thumb">
          ${
            this.props?.memberDetail.fileUrl
              ? `<img src="${this.props?.memberDetail.fileUrl}" />`
              : ""
          }
          <div class="layer absolute top-0 left-0 p-2 w-full h-full ${
            this.props?.memberDetail.fileUrl ? "flex" : "hidden"
          } transition-opacity duration-300 justify-end items-start">
            <div id="modifyBtn" class="w-[64px] py-1.5 mr-2 text-center rounded-md cursor-pointer text-gray-800 bg-gray-200 ${
              this.props.mode === "update" && "hidden"
            }"><span class="material-icons md-18 align-middle">edit</span> 수정</div>
            <div id="deleteBtn" class="w-[64px] py-1.5 text-center rounded-md cursor-pointer text-white bg-red-600"><span class="material-icons md-18 align-middle">delete</span> 삭제</div>
          </div>
        </div>
      </div>
    </div>
    `;
    const NameInput = new CreateInput({
      props: {
        label: "성명",
        name: "fullName",
        holder: "이름을 입력해주세요",
        memberDetail: this.props?.memberDetail,
      },
    }).el;
    const SelcWrap = document.createElement("div");
    SelcWrap.className = "flex gap-2";
    const GenderSelc = new CreateSelc({
      props: {
        label: "성별",
        name: "gender",
        options: [
          { value: "none", text: "선택안함" },
          { value: "male", text: "남성" },
          { value: "female", text: "여성" },
        ],
        memberDetail: this.props?.memberDetail,
      },
    }).el;
    const CategorySelc = new CreateSelc({
      props: {
        label: "직책",
        name: "category",
        options: [
          { value: "CEO", text: "CEO" },
          { value: "Manager", text: "Manager" },
          { value: "Senior", text: "Senior" },
          { value: "Junior", text: "Junior" },
        ],
        memberDetail: this.props?.memberDetail,
      },
    }).el;
    SelcWrap.append(GenderSelc, CategorySelc);
    const EmailInput = new CreateInput({
      props: {
        label: "이메일",
        name: "email",
        holder: "이메일 주소를 입력해주세요",
        memberDetail: this.props?.memberDetail,
      },
    }).el;
    const PhoneInput = new CreateInput({
      props: {
        label: "연락처",
        name: "phone",
        holder: "연락처를 입력해주세요",
        memberDetail: this.props?.memberDetail,
      },
    }).el;
    const SubmitBtn = document.createElement("button");
    SubmitBtn.className =
      "col-span-2 w-full rounded-md bg-blue-600 p-3 text-white disabled:opacity-75 disabled:cursor-not-allowed";
    SubmitBtn.type = "submit";
    SubmitBtn.innerText = "추가 완료";
    form.append(NameInput, SelcWrap, EmailInput, PhoneInput, SubmitBtn);
    this.el.append(form);

    createUser(this.el)(this.props.mode);
    inputValidate(this.el)();

    const modifyBtn = this.el.querySelector("#modifyBtn");
    const deleteBtn = this.el.querySelector("#deleteBtn");

    modifyBtn.addEventListener("click", () => {
      const imageEditorModal = document.getElementById("ImageEditorModal");
      imageEditorModal.showModal();
    });
    deleteBtn.addEventListener("click", () => {
      const thumb = document.getElementById("img-thumb");
      thumb.querySelector("img").remove();
      thumb.querySelector(".layer").classList.add("hidden");
      thumb.classList.remove("aspect-square");
      memberStore.state.file = undefined;
    });
  }
}
