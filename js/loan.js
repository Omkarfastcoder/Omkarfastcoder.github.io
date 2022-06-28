function NameValidation() {
    var RegName = /^[a-zA-Z]+\s+[a-zA-Z]{4,}$/;
    var full_name = document.getElementById("fn").value;
    var ind = full_name.indexOf(' ');
    if (!RegName.test(full_name)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("nameError").visible=true;
        document.getElementById("nameError").style="color:red";
        document.getElementById("nameError").innerHTML='name should contain 2 words having alphabets and 4 letters each';
    }
    else if (ind < 4) {
        document.getElementById('submit').disabled = true;
        document.getElementById("nameError").visible=true;
        document.getElementById("nameError").style="color:red";
        document.getElementById("nameError").innerHTML='name should contain 2 words having alphabets and 4 letters each';  
    }
    else {
        document.getElementById("nameError").visible=false;
        document.getElementById("nameError").innerHTML='';
        enableSubmitButton();
    }
    var [first, last] = full_name.split(' ');
    localStorage.setItem("nameout", first);
}

function enableSubmitButton()
{
    if((document.getElementById("fn").value.length > 0) &&
       (document.getElementById("email").value.length > 0) &&
       (document.getElementById("pan").value.length > 0) &&
       (document.getElementById("loanAmt").value.length > 0) )
       {
       document.getElementById('submit').disabled = false;
       }
}
function EmailValidation() {
    var regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var mailId = document.getElementById('email').value;
    if (!regMail.test(mailId)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("emailError").visible=true;
        document.getElementById("emailError").style="color:red";
        document.getElementById("emailError").innerHTML='Please enter valid email Id';  
    }
    else {
        document.getElementById("emailError").visible=false;
        document.getElementById("emailError").innerHTML='';
        enableSubmitButton();
    }
    localStorage.setItem("mailout", mailId);
}

function PanValidation() {
    var regpan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    var panId = document.getElementById('pan').value;
    if (!regpan.test(panId)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("panError").visible=true;
        document.getElementById("panError").style="color:red";
        document.getElementById("panError").innerHTML='Pan Number should be in the form: "AAAAA 1234 B" \nNOTE:no spaces allowed in between';  
    }
    else
    {
        document.getElementById("panError").visible=false;
        document.getElementById("panError").innerHTML='';
        enableSubmitButton();
    }
    
}


function LoanAmtValidation() {
    var regamt = /\d{1,9}$/;
    var lamt = document.getElementById("loanAmt").value;
    if (!regamt.test(lamt)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("words").visible=true;
        document.getElementById("words").style="color:red";
        document.getElementById("words").innerHTML='please enter valid amount';  
    }
    else if (lamt.length > 9) {
        document.getElementById('submit').disabled = true;
        document.getElementById("words").visible=true;
        document.getElementById("words").style="color:red";
        document.getElementById("words").innerHTML='maximum digits allwed are 9 digits';  
    }
    else {
    enableSubmitButton();
    }
}

function f1()
{
    var num=document.getElementById("loanAmt").value;
 var word=convert(num);
 document.getElementById("words").style="color:green";
 document.getElementById("words").innerHTML = word;

}

function f2(n)
{
    let unit = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    
let str='';
    if(n<20)
    {
        str=unit[n];

    }
    else if(n>=20 && n<100)
    {
        str=tens[Math.trunc(n/10)] + " " + unit[n%10];
        
    }
    return str;
}

function convert(n)
{
let ss='';
if (n<100)
{
    ss=" And " +f2(n);
}
 else if(n>=100 && n<1000)
 {
     ss= f2( Math.trunc(n/100)) + " hundred " + convert(n%100);
 }
 else if(n>=1000 && n<100000)
 {
     ss= f2( Math.trunc(n/1000)) + " thousand " + convert(n%1000);
 }
 else if(n>=100000 && n<10000000)
 {
     ss=f2( Math.trunc(n/100000)) + " lakh " + convert(n%100000);
 }
 else if(n>=10000000 && n<1000000000)
 {
     ss=f2( Math.trunc(n/10000000)) + " crore " + convert(n%10000000);
    
 }
 return ss;
}


function numberToWord()
{
    let numberInput = document.querySelector('#loanAmt').value ;
    let words = document.querySelector('#words');

    let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    
    var num = numberInput;
    var digits = [];
    while (num > 0) {
        digits.push(num % 10);
        num = Math.trunc(num / 10);
    }
  // digits.reverse();
   var size = digits.length;

   var wordString = [];
   var k=0;
   for (var i=0; i<size; i++)
   {
    if (numberInput < 9)
    {
        wordString[i] = oneToTwenty[digits[i]];
    }
    else if (numberInput < 20 && numberInput > 9)
    {
        var tw = digits[i] + 10;
        wordString[i] = oneToTwenty[tw]; // + digits[i+1]*10];
        i = i+1;
    }
    else
    {
    if(i==0)   // ones
        wordString[i] = oneToTwenty[digits[i]];
    else if(i==1)   // tens
    {
        wordString[i] = tenth[digits[i]];
    }
    }
    if(i==2)  // hundred
    {
        wordString[i] =  oneToTwenty[digits[i]] + "hundred ";
    }
    else if(i==3)
    {
        if( i +1 < size)
        {
            if (digits[i] + digits[i+1]*10 < 20)
            {
                wordString[i] = oneToTwenty[digits[i] + 10] + "thousand"
                i=i+1;
            }
            else
            {
            wordString[i] =  oneToTwenty[digits[i]] + "thousand " ;
            i = i+1;
            wordString[i] = tenth[digits[i]];
            }
        }
        else
        {
            wordString[i] =  oneToTwenty[digits[i]] + "thousand ";
        }
    }
    else if(i==5)
    {
        if( i +1 < size)
        {
            if (digits[i] + digits[i+1]*10 < 20)
            {
                wordString[i] = oneToTwenty[digits[i] + 10] + "lacs"
                i=i+1;
            }
            else
            {
            wordString[i] = oneToTwenty[digits[i]] + "lacs ";
            i = i+1;
            wordString[i] = tenth[digits[i]]
            }
        }
        else
        {
            wordString[i] =  oneToTwenty[digits[i]] + "lacs ";
        }
    }
    else if(i==7)
    {
        if( i +1 < size)
        {
            if (digits[i] + digits[i+1]*10 < 20)
            {
                wordString[i] = oneToTwenty[digits[i] + 10] + "coroe"
                i=i+1;
            }
            else
            {
            wordString[i] = oneToTwenty[digits[i]] + "coroe" ;
            i = i+1;
            wordString[i] = tenth[digits[i]]
            }
        }
        else
        {
            wordString[i] =  oneToTwenty[digits[i]] + "coroe ";
        }
    }
   } 
   wordString.reverse();
   document.getElementById("words").style="color:green";
   document.getElementById("words").innerHTML = wordString;
}



function doConvert(){
    let numberInput = document.querySelector('#loanAmt').value ;
    let words = document.querySelector('#words');

    let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if(numberInput.toString().length > 9) 
    {
        document.getElementById("words").style="color:red";
        return words.innerHTML = 'maximum digits allwed are 9 digits';
    }
    console.log(numberInput);
    //let num = ('0000000000'+ numberInput).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  let num = ('0000000'+ numberInput).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    console.log(num);
    if(!num) return;

    let outtxt = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' crore ' : ''; 
    outtxt +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'lakh ' : ''; 
    outtxt +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
    outtxt +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
    outtxt +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `)  + ' rupees only ' : ''; 

    document.getElementById("words").style="color:green";
    words.innerHTML = outtxt;
}
function CaptchaGenerate() {
    var Rnum1 = Math.floor((Math.random() * 10));
    var Rnum2 = Math.floor((Math.random() * 10));
    var opNum = Math.floor((Math.random() * 3) + 1);

    var userResult = document.getElementById("result").value;
    document.getElementById("num1").innerHTML = Rnum1;
    document.getElementById("num2").innerHTML = Rnum2;
    var operator;
    var ActualResult;
    switch (opNum) {
        case 1:
            operator = "+";
            ActualResult = Rnum1 + Rnum2;
            break;
        case 2:
            operator = "-";
            ActualResult = Rnum1 - Rnum2;
            break;
        case 3:
            operator = "+";
            ActualResult = Rnum1 + Rnum2;
            break;
    }
    document.getElementById("operator").innerHTML = operator;
    localStorage.setItem("ActualResult",ActualResult);
}

function CaptchaValidation()
{
    var userResult = document.getElementById("result").value;
    var ActualResult=localStorage.getItem("ActualResult");
    if (ActualResult == userResult) {
        document.getElementById("captchamsg").innerHTML = "Captcha validation Successful";
        document.getElementById("captchamsg").style = "color:green";
        document.getElementById("result").innerHTML = "";
        enableSubmitButton();
        NameValidation();
        EmailValidation();
        PanValidation();
        LoanAmtValidation();
    }
    else {
        document.getElementById('submit').disabled = true;
        document.getElementById("captchamsg").innerHTML = "Try Again";
        document.getElementById("captchamsg").style = "color:red";
        document.getElementById("result").innerHTML = "";
        
    }

}

function generateOtp() {
    const val = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP IS = " + val)
    localStorage.setItem("otp1", val);
}
var attempt=0;
function ValidateOTP() {
    var a = localStorage.getItem("otp1");
    var b = document.getElementById("otpin").value;
    if (a == b && b.length > 0) {
        document.getElementById("otpError").visible=false;
        document.getElementById("otpError").innerHTML='';
        attempt =0;
        window.location.href = "http://pixel6.co/";
    }
    else if(b.length > 0) {
        if (attempt > 2)
        {
            attempt = 0;
            window.location.href = "http://pixel6.co/error.html";
        }
        else
        {
            document.getElementById("otpError").visible=true;
            document.getElementById("otpError").style="color:red";
            document.getElementById("otpError").innerHTML='Invalid OTP, try again';   
            attempt = attempt + 1;
        }
    }
}

