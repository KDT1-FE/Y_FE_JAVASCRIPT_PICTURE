/**
 * Sorts a HTML table.
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending (오름차순)
 */

/*
const list = document.querySelector("#sortList");
const listHeaders = document.querySelectorAll("#sortList th");

listHeaders.forEach(listHeader => {
  listHeader.addEventListener("click", () => {
    // Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를
    // 얕게 복사해 새로운 Array 객체를 만듭니다.
    // 정적 메소드 indexOf는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환
    const columnIndex = Array.from(listHeaders).indexOf(listHeader);
    // classList.contains()는 클래스 이름 포함 여부를 나타낸다.
    const currentSortTypeIsAsc = listHeader.classList.contains("th-sort-asc");

    sortTableByColumn(list, columnIndex, !currentSortTypeIsAsc);
  });
});

function sortTableByColumn(table, columnIdx, asc = true) {
  // HTMLTableElement.tBodies 는 <table>안 <tbody>의 모든 요소들을 가져온다.
  const tBody = table.tBodies[0];

  // Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를
  // 얕게 복사해 새로운 Array 객체를 만듭니다.
  const rows = Array.from(tBody.querySelectorAll("tr"));
  // console.log(rows); // [tr, tr, tr, tr]

  // asc(내림차순)가 참이면 1 아니면 -1 (오름차순)
  const sortType = asc ? 1 : -1;

  // 각 행 정렬하기
  // sort(compareFunction) 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환
  // 각 행마다 동일한 열의 데이터를 비교
  const sortedRows = rows.sort((rowA, rowB) => {
    // trim() 메서드는 문자열 양 끝의 공백을 제거하고 원본 문자열을 수정하지 않고 새로운 문자열을 반환합니다
    const rowAColData = rowA
      .querySelector(`td:nth-child(${columnIdx + 1})`)
      .textContent.trim();
    const rowBColData = rowB
      .querySelector(`td:nth-child(${columnIdx + 1})`)
      .textContent.trim();

    return rowAColData > rowBColData ? 1 * sortType : -1 * sortType;
  });

  // 기존 테이블 리스트 remove
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }
  // 새롭게 정렬한 리스트 append
  tBody.append(...sortedRows);

  // listHeaders의 정렬 상태 기억해두기
  table
    .querySelectorAll("th")
    .forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${columnIdx + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${columnIdx + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}
*/
