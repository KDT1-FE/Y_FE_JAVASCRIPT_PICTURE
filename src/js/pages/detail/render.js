const loadData = ($form, data) => {
  const profileImage = document.getElementById('profile-image');

  profileImage.src = data.profileUrl;
  $form.person.value = data.person;
  $form.email.value = data.email;
  $form.contact.value = data.contact;
  $form.division.value = data.division;
};

export default loadData;
