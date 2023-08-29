import { ref, storage, uploadBytesResumable, getDownloadURL, addDoc, colRef } from '../firebase.js';

const $upload = document.querySelector('.upload');
$upload.addEventListener('submit', (event) => {
  event.preventDefault();

  let $file = document.querySelector('.upload--image').files[0];
  uploadData($file);
});

function uploadData(image) {
  const filename = Date.now();
  const imageRef = ref(storage, `characters/${filename}`);
  const uploadTask = uploadBytesResumable(imageRef, image);

  uploadTask.on(
    'state_changed',
    null,
    (error) => {
      console.error(error);
    },
    async () => {
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
      await addDoc(colRef, {
        image: imageURL,
        filename: filename,
        name: $upload.name.value,
        appearance: $upload.appearance.value,
        interests: $upload.interests.value,
      });

      $upload.reset();
      window.location.replace('/index.html');
    }
  );
}
