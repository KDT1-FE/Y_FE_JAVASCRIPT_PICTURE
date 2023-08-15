import { Store } from "../core";

const emptyMember = {
  id: "",
  fullName: "",
  gender: "",
  email: "",
  phone: "",
  category: "",
  fileUrl: "",
  fileName: "",
};

export default new Store({
  loading: false,
  members: [emptyMember],
  memberDetail: emptyMember,
  lastScrollKey: null,
  deleteIds: [],
});
