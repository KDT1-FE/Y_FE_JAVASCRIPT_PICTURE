const MemberStorage = require('./MemberStorage');
const s3DeleteProfileImages = require('../middlewares/s3DeleteProfileImage');

class Member {
  constructor(body) {
    this.body = body;
  }

  async getMembers() {
    const condition = this.body;
    try {
      const response = await MemberStorage.getMembers(condition);

      // 데이터를 pagesize보다 하나 더 가져왔기 때문에, response의 길이가 pagesize보다 크면 hasMore를 true로 설정하고,
      // 마지막 데이터를 pop()으로 제거한다.
      const hasMore = response.length > condition.pageSize;
      if (hasMore) response.pop();

      return { success: true, member: response, hasMore };
    } catch (err) {
      console.log(err);
      return { success: false, message: `${err}` };
    }
  }

  async getMemberInfo() {
    const memberInfo = this.body;
    try {
      const response = await MemberStorage.getMemberInfo(memberInfo);
      return { success: true, member: response };
    } catch (err) {
      console.log(err);
      return { success: false, message: `${err}` };
    }
  }

  async registerMember() {
    const memberInfo = this.body;
    try {
      const member = await MemberStorage.getMemberInfo(memberInfo.id);
      if (member) throw Error('이미 등록된 아이디입니다.');
      const response = await MemberStorage.registerMember(memberInfo);
      return { success: true, message: response.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: `${err}` };
    }
  }

  async updateMember() {
    const memberInfo = this.body;
    try {
      const response = await MemberStorage.updateMember(memberInfo);
      return { success: true, message: response.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: `${err}` };
    }
  }

  async deleteMember() {
    const { ids } = this.body;
    try {
      const imageUrls = await MemberStorage.getProfileImageUrlsByIds(ids);
      // rds에서 멤버 정보 삭제
      const deleteMemberResponse = await MemberStorage.deleteMember(ids);
      // s3에서 프로필 이미지 삭제
      await s3DeleteProfileImages(imageUrls);
      return { success: true, message: deleteMemberResponse.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: `${err}` };
    }
  }
}

module.exports = Member;
