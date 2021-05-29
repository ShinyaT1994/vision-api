


// Set the configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO9Xd7vCEBsxsAIiIZp0Piz6EjQw0sF-k",
    authDomain: "vision-sample-b3dbf.firebaseapp.com",
    databaseURL: "https://vision-sample-b3dbf-default-rtdb.firebaseio.com",
    projectId: "vision-sample-b3dbf",
    storageBucket: "vision-sample-b3dbf.appspot.com",
    messagingSenderId: "453477097696",
    appId: "1:453477097696:web:d5d46fac0eb205d88cb085"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
var storage = firebase.storage();