import { Component } from "../../core";
import { searchFormIsEmpty } from "../../js/validate";
import { getSearchedMember } from "../../libraries/firebase-firestore";
import memberStore from "../../store/memberlist";

export class HomeSearch extends Component {
  render() {
    this.el.className = "inner mb-3 rounded-xl bg-white p-3 drop-shadow-xl";
    this.el.innerHTML = /* html */ `
      <form id="searchForm">
        <h3 class="mb-3 text-xl font-bold">
          <span class="material-icons align-middle"> search </span> 검색
        </h3>
        <div>
          <h3 class="text-md mb-2 text-gray-500">직책</h3>
          <div class="mb-4 flex flex-wrap">
            <div>
              <input
                type="checkbox"
                name="category"
                value="CEO"
                id="category1"
              />
              <label for="category1" class="mr-3">CEO</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="category"
                value="Manager"
                id="category2"
              />
              <label for="category2" class="mr-3">Manager</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="category"
                value="Senior"
                id="category3"
              />
              <label for="category3" class="mr-3">Senior</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="category"
                value="Junior"
                id="category4"
              />
              <label for="category4" class="mr-3">Junior</label>
            </div>
          </div>
          <h3 class="text-md mb-2 text-gray-500">성별</h3>
          <div class="mb-4 flex flex-wrap">
            <div>
              <input
                type="checkbox"
                name="gender"
                value="none"
                id="gender1"
              />
              <label for="gender1" class="mr-3">선택안함</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="gender"
                value="male"
                id="gender2"
              />
              <label for="gender2" class="mr-3">남성</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="gender"
                value="female"
                id="gender3"
              />
              <label for="gender3" class="mr-3">여성</label>
            </div>
          </div>
          <h3 class="text-md mb-2 text-gray-500">검색어</h3>
          <div class="mb-4">
            <input
              type="text"
              name="keywords"
              placeholder="이름 또는 이메일로 검색"
              class="w-full rounded-md border-[1px] border-gray-200 px-4 py-2"
            />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <button type="reset" class="rounded-md bg-gray-200 p-3">
            <span class="material-icons align-top"> refresh </span>초기화
          </button>
          <button
            type="submit"
            class="col-span-2 rounded-md bg-blue-600 p-3 text-white"
          >
            <span class="material-icons align-top"> person_search </span>
            검색하기
          </button>
        </div>
      </form>
    `;

    let searchOptions = {};
    const searchForm = this.el.querySelector("#searchForm");

    const io = new IntersectionObserver(async (entries) => {
      // intersectionRatio가 0일 때는 아무것도 하지 않는다.
      if (entries[0].intersectionRatio <= 0) return;
      // lastKey 가 없으면 로드할것이 없다는 뜻이므로 더이상 로드 하지 않는다.
      if (memberStore.state.lastScrollKey === "") return;
      await getSearchedMember(searchOptions, memberStore.state.lastScrollKey);
    });

    // 다른 페이지로 이동하면 observe를 중지합니다.
    window.addEventListener("popstate", () => {
      io.unobserve(document.querySelector(".ems-footer"));
    });

    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const category = Array.from(
        searchForm.querySelectorAll("input[name='category']:checked"),
      ).map((el) => el.value);
      const gender = Array.from(
        searchForm.querySelectorAll("input[name='gender']:checked"),
      ).map((el) => el.value);
      const pattern = new RegExp(
        `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
      );
      const field = pattern.test(searchForm.keywords.value)
        ? "email"
        : "fullName";

      searchOptions = {
        category:
          category.length > 0
            ? category
            : ["CEO", "Manager", "Senior", "Junior"],
        gender: gender.length > 0 ? gender : ["none", "male", "female"],
        field,
        keywords: searchForm.keywords.value,
      };
      await getSearchedMember(searchOptions, undefined, true);
    });
    searchForm.dispatchEvent(new Event("submit"));
    // 맨 마지막 요소를 주시하고 있는다.
    io.observe(document.querySelector(".ems-footer"));
  }
}
