firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        $('#userName').html(user.displayName);
    }
});
