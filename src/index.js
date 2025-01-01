let dawnOf = document.getElementById("dawn-of");
let theDay = document.getElementById("the-first-day");
let hoursRemain = document.getElementById("hours-remain");

const items = [dawnOf,theDay,hoursRemain];

let customDate = document.getElementById("custom-date");
customDate.valueAsNumber = Date.now();

let arbitaryText0 = document.getElementById("arbitrary-0")
let arbitaryText1 = document.getElementById("arbitrary-1")

let audio = document.getElementById("dawn-sound");

theDay.onclick = ()=>{
    updateDisplay(new Date(customDate.value), true);
};

document.getElementById("go-custom-date").onclick = ()=>{updateDisplay(new Date(customDate.value), true)};
document.getElementById("go-custom-text").onclick = ()=>{updateDisplayArbitrary(arbitaryText0.value, arbitaryText1.value, true)};

const stringAliases = {
    1:"one",
    2:"two",
    3:"three",
    4:"four",
    5:"five",
    6:"six",
    7:"seven",
    8:"eight",
    9:"nine",
    10:"ten",
    11:"eleven",
    12:"twelve",
    13:"thirteen",
    14:"fourteen",
    15:"fifteen",
    20:"twenty",
    30:"thirty",
    40:"forty",
    50:"fifty",
    60:"sixty",
    70:"seventy",
    80:"eighty",
    90:"ninety",
}

const concludingStrings = {
    1:"first",
    2:"second",
    3:"third",
    4:"fourth",
    5:"fifth",
    6:"sixth",
    7:"seventh",
    8:"eighth",
    9:"ninth",
    10:"tenth",
    11:"eleventh",
    12:"twelfth",
    13:"thirteenth",
    14:"fourteenth",
    15:"fifteenth",
    20:"twentieth",
    30:"thirtieth",
    40:"fortieth",
    50:"fiftieth",
    60:"sixtieth",
    70:"seventieth",
    80:"eightieth",
    90:"ninetieth",
}

updateDisplay(new Date(), false);

function updateDisplay(date, playSound){

    let isLeapYear = new Date(date.getFullYear(), 1, 29).getMonth() === 1; //returns true if february 29th is a valid day this year

    let day = getDayOfYearFromDate(date);
    
    let dayString = "the "+getAdjectiveString1To999(day)+" day";

    if (isLeapYear && day == 366){
        dayString = "the final day";
    } else if (!isLeapYear && day == 365){
        dayString = "the final day";
    }

    theDay.innerHTML = dayString.replace(" and ","<br>and ");
    document.title = "Dawn of "+ dayString;
    
    checkForNewDay(dayString);

    //theDay.innerText = "The "+getAdjectiveString1To999(2)+" Day";
    
    hoursRemain.innerText = "- "+ ((((isLeapYear ? 366 : 365) * 24) - (day * 24)) + 24) + " Hours Remain -";
    
    resetAnim();

    if (playSound){
       resetSound();
    }
}

function updateDisplayArbitrary(arb0, arb1, playSound){

    theDay.innerText = arb0;
    
    if (arb1.trim().length == 0){
        hoursRemain.innerText = ""; 
    } else {
        hoursRemain.innerText = "- "+arb1+" -";
    }

    checkForNewDay(theDay.innerText);

    document.title = "Dawn of "+ arb0;

    resetAnim();

    if (playSound){
       resetSound();
    }
}

function checkForNewDay(text){
    if (text.toLowerCase().includes(" new ")){
        document.body.className = "new-day"
        console.log("?")
    } else {
        document.body.className = "";
    }
}

function resetAnim(){
    items.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = null;
    });
}

function resetSound(){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function getDaySuffix(day){
    switch (day){
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function getDayOfYearFromDate(dt) {
    var current = new Date(dt.getTime());
    var previous = new Date(dt.getFullYear(), 0, 1);
    return Math.ceil((current - previous + 1) / 86400000);
  }

function getAdjectiveString1To999(input){
    let output = "";
    if (input > 99){        
        output += stringAliases[Math.floor(input / 100)];
        output += " hundred and "
        while (input > 99){
            input -= 100;
        }
    }
    if (input > 15){
        let tensColumn = Math.floor(input / 10);
        while (input > 9){
            input -= 10;
        }
        if (tensColumn == 1){
            output += stringAliases[input]+"teenth"
        } else if (input == 0) { //if there's nothing in the units column, so we need a concluding string like "fiftieth"
            output += concludingStrings[tensColumn*10];
        } else {
            output += stringAliases[tensColumn*10] +"-"+ concludingStrings[input];
        }
    } else {
        output += concludingStrings[input];
    }

    return output;
}