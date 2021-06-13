// Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDO9Xd7vCEBsxsAIiIZp0Piz6EjQw0sF-k",
    authDomain: "vision-sample-b3dbf.firebaseapp.com",
    databaseURL: "https://vision-sample-b3dbf-default-rtdb.firebaseio.com",
    projectId: "vision-sample-b3dbf",
    storageBucket: "vision-sample-b3dbf.appspot.com",
    messagingSenderId: "453477097696",
    appId: "1:453477097696:web:d5d46fac0eb205d88cb085"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Setting form ivent
var form = document.querySelector('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    var imgs = form.querySelector('input');
    var uploads = [];

    for (var file of imgs.files){
        var storageRef = firebase.storage().ref(file.name);
        uploads.push(storageRef.put(file));
    }

    Promise.all(uploads).then(function(){
        console.log('Upload completed');
    });
});
