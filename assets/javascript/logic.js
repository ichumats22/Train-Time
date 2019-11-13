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

    //Initial values
    var trainName = '';
    var destination = '';
    var firstTrain = 0;
    var frequency = 0;

  //FUNCTIONS-------------------------------------------------------------------------------------------------------------------------------------

  //LOGIC-----------------------------------------------------------------------------------------------------------------------------------------
    //Capture user input on button click
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      
      // Grab values from text boxes
      trainName = $('#trainName').val().trim();
      destination = $('#destination').val().trim();
      firstTrain = $('#firstTrain').val().trim().replace(':', '');
      frequency = $('#frequency').val().trim();
      // Code for handling the push
      database.ref().push({
        trainName,
        destination,
        firstTrain,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(childSnapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = childSnapshot.val();

      // Console.log the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);

      
      // full list of items to the well
      $('tbody').append("<tr id='trainData'> <td id='nameData'> " +
        sv.trainName + " </td><td id='destinationData'> " + sv.destination + "</td><td id='frequencyData'> " + sv.frequency + "</td></tr>");
      });
});