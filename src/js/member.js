class Member {
  constructor(fullName, email, phone, category, fileUrl, fileName) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.category = category;
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
