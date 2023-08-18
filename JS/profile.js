import '../CSS/profile.css';
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
    const nameElement = document.getElementById('pf-name');
    const emailElement = document.getElementById('pf-email');
    const phoneElement = document.getElementById('pf-phone');
    const categoryElement = document.getElementById('pf-category');
    const profileImageElement = document.getElementById('pf-profileImage');

    // 데이터 화면에 표시
    nameElement.textContent = profileData.name;
    emailElement.textContent = profileData.email;
    phoneElement.textContent = profileData.phone;
    categoryElement.textContent = profileData.category;
    profileImageElement.src = `https://${S3_BUCKET}.s3.amazonaws.com/${profileData.imageName}`;
});