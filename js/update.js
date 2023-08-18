import { ref, storage, uploadBytesResumable, getDownloadURL, addDoc, colRef } from '../firebase.js';
import { db, doc, getDoc, updateDoc, deleteObject } from '../firebase.js';
import { docRef, docSnap } from './profile.js';

console.log(docSnap.data());

const $update = document.querySelector('.update');
$update.addEventListener('submit', (e) => {
  e.preventDefault();

  let $file = document.querySelector('.update--image').files[0];
  if ($file) {
    // 파일 삭제
    const desertRef = ref(storage, `characters/${docSnap.data().filename}`);
    deleteObject(desertRef).then(() => {
      console.log('Delete successfully');
    });

    const $filename = Date.now();
    const imageRef = ref(storage, `characters/${$filename}`);

    const uploadTask = uploadBytesResumable(imageRef, $file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateDoc(docRef, { image: downloadURL, filename: $filename });
        });
      }
    );
  }

  updateDoc(docRef, { name: $update.name.value });
  console.log('Update successfully');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});
