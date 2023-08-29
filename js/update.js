import { ref, storage, uploadBytesResumable, getDownloadURL } from '../firebase.js';
import { updateDoc, deleteObject } from '../firebase.js';
import { docRef, profileData } from './profile.js';

const $update = document.querySelector('.update');
$update.addEventListener('submit', async (event) => {
  event.preventDefault();
  let $file = document.querySelector('.update--image').files[0];

  if ($file) await updateImage($file);
  await updateData();

  setTimeout(() => {
    window.location.reload();
  }, 3000);
});

async function updateImage(image) {
  const desertRef = ref(storage, `characters/${profileData.filename}`);
  deleteObject(desertRef);

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
      await updateDoc(docRef, { image: imageURL, filename: filename });
    }
  );
}

async function updateData() {
  await updateDoc(docRef, {
    name: $update.name.value,
    appearance: $update.appearance.value,
    interests: $update.interests.value,
  });
}
