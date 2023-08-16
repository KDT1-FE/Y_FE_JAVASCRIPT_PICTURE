const db = firebase.firestore();
const storage = firebase.storage();

db.collection('people')
  .get()
  .then((i) => {
    i.forEach((e) => {
      console.log(e.data());
    });
  });

const storageRef = storage.ref();
const peoplesRef = storageRef.child(
  `${JSON.parse(localStorage.getItem('owner')).name}/`
);

async function uploadImg(name) {
  const file = document.querySelector('#file').files[0];
  const peopleRef = peoplesRef.child(name);
  const upload = peopleRef.put(file);
}

async function firstBuildImg(name, id) {
  try {
    await uploadImg(name);
    setTimeout(async () => {
      const url = await peoplesRef.child(name).getDownloadURL();
      const img = document.getElementsByClassName(id)[0];
      img.src = url;
    }, 700);
  } catch (err) {
    console.log(err);
  }
}

function buildImg(name, id) {
  peoplesRef
    .child(name)
    .getDownloadURL()
    .then((url) => {
      const img = document.getElementsByClassName(id)[0];
      img.src = url;
    })
    .catch((err) => {
      console.log(err);
    });
}

function uploadData() {
  const data = {};
}

function deleteImg(name) {
  peoplesRef
    .child(name)
    .delete()
    .then(console.log(`${name} 삭제 완료`))
    .catch((err) => {
      console.log(err);
    });
}

export { firstBuildImg, buildImg, deleteImg };
