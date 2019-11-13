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

    moment().format();

    //Initial values
    var trainName = '';
    var destination = '';
    var firstTrain = '';
    var frequency = 0;

  //FUNCTIONS-------------------------------------------------------------------------------------------------------------------------------------

  //LOGIC-----------------------------------------------------------------------------------------------------------------------------------------
    //Capture user input on button click
    $('#submitButton').on('click', function(event) {
      event.preventDefault();
      
      // Grab values from text boxes
      trainName = $('#trainName').val().trim();
      destination = $('#destination').val().trim();
      firstTrain = $('#firstTrain').val().trim();
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
      //Create a variable to hold the moment the first train leaves
      var cFirstTrain = moment((sv.firstTrain), 'HH:mm')
      //Create a variable to hold the current moment 
      var now = moment().format('HH:mm');

      // If the first train hasn't left yet, display sv.firstTRain in the nextArrival space and calculate minutes away based on the difference between now and the time when the train starts running
        if (now < cFirstTrain._i) {
          var minutesAway = (moment().diff(moment(cFirstTrain), 'minutes'))/-1;
          var nextArrival = moment(cFirstTrain);
          
        } else { 
          //Create a variable to hold the difference between the current time and the time the train started running (in minutes)
          var timeDiff = moment().diff(moment(cFirstTrain), 'minutes');
          //Create a variable to hold the remainder of dividing timeDiff by the frequency
          var tRemainder = timeDiff % (sv.frequency);
          //Create a variable to calculate and hold the minutes away
          var minutesAway = (sv.frequency) - tRemainder
          //Create a variable to hold the next arrival time based on the current time and minutesAway
          var nextArrival = moment().add(minutesAway, 'minutes')
        }

      // Console.log the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);
      console.log(cFirstTrain);
      console.log(now);
      console.log(minutesAway);
      console.log(nextArrival);
  
      // full list of items to the table
      $('tbody').append(" <tr id='trainData'> <td id='nameData'> " +
        sv.trainName + " </td><td id='destinationData'> " + sv.destination + " </td><td id='frequencyData'> " + sv.frequency + " </td><td id='nextArrival'> " + moment(nextArrival).format('HH:mm') + " </td><td id='minutesAway'> " + minutesAway + " </td></tr> ");
    });
});