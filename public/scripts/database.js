// Database setting
const db = firebase.firestore();

// Get results of Vision API
var imgs = form.querySelector('input');

for (var file of imgs.files){
    db.collection('vision-api')
        .doc(file.name)
        .onSnapshot(result => {
            console.log(result.data());

            // Send result data to html
            const safeElement = document.getElementById("safe");
            safeElement.innerHTML = result.data().safeSearchResult;

            const personElement = document.getElementById("person");
            personElement.innerHTML = result.data().checkPersonResult;

            const advertisingElement = document.getElementById("advertising");
            advertisingElement.innerHTML = result.data().checkAdvertisingResult;
        });    
}

// Send result data to html





