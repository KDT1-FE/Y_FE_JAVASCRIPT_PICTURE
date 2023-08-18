const storage = firebase.storage();
const storageRef = storage.ref();
const defaltPeopleRef = storageRef.child('기본');
const peoplesRef = storageRef.child(
  `${JSON.parse(localStorage.getItem('owner')).name}/`
);

async function uploadImg(name) {
  const file = document.querySelector('#file').files[0];
  const peopleRef = peoplesRef.child(name);
  const upload = await peopleRef.put(file);
}

async function firstBuildImg(name, id) {
  try {
    await uploadImg(name);
    const url = await peoplesRef.child(name).getDownloadURL();
    const img = document.getElementsByClassName(id)[1];
    img.src = url;
  } catch (err) {
    console.log(err);
  }
}

function buildImg(name, id, type) {
  if (type === 'defalt') {
    defaltPeopleRef
      .child(`${name}.png`)
      .getDownloadURL()
      .then((url) => {
        const img = document.getElementsByClassName(id)[1];
        img.src = url;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    peoplesRef
      .child(name)
      .getDownloadURL()
      .then((url) => {
        const img = document.getElementsByClassName(id)[1];
        img.src = url;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteImg(name, type) {
  if (type === 'defalt') {
    console.log(`${name} 삭제 완료`);
  } else {
    peoplesRef
      .child(name)
      .delete()
      .then(console.log(`${name} 삭제 완료`))
      .catch((err) => {
        console.log(err);
      });
  }
}

export { firstBuildImg, buildImg, deleteImg };
