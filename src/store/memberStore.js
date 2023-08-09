import { Store } from '../core/store';
import { data } from '../../test';
export const memberStore = new Store({
  members: [],
  loading: false,
  member: {},
});
export const renderMemberList = () => {
  memberStore.state.loading = true;
  console.log(data);
  const { members } = data;
  memberStore.state.members = [...members];
  memberStore.state.loading = false;
};

export const getMemberDetail = (id) => {
  const { member } = data;
  memberStore.state.member = member;
};
