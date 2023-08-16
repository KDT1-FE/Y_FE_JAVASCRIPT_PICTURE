/**
 * DataUrl을 File | Blob 형식으로 변환하는 함수 입니다.
 * @param {*} url DataUrl 형식의 주소를 전달합니다.
 * @param {*} fileName 파일 이름을 전달합니다.
 * @returns File 형식을 반환 합니다.
 */
export async function url2File(url, fileName) {
  const blob = await (await fetch(url)).blob();
  return new File([blob], fileName, { type: blob.type });
}
