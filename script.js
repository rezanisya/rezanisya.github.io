// script.js
const firebaseConfig = {
    apiKey: "AIzaSyCiZ2_1ysy6vZ_l0AmZGuYkjua34X66YS4",
    authDomain: "gusmuhammad-c3540.firebaseapp.com",
    databaseURL: "https://gusmuhammad-c3540-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gusmuhammad-c3540",
    storageBucket: "gusmuhammad-c3540.appspot.com",
    messagingSenderId: "115098750707",
    appId: "1:115098750707:web:67fe98fb2417442c8ff186"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const comment = document.getElementById('comment').value;
    db.collection('comments').add({
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('comment').value = '';
        loadComments();
    });
});

function loadComments() {
    db.collection('comments').orderBy('timestamp', 'desc').get().then((snapshot) => {
        const commentsContainer = document.getElementById('commentsContainer');
        commentsContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const comment = doc.data().text;
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentsContainer.appendChild(commentElement);
        });
    });
}
