import {
  getMemberList,
  getSearchedMember,
} from "../libraries/firebase-firestore";
import { memberListHTML } from "./memberList";
import { searchFormIsEmpty } from "./validate";

/**
 * 검색 기능을 구현 하기 위한 함수 입니다.
 * @param {*} element 검색 폼으로 사용할 요소의 id, className,.. 을 전달합니다.
 * @returns init function, searchForm element
 */
export function SearchForm(element, userDetailModal) {
  const searchForm = document.querySelector(element);
  let members = [];
  let lastScrollKey = null;
  let searchOptions = {};

  const io = new IntersectionObserver((entries) => {
    // intersectionRatio가 0일 때는 아무것도 하지 않는다.
    if (entries[0].intersectionRatio <= 0) return;
    // lastKey 가 없으면 로드할것이 없다는 뜻이므로 더이상 로드 하지 않는다.
    if (lastScrollKey === "") return;
    if (searchFormIsEmpty(searchForm)) {
      getMemberList(lastScrollKey).then((data) => {
        memberListHTML(data.memberArr, true);
        members = [...members, ...data.memberArr];
        lastScrollKey = data.lastKey;
      });
    } else {
      getSearchedMember(searchOptions, lastScrollKey).then((data) => {
        memberListHTML(data.memberArr, true);
        members = [...members, ...data.memberArr];
        lastScrollKey = data.lastKey;
      });
    }
  });

  return {
    init() {
      searchForm.addEventListener("submit", (e) => {
        // 새로고침은 막기
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

        // 검색 폼에 아무 값이 없으면
        if (searchFormIsEmpty(searchForm)) {
          // firestore로 부터 데이터 받아오고 리스트로 표현하기 (비동기로 즉시 실행)
          (async () => {
            const { memberArr, lastKey } = await getMemberList();
            memberListHTML(memberArr);
            members = [...memberArr];
            lastScrollKey = lastKey;
          })();
        } else {
          (async () => {
            const { memberArr, lastKey } = await getSearchedMember(
              searchOptions,
            );
            memberListHTML(memberArr);
            members = [...memberArr];
            lastScrollKey = lastKey;
          })();
        }
        // 맨 마지막 요소를 주시하고 있는다.
        io.observe(document.querySelector(".footer"));
      });

      // 직원 상세보기 모달 클릭했을때 내용 넣기
      userDetailModal.addEventListener("clickDetailModal", (event) => {
        const detail = members.find((member) => member.id === event.detail);
        const profile = userDetailModal.querySelector("#detail-profile");
        const name = userDetailModal.querySelector("#detail-name");
        const email = userDetailModal.querySelector("#detail-email");
        const phone = userDetailModal.querySelector("#detail-phone");
        const category = userDetailModal.querySelector("#detail-category");
        profile.src = detail.fileUrl;
        profile.alt = detail.fileName;
        name.innerText = detail.fullName;
        email.innerText = detail.email;
        phone.innerText = detail.phone;
        category.innerText = detail.category;
      });
    },
    searchForm,
  };
}
