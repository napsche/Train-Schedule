var firebaseConfig = {
    apiKey: "AIzaSyChrQ-OMFZSG4PQgvFPbHLvp7K6SiF9fY0",
    authDomain: "train-schedule-ace61.firebaseapp.com",
    databaseURL: "https://train-schedule-ace61.firebaseio.com",
    projectId: "train-schedule-ace61",
    storageBucket: "train-schedule-ace61.appspot.com",
    messagingSenderId: "84510197054",
    appId: "1:84510197054:web:6185efa28ef6fa167f186f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


//on click event to prevent page from reloading when submit button clicked
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
  
    //grab values from input boxes and assign to respective variable
    var tName = $("#train-name").val().trim();
    var tDestination = $("#train-destination").val().trim();
    var firstTrain = $("#train-start").val().trim();
    var trainFreq = $("#train-frequency").val().trim();
    //create object to hold new train info
    var newTrain = {
        name: tName,
        destination: tDestination,
        start: firstTrain,
        frequency: trainFreq,
    };
//upload new train data to database
    database.ref().push(newTrain);
    //log to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    //clear text boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-start").val("");
    $("#train-frequency").val("");

});
//create Firebase event for adding train to database and row in chart in html when input is added
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())
    //store snapshots in variables
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    //train info
    console.log(tName);
    console.log(tDestination);
    console.log(firstTrain);
    console.log(trainFreq);
    //calculate next arrival
    //calculate how many minutes until next train
    //create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(firstTrain),
        $("<td>").text(trainFreq),
        // $("<td>").text(),
    );
    //append new row to table
    $("#train-table").append(newRow);

}, function(errorObject) {
    console.log("Errors handled:" + errorObject.code);
});