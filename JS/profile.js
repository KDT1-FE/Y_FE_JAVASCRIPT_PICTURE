// URL 매개변수 파싱 함수
function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
        imageName: urlParams.get('imageName'),
        name: urlParams.get('name'),
        email: urlParams.get('email'),
        phone: urlParams.get('phone'),
        category: urlParams.get('category')
    };
    return data;
}
const S3_BUCKET = 'y-fe-javascript-picture';
// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    const profileData = parseUrlParameters();
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const categoryElement = document.getElementById('category');
    const profileImageElement = document.getElementById('profileImage');

    // 데이터 화면에 표시
    nameElement.textContent = profileData.name;
    emailElement.textContent = profileData.email;
    phoneElement.textContent = profileData.phone;
    categoryElement.textContent = profileData.category;
    profileImageElement.src = `https://${S3_BUCKET}.s3.amazonaws.com/${profileData.imageName}`;
});