import { Component } from "../../core";
import { getMember } from "../../libraries/firebase-firestore";
import memberStore from "../../store/memberlist";

export class DetailContents extends Component {
  constructor() {
    super();
  }
  async render() {
    this.el.innerHTML = /* html */ `
      <div role="status" class="animate-pulse md:grid md:grid-cols-3 md:gap-3">
        <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
        </div>
        <div class="md:col-span-2">
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-4"></div>
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-4"></div>
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-4"></div>
          <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    `;

    await getMember(history.state.id);
    const { memberDetail } = memberStore.state;

    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.innerHTML = /* html */ `
    <div class="mb-6 md:grid md:grid-cols-3 md:gap-3">
      <div class="aspect-square">
        <img src=${memberDetail.fileUrl} alt=${memberDetail.fileName} />
      </div>
      <div class="md:col-span-2">
        <h3
          class="mb-3 mt-4 border-b-[1px] border-solid border-b-gray-600 pb-3 text-lg font-bold md:mt-0"
        >
          직원 정보
        </h3>
        <div class="columns-3 gap-3">
          <div
            class="mb-4 w-full border-b-[1px] border-solid border-b-gray-300"
          >
            <h4 class="text-md mb-2 text-gray-600">성명</h4>
            <p class="text-xl">${memberDetail.fullName}</p>
          </div>
          <div
            class="mb-4 w-full border-b-[1px] border-solid border-b-gray-300"
          >
            <h4 class="text-md mb-2 text-gray-600">직책</h4>
            <p class="text-xl">${memberDetail.category}</p>
          </div>
          <div
            class="mb-4 w-full border-b-[1px] border-solid border-b-gray-300"
          >
            <h4 class="text-md mb-2 text-gray-600">성별</h4>
            <p class="text-xl">${memberDetail.gender}</p>
          </div>
        </div>
        <div class="mb-4 border-b-[1px] border-solid border-b-gray-300">
          <h4 class="text-md mb-2 text-gray-600">이메일</h4>
          <p class="text-xl">${memberDetail.email}</p>
        </div>
        <div class="mb-4 border-b-[1px] border-solid border-b-gray-300">
          <h4 class="text-md mb-2 text-gray-600">연락처</h4>
          <p class="text-xl">${memberDetail.phone}</p>
        </div>
      </div>
    </div>
    `;
  }
}
