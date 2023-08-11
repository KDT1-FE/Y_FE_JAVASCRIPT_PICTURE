/**
 * 직원 정보 배열이 전달되면 #memberList 요소에 DOM을 삽입해줍니다.
 * @param {*} memberArr Member[] 배열이 필요합니다.
 */
export function memberListHTML(memberArr, more = false) {
  const memberListContainer = document.getElementById("memberList");
  if (!more) {
    memberListContainer.innerHTML = "";
  }
  memberArr.forEach((member) => {
    const memberListItem = memberListColHTML(member);
    memberListContainer.appendChild(memberListItem);
  });
}
/**
 * 직원 정보가 전달되면 html 요소를 만들어 줍니다.
 * @param {*} member Member 객체가 필요합니다.
 * @returns HTMLDivElement 가 반환 됩니다.
 */
function memberListColHTML(member) {
  // 감싸는 요소 만들기
  const memberListRow = document.createElement("div");
  memberListRow.className =
    "grid grid-cols-7 md:grid-cols-12 gap-2 py-2 text-center";
  memberListRow.id = member.id;

  // 첫 칸 만들기
  const chkboxWrap = document.createElement("div");
  chkboxWrap.className = "col-span-1";
  const chkboxInput = document.createElement("input");
  chkboxInput.type = "checkbox";
  chkboxWrap.prepend(chkboxInput);
  memberListRow.append(chkboxWrap);

  // 이미지 넣기
  const profileWrap = document.createElement("div");
  profileWrap.className = "col-span-2 md:col-span-3 aspect-square";
  const img = document.createElement("img");
  img.src = member.fileUrl;
  img.alt = member.fileName;
  profileWrap.prepend(img);
  memberListRow.append(profileWrap);

  // 이름
  const nameWrap = document.createElement("div");
  nameWrap.className = "col-span-2 md:col-span-2";
  nameWrap.innerHTML = member.fullName;
  memberListRow.append(nameWrap);
  // 이메일
  const emailWrap = document.createElement("div");
  emailWrap.className = "hidden md:block col-span-2 md:col-span-2";
  emailWrap.innerHTML = member.email;
  memberListRow.append(emailWrap);
  // 전화번호
  const phoneWrap = document.createElement("div");
  phoneWrap.className = "hidden md:block col-span-2 md:col-span-2";
  phoneWrap.innerHTML = member.phone;
  memberListRow.append(phoneWrap);
  // 직책
  const categoryWrap = document.createElement("div");
  categoryWrap.className = "col-span-2 md:col-span-2";
  categoryWrap.innerHTML = member.category;
  memberListRow.append(categoryWrap);

  return memberListRow;
}
