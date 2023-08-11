let soldierDummy = [
  {
    이름: "윤석민",
    부서: "지휘부",
    직급: "여단장",
    생년월일: "1998.07.13",
    사진: "assets/images/0.jpg",
  },
  {
    이름: "손흥민",
    부서: "지휘부",
    직급: "1대대장",
    생년월일: "1992.07.08",
    사진: "assets/images/1.jpg",
  },
  {
    이름: "김민재",
    부서: "지휘부",
    직급: "2대대장",
    생년월일: "1996.11.15",
    사진: "assets/images/2.jpg",
  },
  {
    이름: "이강인",
    부서: "지휘부",
    직급: "3대대장",
    생년월일: "2001.02.19",
    사진: "assets/images/3.jpg",
  },
  {
    이름: "황희찬",
    부서: "지휘부",
    직급: "4대대장",
    생년월일: "1996.01.26",
    사진: "assets/images/4.jpg",
  },
  {
    이름: "황의조",
    부서: "작전과",
    직급: "작전과장",
    생년월일: "1992.08.28",
    사진: "assets/images/5.jpg",
  },
  {
    이름: "김진수",
    부서: "작전과",
    직급: "작전장교",
    생년월일: "1992.06.13",
    사진: "assets/images/6.jpg",
  },
  {
    이름: "엄원상",
    부서: "작전과",
    직급: "작전병",
    생년월일: "1999.01.06",
    사진: "assets/images/7.jpg",
  },
  {
    이름: "황인범",
    부서: "인사과",
    직급: "인사과장",
    생년월일: "1996.09.20",
    사진: "assets/images/8.jpg",
  },
  {
    이름: "정우영",
    부서: "인사과",
    직급: "인사장교",
    생년월일: "1989.12.14",
    사진: "assets/images/9.jpg",
  },
  {
    이름: "홍정호",
    부서: "인사과",
    직급: "인사행정병",
    생년월일: "1989.08.12",
    사진: "assets/images/10.jpg",
  },
  {
    이름: "박지성",
    부서: "본부중대",
    직급: "본부중대장",
    생년월일: "1981.02.25",
    사진: "assets/images/11.jpg",
  },
  {
    이름: "차범근",
    부서: "본부중대",
    직급: "본부행정보급관",
    생년월일: "1953.05.22",
    사진: "assets/images/12.jpg",
  },
  {
    이름: "세징야",
    부서: "본부중대",
    직급: "본부1분대장",
    생년월일: "1989.11.29",
    사진: "assets/images/13.jpg",
  },
  {
    이름: "제르소",
    부서: "본부중대",
    직급: "본부2분대장",
    생년월일: "1991.02.23",
    사진: "assets/images/14.jpg",
  },
  {
    이름: "조현우",
    부서: "통신중대",
    직급: "통신중대장",
    생년월일: "1991.09.25",
    사진: "assets/images/15.jpg",
  },
  {
    이름: "이천수",
    부서: "통신중대",
    직급: "통신행정보급관",
    생년월일: "1981.07.09",
    사진: "assets/images/16.jpg",
  },
  {
    이름: "구스타보",
    부서: "통신중대",
    직급: "통신1분대장",
    생년월일: "1994.03.29",
    사진: "assets/images/17.jpg",
  },
  {
    이름: "바코",
    부서: "통신중대",
    직급: "통신2분대장",
    생년월일: "1993.01.29",
    사진: "assets/images/18.jpg",
  },
];

const container = document.querySelector(".soldier-container");
const deleteButton = document.getElementById("delete-soldier");
let deleteMode = false;
const selectedIndexes = [];

const deleteModeButton = document.querySelectorAll(".delete-mode-buttons");
const selectedSoldiers = document.querySelectorAll(".selected");
const deleteCancelButtons = document.querySelectorAll(".delete-cancel");

// 데이터를 HTML 요소로 painting하는 함수
const paintSoldierElement = () => {
  soldierDummy.forEach((soldier, index) => {
    const soldierDiv = document.createElement("div");
    soldierDiv.classList.add("soldier");

    soldierDiv.addEventListener("click", () => {
      if (deleteMode) {
        if (soldierDiv.classList.contains("selected")) {
          soldierDiv.classList.remove("selected");
          const selectedIndex = selectedIndexes.indexOf(index);
          if (selectedIndex !== -1) {
            selectedIndexes.splice(selectedIndex, 1);
          }
        } else {
          soldierDiv.classList.add("selected");
          selectedIndexes.push(index);
        }
      }
    });
    const soldierPhotoDiv = document.createElement("div");
    soldierPhotoDiv.classList.add("soldier-photo");
    if (soldier.사진) {
      const img = document.createElement("img");
      img.src = soldier.사진;
      soldierPhotoDiv.appendChild(img);
    }
    soldierDiv.appendChild(soldierPhotoDiv);

    const soldierInfoDiv = document.createElement("div");
    soldierInfoDiv.classList.add("soldier-info");
    for (const key in soldier) {
      if (key === "사진") break;
      const itemDiv = document.createElement("div");
      itemDiv.classList.add(key.toLowerCase());
      itemDiv.textContent =
        key === "이름"
          ? soldier[key]
            ? soldier[key]
            : "공석"
          : key + ": " + soldier[key];
      soldierInfoDiv.appendChild(itemDiv);
    }
    soldierDiv.appendChild(soldierInfoDiv);

    container.appendChild(soldierDiv);
  });
};
paintSoldierElement();

const handleDeleteModeOff = () => {
  deleteMode = false;
  selectedIndexes.length = 0;
  deleteModeButton.forEach((item) => {
    item.classList.add("hidden");
  });
  deleteButton.className = "delete-off";
  deleteButton.innerText = "장병 삭제";
  deleteButton.id = "delete-soldier";
  const selectedSoldiers = document.querySelectorAll(".selected");
  selectedSoldiers.forEach((soldier) => {
    soldier.classList.remove("selected");
  });
};

const handleDeleteModeOn = () => {
  deleteMode = true;
  deleteButton.innerHTML = "삭제";
  deleteButton.className = "delete-on";
  deleteButton.id = "delete-confirm";
  deleteModeButton.forEach((item) => {
    item.classList.remove("hidden");
  });
};

const handleDeleteSoldiers = () => {
  // 선택된 장병 공석으로 변경
  selectedIndexes.sort((a, b) => b - a); // 뒤에서부터 삭제해야 인덱스가 꼬이지 않음
  selectedIndexes.forEach((index) => {
    soldierDummy[index].이름 = "";
    if (soldierDummy[index].사진) soldierDummy[index].사진 = "";
  });

  // 선택 해제
  selectedIndexes.length = 0;
  const selectedSoldiers = document.querySelectorAll(".selected");
  selectedSoldiers.forEach((soldier) => {
    soldier.classList.remove("selected");
  });
  // 장병 목록 다시 그리기
  container.innerHTML = "";
  paintSoldierElement();
};

deleteButton.addEventListener("click", () => {
  if (deleteMode) {
    handleDeleteSoldiers();
    handleDeleteModeOff();
  } else {
    handleDeleteModeOn();
  }
});

deleteCancelButtons.forEach((item) => {
  item.addEventListener("click", () => {
    handleDeleteModeOff();
  });
});

const deleteConfirmButtons = document.querySelectorAll("#delete-confirm");
deleteConfirmButtons.forEach((item) => {
  item.addEventListener("click", () => {
    handleDeleteSoldiers();
    handleDeleteModeOff();
  });
});
