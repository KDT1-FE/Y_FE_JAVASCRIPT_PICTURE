import { Store } from "../modules";
import { dbService } from "../firebase";

const store = new Store({
  searchText: "",
  employees: [],
  employee: {},
  docs: "",
  loading: false,
});

export default store;

// 메인페이지 - 전체 직원 불러오기
export const getEmployee = async () => {
  store.state.loading = true;
  store.state.employees = [];

  await dbService
    .collection("Employee")
    .get()
    .then((item) => {
      item.forEach((doc) => {
        return (store.state.employees = [...store.state.employees, doc.data()]);
      });
    });

  store.state.loading = false;
};

// 메인페이지 - 직원 검색
export const searchEmployee = async () => {
  store.state.loading = true;
  store.state.employees = [];

  await dbService
    .collection("Employee")
    .get()
    .then((item) =>
      item.forEach((doc) => {
        if (store.state.searchText === String(doc.data().name)) {
          return (store.state.employees = [
            ...store.state.employees,
            doc.data(),
          ]);
        }
      })
    );

  store.state.searchText = "";
  store.state.loading = false;
};

// 직원 등록 페이지 - 신규 직원 DB 등록
export const registerEmployee = async (newDB) => {
  store.state.loading = true;

  await dbService
    .collection("Employee")
    .add(newDB)
    .then(() => {
      window.location.href = "/#";
    })
    .catch((err) => {
      console.log(err);
    });

  store.state.loading = false;
};

// 직원 상세 페이지 - 정보 불러오기
export const detailEmployee = async (id) => {
  store.state.loading = true;

  await dbService
    .collection("Employee")
    .get()
    .then((item) =>
      item.forEach((doc) => {
        if (Number(id) === doc.data().id) {
          store.state.docs = doc.id;
          return (store.state.employee = doc.data());
        }
      })
    );

  store.state.loading = false;
};

// 직원 상세 페이지 - 정보 변경
export const changeInfoEmployee = async (id, updateDB) => {
  store.state.loading = true;

  await dbService
    .collection("Employee")
    .doc(id)
    .update(updateDB)
    .then(() => {
      // window.location.href = `/#/detail?id=${id}`;
      window.location.href = "/#/";
    });

  store.state.loading = false;
};

// 직원 상세 페이지 - 정보 삭제
export const deleteEmployee = async (id) => {
  store.state.loading = true;

  await dbService
    .collection("Employee")
    .doc(id)
    .delete()
    .then(() => {
      window.location.href = "/#/";
    });

  store.state.loading = false;
};
