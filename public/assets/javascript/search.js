const searchButton = document.getElementById("search_button_id");
const searchInput = document.getElementById("search_input_id");
const mainList = document.getElementById("main_list");

// 검색 버튼 클릭 시 검색 기능 수행
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase(); // 입력된 검색어를 소문자로 변환

  const listItems = mainList.querySelectorAll(".list_item"); // 모든 리스트 아이템 가져오기

  // 각 리스트 아이템에 대해 검색어와 비교하여 필터링
  listItems.forEach((item) => {
    const spans = item.querySelectorAll(".item_wrap span"); // 리스트 아이템 내의 모든 span 가져오기
    let shouldShow = false; // 아이템을 표시할지 여부를 결정하는 플래그

    spans.forEach((span) => {
      const text = span.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        shouldShow = true; // 검색어가 포함된 span이 있으면 표시할 플래그를 true로 설정
      }
    });

    // 아이템을 표시하거나 숨김 처리
    if (shouldShow) {
      item.style.display = "flex"; // 표시
    } else {
      item.style.display = "none"; // 숨김
    }
  });
});
