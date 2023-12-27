
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay  = document.querySelector("[data-lengthNumber]");


const passswordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const  uppercaseCheck= document.querySelector("#uppercase");
const  lowercaseCheck= document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");

const  symbolsCheck= document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const  allCheckBox = document.querySelectorAll("input[type = checkbox]");
const symbols = '`~!@#$%^&*()_+|}{][:><?/' ;


//fetch all element

let password = "";
let passwordLength =  10 ;
let checkCount = 1;
handleSlider();
//set strenth circle to grey

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    //change in ui
    lengthDisplay.innerText = passwordLength;
}



function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow


}

function getRndInteger(min,max){
    // Math.random() provide a random number between 0 1 hence we multiply max - min
return  Math.floor(Math.random() *  (max-min)) + min;
   //we use this function in all function this fun provide any random number betwenn any given number  
}

function generateRandomNum(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97,123));

}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));

}


function generateSymbol(){
  const rndnum = getRndInteger(0, symbols.length);
  return symbols.charAt(rndnum);
}




function calculateStrength(){
    let hasLower = false;
    let hasUpper = false;
    let hasSymbol = false;
    let hasNumber = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol= true;

    if(hasLower && hasUpper &&(hasNumber || hasSymbol) && passwordLength >=8){
        setIndicator("#0f0");
    } else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >=6){
        setIndicator("ff0")
    } else {
        setIndicator("#f00");
    }



}


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}




function shufflePassword(array){
    //fisher yates algorithm for shuffling the array 
    for(let i = array.length-1 ; i>=0 ;i--){
     const j = Math.floor( Math.random()*(i+1));
     //now replace i with j;
     const temp = array[i];
     array[i] = array[j];
     array[j] = temp;
     

    }
    let str = "";
     array.forEach((el) => (
        str +=el
        
     ));

    return str;

}





function handleCheckBoxChange(){
    checkCount =0;

    allCheckBox.forEach( (checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
 } );

 //special condition
 if(checkCount > passwordLength){
    passwordLength = checkCount;
    handleSlider();

 }

    

}




//adding eventlistner by which above function can be executed if we check more than given pss wordlenght than it is executed

allCheckBox.forEach( (checkbox) => {

    checkbox.addEventListener('change', handleCheckBoxChange) }
)


inputSlider.addEventListener('input' , (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

// copyBtn.addEventListener('click', () => {
//     if(passwordDisplay.value)
//         copyContent();
// })





generateBtn.addEventListener('click' ,() =>{


     if(checkCount ==0){
        return;
     }

     if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
     }
     password = "";


     let funcArr = [];

     if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
     }
     if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
     }
     if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
     }
     if(numberCheck.checked){
        funcArr.push(generateRandomNum);
     }

     for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passswordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calculateStrength();

 }
);









 


