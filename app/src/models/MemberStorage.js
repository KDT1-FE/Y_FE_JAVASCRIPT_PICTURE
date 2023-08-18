const db = require('../config/db');

class MemberStorage {
  static getMembers(condition) {
    const pageSize = parseInt(condition.pageSize, 10) || 10;
    const page = parseInt(condition.page, 10) || 1;
    const keyword = condition.keyword || '';

    const offset = (page - 1) * pageSize;

    let query = 'SELECT * FROM members';
    const params = [];

    if (keyword) {
      query += ' WHERE id LIKE ? OR name LIKE ?';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(pageSize + 1, offset);

    return new Promise((resolve, reject) => {
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static getMemberInfo(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM members WHERE id = ?';
      db.query(query, [id], (err, data) => {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }

  static async registerMember(memberInfo) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO members(id, name, position) VALUES(?, ?, ?)';
      const params = [memberInfo.id, memberInfo.name, memberInfo.position];
      db.query(query, params, (err) => {
        if (err) reject(err);
        resolve({ message: '직원을 등록했습니다.' });
      });
    });
  }

  static async updateMember(memberInfo) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE members SET name = ?, position = ?, profileimageurl = ? WHERE id = ?';
      const params = [
        memberInfo.name,
        memberInfo.position,
        memberInfo.profileImageURL,
        memberInfo.id,
      ];
      db.query(query, params, (err) => {
        if (err) reject(err);
        resolve({ message: '직원 정보를 수정했습니다.' });
      });
    });
  }

  static async editMember(memberInfo) {
    return new Promise((resolve, reject) => {
      let query = '';
      let params = [];

      // URL이 있는 경우 업데이트 해준다
      if (memberInfo.profileImageURL) {
        query =
          'UPDATE members SET name = ?, position = ?, profileimageurl = ? WHERE id = ?';
        params = [
          memberInfo.name,
          memberInfo.position,
          memberInfo.profileImageURL,
          memberInfo.id,
        ];
      }
      // 삭제 플래그가 있는 경우 기존 프로필 이미지를 삭제한다.
      else if (memberInfo.isProfileImageDeleted === 'true') {
        query =
          'UPDATE members SET name = ?, position = ?, profileimageurl = ? WHERE id = ?';
        params = [memberInfo.name, memberInfo.position, null, memberInfo.id];
      }
      // 그외의 경우는 프로필 이미지를 업데이트 하지 않는다.
      else {
        query = 'UPDATE members SET name = ?, position = ? WHERE id = ?';
        params = [memberInfo.name, memberInfo.position, memberInfo.id];
      }
      db.query(query, params, (err) => {
        if (err) reject(err);
        resolve({ message: '직원 정보를 수정했습니다.' });
      });
    });
  }

  static async deleteMember(ids) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM members WHERE id IN (?)';
      const params = [ids];
      db.query(query, params, (err) => {
        if (err) reject(err);
        resolve({ message: '직원을 삭제했습니다.' });
      });
    });
  }

  static async getProfileImageUrlsByIds(ids) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT profileimageurl FROM members WHERE id IN (?)';
      const params = [ids];
      db.query(query, params, (err, data) => {
        if (err) reject(err);
        resolve(data.map((member) => member.profileimageurl));
      });
    });
  }
}

module.exports = MemberStorage;
