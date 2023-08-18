import { AccessKeyId } from "./aws_functions.js";
import { SecretAccessKey } from "./aws_functions.js";

const list = document.getElementById("list");
const btn1 = document.getElementById("nav-btn1");
const btn2 = document.getElementById("nav-btn2");
const checkBoxInput = document.getElementById("inputCheckbox");
const profileImageInput = document.getElementById("inputImg");
const nameInput = document.getElementById("inputName");
const emailInput = document.getElementById("inputEmail");
const phoneInput = document.getElementById("inputPhone");
const categoryInput = document.getElementById("inputCategory");
const employees = Array.from(list.getElementsByClassName("employee"));
const searchInput = document.getElementById("searchInput");

const employeeList = [];

nameInput.value = "hello";
emailInput.value = "email";
phoneInput.value = "phone";
categoryInput.value = "category";

btn1.addEventListener("click", async () => {
  //const checkbox = checkBoxInput.checked;
  const profileImage = profileImageInput.files[0];
  const name_ = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const category = categoryInput.value;

  if (profileImage && name_ && email && category && phone) {
    const newEmployee = {
      profileImage: profileImage,
      name: name_,
      email: email,
      phone: phone,
      category: category,
    };

    const employeeDiv = document.createElement("div");
    employeeDiv.classList.add("employee");

    const profileImageElement = document.createElement("img");
    profileImageElement.className = "p-img";
    profileImageElement.src = URL.createObjectURL(profileImage);
    profileImageElement.alt = profileImage.name;
    profileImageElement.width = 100;
    profileImageElement.height = 100;

    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.className = "p-name";
    inputName.value = name_;
    inputName.disabled = true;

    const inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.className = "p-email";
    inputEmail.value = email;
    inputEmail.disabled = true;

    const inputPhone = document.createElement("input");
    inputPhone.type = "text";
    inputPhone.className = "p-phone";
    inputPhone.value = phone;
    inputPhone.disabled = true;

    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.className = "p-category";
    inputCategory.value = category;
    inputCategory.disabled = true;

    const checkBox = document.createElement("label");
    checkBox.innerHTML = `
            <input type="checkbox" class="p-checkbox">
        `;

    const modifybtn = document.createElement("img");
    modifybtn.src = "p_img/modify.png";
    modifybtn.className = "p-modifybtn";
    modifybtn.width = 30;
    modifybtn.height = 30;

    // 이미지 수정을 위해 input 요소 추가
    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.className = "p-img";
    inputImage.addEventListener("change", (event) => {
      const newImage = event.target.files[0];
      profileImageElement.src = URL.createObjectURL(newImage);
      profileImageElement.alt = newImage.name;
    });

    modifybtn.addEventListener("click", () => {
      inputName.disabled = false;
      inputEmail.disabled = false;
      inputPhone.disabled = false;
      inputCategory.disabled = false;

      modifybtn.style.display = "none";
      savebtn.style.display = "inline-block";

      employeeDiv.insertBefore(
        inputImage,
        profileImageElement.nextElementSibling
      );
      inputImage.style.display = "block";

      inputName.focus();
    });

    const savebtn = document.createElement("button");
    savebtn.className = "p-savebtn";
    savebtn.style.display = "none";
    savebtn.textContent = "수정완료"; // 수정 완료 텍스트 설정

    savebtn.addEventListener("click", async () => {
      inputName.disabled = true;
      inputEmail.disabled = true;
      inputPhone.disabled = true;
      inputCategory.disabled = true;

      modifybtn.style.display = "inline-block";
      savebtn.style.display = "none";
      inputImage.style.display = "none";

      try {
        // 이미지를 AWS S3에 업로드하기 위해 putFile 함수 호출
        const result = await putFile(inputImage.files[0]); // 수정한 이미지 파일을 putFile 함수에 전달
        console.log("Successfully uploaded updated photo:", result);
        // 이미지 업로드 성공한 경우, 수정된 이미지의 URL을 활용하여 다른 작업 수행
        // const imageUrl = result.Location;

        // ... (이미지 표시 또는 다른 작업)
      } catch (err) {
        console.error("Error uploading updated photo:", err);
      }
    });

    employeeDiv.appendChild(checkBox);
    employeeDiv.appendChild(profileImageElement);
    employeeDiv.appendChild(inputName);
    employeeDiv.appendChild(inputEmail);
    employeeDiv.appendChild(inputPhone);
    employeeDiv.appendChild(inputCategory);
    employeeDiv.appendChild(modifybtn);
    employeeDiv.appendChild(savebtn);

    list.appendChild(employeeDiv);

    employeeList.push(newEmployee);

    // 로딩 함수
    function showLoading() {
      const loadingDiv = document.getElementById("loading");
      loadingDiv.style.display = "flex"; // 로딩 GIF를 보이게 설정
    }

    function hideLoading() {
      const loadingDiv = document.getElementById("loading");
      loadingDiv.style.display = "none"; // 로딩 GIF를 숨기게 설정
    }

    profileImageElement.addEventListener("click", () => {
      showLoading();

      // 클릭한 직원의 정보를 가져와서 상세 페이지에 전달
      const selectedEmployee = {
        profileImage: profileImageElement.src,
        name: name_,
        email: email,
        phone: phone,
        category: category,
      };

      // 선택한 직원의 정보를 쿼리 파라미터로 인코딩하여 URL에 전달
      const queryParams = new URLSearchParams(selectedEmployee);

      // 페이지를 떠날 때 로딩 이미지를 숨기는 처리
      window.addEventListener("beforeunload", function () {
        hideLoading();
      });

      // 페이지 로딩이 완료되면 로딩 GIF를 숨기는 처리를 위해 이벤트 리스너 등록
      window.addEventListener("load", function () {
        hideLoading();
      });

      // 일정 시간(예: 1초) 후에 페이지로 넘어가도록 설정
      setTimeout(function () {
        window.location.href = `detail.html?${queryParams.toString()}`;
      }, 1000); // 1초 지연
    });

    try {
      // 이미지를 AWS S3에 업로드하기 위해 putFile 함수 호출
      const result = await putFile(profileImage);
      console.log("Successfully uploaded photo:", result);
      //이미지 업로드 성공한 경우, 해당 이미지의 URL을 이용해 화면에 표시하거나 다른 작업 수행
      // const imageUrl = result.Location;

      // ... (이미지 표시 또는 다른 작업)
    } catch (err) {
      console.error("Error uploading photo:", err);
    }

    // Clear input fields
    profileImageInput.value = "";
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    categoryInput.value = "";
  } else {
    alert("모든 필드를 입력하세요.");
  }
});

btn2.addEventListener("click", () => {
  const selectCheckbox = document.querySelectorAll(".p-checkbox:checked");

  selectCheckbox.forEach(async (checkBox) => {
    const listItem = checkBox.closest(".employee");
    if (listItem) {
      const profileImage = listItem.querySelector(".p-img");
      const imageName = profileImage.alt;
      alert(imageName);

      try {
        // 직원 이미지 삭제를 위한 함수 호출
        await deleteImageFromS3(imageName);

        // 직원 리스트에서 삭제
        list.removeChild(listItem);
      } catch (error) {
        console.error("Error deleting employee image:", error);
      }
    }
  });
});

// putFile 함수를 정의하고 업로드할 이미지 파일을 매개변수 file로 받는다.
const putFile = (file) => {
  const albumBucketName = "js-employee-bucket"; // S3의 버킷 이름
  const region = "ap-northeast-2"; // 서울
  const accessKeyId = AccessKeyId;
  const secretAccessKey = SecretAccessKey;

  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });

  // 업로드를 관리하는 'upload' 객체를 생성하고
  // 업로드할 이미지 파일의 정보와 업로드 옵션을 설정한다.
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: file.name,
      Body: file,
      ACL: "public-read",
    },
  });

  // 'upload' 객체의 업로드 작업을 수행하는 프로미스 생성
  const promise = upload.promise();

  // 업로드 작업의 프로미스가 성공하면 첫 번째 콜백함수가 호출되어 콘솔에 출력
  // 작업이 실패하면 두 번째 콜백 함수가 호출되어 에러메시지와 함께 에러 내용 콘솔 출력
  promise.then(
    function (data) {
      console.log("Successfully uploaded photo: ", data);
    },
    function (err) {
      return console.log(
        "There was an error uploading your photo: ",
        err.message
      );
    }
  );
};

// AWS S3에서 이미지 삭제를 위한 함수 정의
const deleteImageFromS3 = async (imageName) => {
  try {
    const albumBucketName = "js-employee-bucket"; // S3의 버킷 이름
    const region = "ap-northeast-2"; // 서울
    const accessKeyId = AccessKeyId;
    const secretAccessKey = SecretAccessKey;

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: albumBucketName,
      Key: imageName,
    };

    // 이미지 삭제 요청
    await s3.deleteObject(params).promise();
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

// 검색 기능
searchInput.addEventListener("input", function () {
  var searchValue = this.value.toLowerCase(); // 검색어를 소문자로 변환합니다.

  // staff-list div 내의 모든 employee div를 선택합니다.
  var employees = document.querySelectorAll("#list .employee");

  // 각 employee div를 반복하여 검색어와 일치하는지 확인하고, 보이거나 숨깁니다.
  employees.forEach(function (employee) {
    var nameElement = employee.querySelector(".p-name"); // 이름 요소 선택
    var name;

    // p-name 클래스 요소 중에서 input 요소가 아닌 div 요소를 찾아 이름을 추출합니다.
    var nameDiv = nameElement.querySelector("div.p-name");
    if (nameDiv) {
      name = nameDiv.textContent.toLowerCase();
      console.log(name);
      // 이름 텍스트를 소문자로 변환
    } else {
      name = nameElement.value.toLowerCase(); // input 요소의 값도 소문자로 변환
    }

    // 검색어와 이름이 일치하는 경우 해당 employee div를 보이게 합니다.
    if (name.includes(searchValue)) {
      employee.style.display = "block";
    } else {
      employee.style.display = "none"; // 일치하지 않는 경우 숨깁니다.
    }
  });
});
