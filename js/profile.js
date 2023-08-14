function getStoredData(updates) {
  for (const elementId in updates) {
    const value = updates[elementId];
    const element = document.getElementById(elementId);

    if (element) {
      if (element.tagName === "IMG") {
        element.src = value;
      } else {
        element.value = value;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const profileDataString = localStorage.getItem("profileData");
  if (profileDataString) {
    const profileData = JSON.parse(profileDataString);

    const updates = {
      "profile-img": profileData.profileImg,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    };

    getStoredData(updates);
  }
});
