const list  = document.getElementById('list');
const btn1 = document.getElementById('nav-btn1');
const btn2 = document.getElementById('nav-btn2')
const checkBoxInput = document.getElementById('inputCheckbox')
const profileImageInput = document.getElementById('inputImg');
const nameInput = document.getElementById('inputName');
const emailInput = document.getElementById('inputEmail');
const phoneInput = document.getElementById('inputPhone');
const categoryInput = document.getElementById('inputCategory');

btn1.addEventListener('click', async () => {
    // const checkbox = checkBoxInput.checked;
    const profileImage = profileImageInput.files[0];
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const category = categoryInput.value;

    if (profileImage && name && email && category && phone) {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');

        const profileImageElement = document.createElement('img');
        profileImageElement.src = URL.createObjectURL(profileImage);
        profileImageElement.className="p-img";
        profileImageElement.alt = name;
        profileImageElement.width = 100;
        profileImageElement.height = 100;


        const infoDiv = document.createElement('div');
        infoDiv.className = 'divText';
        infoDiv.innerHTML = `
            <p class = "p-name">${name}</p>
            <p class = "p-email">${email}</p> 
            <p class = "p-phone">${phone}</p>
            <p class = "p-category">${category}<p>
        `;
       
        const checkBox = document.createElement('label');
        checkBox.innerHTML = `
            <input type="checkbox" class="p-checkbox">
        `;

        employeeDiv.appendChild(checkBox);
          
        employeeDiv.appendChild(profileImageElement);
        employeeDiv.appendChild(infoDiv);

        list.appendChild(employeeDiv);

        try {
            // 이미지를 AWS S3에 업로드하기 위해 putFile 함수 호출
            const result = await putFile(profileImage);
            console.log('Successfully uploaded photo:', result);

            // 이미지 업로드 성공한 경우, 해당 이미지의 URL을 이용해 화면에 표시하거나 다른 작업 수행
            const imageUrl = result.Location;

            // ... (이미지 표시 또는 다른 작업)
        } catch (err) {
            console.error('Error uploading photo:', err);
        }

        // Clear input fields
        profileImageInput.value = '';
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        categoryInput.value='';
    } else {
        alert('모든 필드를 입력하세요.');
    }
});

btn2.addEventListener('click', () => {
    const selectCheckbox = document.querySelectorAll('.p-checkbox:checked')

    selectCheckbox.forEach(checkBox => {
        const listItem = checkBox.closest('.employee');
        if(listItem) {
            list.removeChild(listItem)
        }

    })
})


// putFile 함수를 정의하고 업로드할 이미지 파일을 매개변수 file로 받는다.
const putFile = file => {
    const albumBucketName = 'js-employee-bucket'; // S3의 버킷 이름
    const region = 'ap-northeast-2'; // 서울
    // const accessKeyId = '    '; // IAM에서 생성한 사용자의 accessKeyId
    // const secretAccessKey = '    '; // IAM에서 생성한 사용자의 secretAccessKey
    
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey
    }); 
    
    // 업로드를 관리하는 'upload' 객체를 생성하고
    // 업로드할 이미지 파일의 정보와 업로드 옵션을 설정한다. 
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: file.name,
        Body: file,
        ACL: "public-read"
      }
    });
    
    // 'upload' 객체의 업로드 작업을 수행하는 프로미스 생성
    const promise = upload.promise();
  

    // 업로드 작업의 프로미스가 성공하면 첫 번째 콜백함수가 호풀되어 콘솔에 출력
    // 작업이 실패하면 두 번째 콜백 함수가 호출되어 에러메시지와 함께 에러 내용 콘솔 출력
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
      },
      function(err) {
        return console.log("There was an error uploading your photo: ", err.message);
      }
    );
  };