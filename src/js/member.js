class Member {
  constructor(fullName, gender, email, phone, category, fileUrl, fileName) {
    this.fullName = fullName;
    this.category = category;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.fileUrl = fileUrl;
    this.fileName = fileName;
  }
  isNotEmpty() {
    if (this.fullName === "" || this.email === "" || this.phone === "")
      return false;
    return true;
  }
}
export default Member;
