//Javascript file for the calculator
var currentNumber=""; //this is the number we are working with
var operator=""; //Which operation are we doing?
var result=0; //This is the result
var timerID=0; //Id of the timer
var timerRunning=0; //FLAG to show if the timer is running (0=NO)
var clockRunning=0; //Flag to show if the clock is running (0=NO, 1=YES)
var clockID=0; //ID of clockTimer
var tempMode=0; //Flag to indicate if in Temp mode
  
  function getTemperature(){
    $(document).ready(function(){
      $("#display").load("http://www.soundingboard.com.au/iot/temperature.php");
    });
    
  }

  function doCalculation() {
   
    switch(operator) {
      case "+":result=result+parseFloat(currentNumber);
      break;
      case "-":result=result-parseFloat(currentNumber);
      break;
      case "/":result=result/parseFloat(currentNumber);
      break;
      case "*":result=result*parseFloat(currentNumber);
      break;
      }
    document.getElementById("display").innerHTML=result.toString(); //Display the result
  }
  
  function clearAll() {
	  currentNumber="";
	  result=0;
	  operator="";
	  document.getElementById("display").innerHTML="0";
  }
  
  //WHY DOESN'T THIS WORK? clearAll(); //Reset the calculator
  
//Function buttonPress
//Called when a calculator button is pressed
//Receives: the ID of the button pressed
//Returns: Nothing
function buttonPress(whichButton) {
document.getElementById(whichButton).style.backgroundColor="rgb(255,0,0)";
document.getElementById(whichButton).style.marginTop="8px";
document.getElementById(whichButton).style.marginBottom="2px";
document.getElementById(whichButton).style.boxShadow= "0 2px 0 grey";

switch(whichButton) { //decide which action to take depending on button
  case"clock":
  doClock();
  break;
  case "+":
  operator="+"; //Indicate operation will  be addition
  result=parseFloat(currentNumber); //Save this number into result
  currentNumber=""; //Clear current number
  break;
  case "-":
  operator="-"; //Indicate operation will  be subtraction
  result=parseFloat(currentNumber); //Save this number into result
  currentNumber=""; //Clear current number
  break;
  case "/":
  operator="/"; //Indicate operation will  be division
  result=parseFloat(currentNumber); //Save this number into result
  currentNumber=""; //Clear current number
  break;
  case "*":
  operator="*"; //Indicate operation will  be multiplication
  result=parseFloat(currentNumber); //Save this number into result
  currentNumber=""; //Clear current number
  break;
  case "=":
	doCalculation(); //Do the calculation now
  break;
  case "C":
	clearAll(); //Reset the calculator
  break;
  case "temp":
  if (!tempMode) {
    tempMode=1;//go into temp mode
    getTemperature(); // call function get temperature
  }else {tempMode=0; //go out of temp mode
      clearAll();
  }
  break;

  case "timer":
  if((!timerRunning)&&(parseInt(currentNumber)>0)) //if the timer is not running,
  {
    timerRunning=1; // say that it is, and
    timerID= setInterval(doTimer,1000); //call the doTimer() function everysecond

  } else
  {timerRunning=0; //say it is not running (ie paused)
  clearInterval(timerID);
  }
  break;

  default:
	currentNumber+=whichButton; //Concatenate the number pressed with other numbers in display
	document.getElementById("display").innerHTML=currentNumber; //Display the value
}

}

//Function buttonRelease
//Called when a calculator button is released
//Receives: the ID of the button pressed
//Returns: Nothing
function buttonRelease(whichButton) {
document.getElementById(whichButton).style.backgroundColor="rgb(255,255,255)";
document.getElementById("C").style.backgroundColor="orange";
document.getElementById("timer").style.backgroundColor="#77dd77";
document.getElementById("clock").style.backgroundColor="#77dd77";
document.getElementById(whichButton).style.margin="5px";
document.getElementById(whichButton).style.boxShadow= "0 5px 0 grey";
}

function doTimer(){
  currentNumber--; //subtract 1 from current number
  if(parseInt(currentNumber)<=0) //if number less than equal to zero it will clear the intevals.
  {clearInterval(timerID); //stop timer when it gets to zero
    timerRunning=0;
    currentNumber=0;} //indicate not running
  document.getElementById("display").innerHTML=currentNumber;

}

//function leadingZero
// receive an integer
// returns a string with a leading zero if needed

function leadingZero(number){
  if(number<10) return("0"+number);
  else return(number);
}



  //fuction clockTimer
  //runs every second

  function clockTimer(){


    var myTime= new Date(); //save a snapshot of the date and time
    var hours=myTime.getHours();
    var minutes=myTime.getMinutes();
    var seconds=myTime.getSeconds();
    //if (minutes<10) minutes="0"+minutes;//add a leading zero if needed
    //if (hours<10) hours="0"+hours; 
    //alert("it is" + seconds);
    var ampm=""; //is it morning or afternoon?
    if (hours<12) ampm="am"; //morning is am
    else ampm = "pm"; //morning is pm
    if (hours>12) hours=hours-12; //this will convert it to 12 hours clock 

    
    var timeString=""; //this will hold the time string

    if (seconds%2==0)timeString=leadingZero(hours)+"<span style='visibility:visible;'>:</span>"+leadingZero(minutes)+ampm;//concatenate the string for the display
    else timeString=leadingZero(hours)+"<span style='visibility:hidden;'>:</span>"+leadingZero(minutes)+ampm;//span is used to display on off the colon cosistently
    document.getElementById("display").innerHTML="<b>"+timeString+"</b>";
   

  }

//Function that display the clock
//If not running, it displays the clock. if it is running, it goes back to being aa calculator
  function doClock(){
    if (!clockRunning){   //If the clock is not running
      //alert("running");
      clockID= setInterval(clockTimer, 1000); //start the clock timer
      clockRunning=1; //indicate the clock is now running
    }else //but if it is already running
      //{alert("not running");
      {clearInterval(clockID) //stop it
      clockRunning=0; //indicate not running
      clearAll(); //reset the calculator
    }
  }




 //function for button to call the calculator

  $(document).ready(function() { 
 $("#calculatorButton").click( function() { 
   $("#calculator").toggle(500);  
 }); 
}); 




