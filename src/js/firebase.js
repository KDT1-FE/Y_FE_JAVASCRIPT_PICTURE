const firebaseConfig = {
    apiKey: 'AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo',
    authDomain: 'project-1-8debf.firebaseapp.com',
    projectId: 'project-1-8debf',
    storageBucket: 'project-1-8debf.appspot.com',
    messagingSenderId: '386056815137',
    appId: '1:386056815137:web:92425cb061808073ed9960',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();
