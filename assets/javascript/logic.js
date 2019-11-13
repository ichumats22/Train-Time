$(document).ready(function() {
  //VARIABLES---------------------------------------------------------------------------------------------------------------------------------------
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAaAHO88uJFDPURwV0Q4fptlbmE1_zOwhY",
      authDomain: "ivc-train-time.firebaseapp.com",
      databaseURL: "https://ivc-train-time.firebaseio.com",
      projectId: "ivc-train-time",
      storageBucket: "ivc-train-time.appspot.com",
      messagingSenderId: "472610575683",
      appId: "1:472610575683:web:7d9a68f6b46fb0354b4bf6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //Crate a variable to reference the database
    var database = firebase.database();

    var test = 0;
  //FUNCTIONS-------------------------------------------------------------------------------------------------------------------------------------

  //LOGIC-----------------------------------------------------------------------------------------------------------------------------------------
    //Testing links 
    $('#testButton').on('click', function(event) {
      event.preventDefault();
      
      console.log('Links working properly');
     
      // Grabbed values from text boxes
      test = $('#test').val().trim();

      // Code for handling the push
      database.ref().push({
        test,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });
});