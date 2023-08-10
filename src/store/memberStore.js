import { Store } from '../core/store';
import { data } from '../../test';
import { db } from '../api/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
export const memberStore = new Store({
  members: [],
  loading: false,
  member: {},
});
export const renderMemberList = async () => {
  // memberStore.state.loading = true;
  const res = await getDocs(collection(db, 'list'));
  let array = [];
  res.forEach((doc) => {
    let memberData = doc.data();
    console.log(memberData);
    array.push({
      name: memberData.name,
      photoUrl: memberData.photoUrl,
      email: memberData.email,
      id: doc.id,
    });
  });
  memberStore.state.members = [...array];
  // memberStore.state.loading = false;
};

export const getMemberDetail = async (id) => {
  const { member } = data;
  memberStore.state.member = member;
};
