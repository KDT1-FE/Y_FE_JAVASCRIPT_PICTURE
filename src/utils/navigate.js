/**
 * @param  { string } to
 * @param  { boolean } isReplace
 */

// CustomEvent와 dispatchEvent로 navigate 함수가 호출 될 때
// History가 변경될 것임을 알림
const navigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      // 이동하게 될 URL
      to,
      // History 스택에 추가할 건지, 대체할 건지 여부
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export default navigate;
