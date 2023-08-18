import { ref, storage, uploadBytesResumable, getDownloadURL, addDoc, colRef } from '../firebase.js';

const $upload = document.querySelector('.upload');
$upload.addEventListener('submit', (e) => {
  e.preventDefault();

  let $file = document.querySelector('.upload--image').files[0];
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
        addDoc(colRef, {
          image: downloadURL,
          filename: $filename,
          name: $upload.name.value,
          appearance: $upload.appearance.value,
          interests: $upload.interests.value,
        })
          .then(() => {
            $upload.reset();
            window.location.replace('/index.html');
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});
