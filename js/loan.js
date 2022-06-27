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
        document.getElementById("emailError").style="color:red";
        document.getElementById("emailError").innerHTML='Please enter valid email Id';  
    }
    else {
        enableSubmitButton();
    }
    localStorage.setItem("mailout", mailId);
}

function PanValidation() {
    var regpan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    var panId = document.getElementById('pan').value;
    if (!regpan.test(panId)) {
        document.getElementById('submit').disabled = true;
        document.getElementById("panError").style="color:red";
        document.getElementById("panError").innerHTML='Pan Number should be in the form: "AAAAA 1234 B" \nNOTE:no spaces allowed in between';  
    }
    else
    {
        enableSubmitButton();
    }
    
}


function LoanAmtValidation() {
    var regamt = /\d{1,9}$/;
    var lamt = document.getElementById("loanAmt").value;
    if (!regamt.test(lamt)) {
        document.getElementById('submit').disabled = true;
        alert('please enter valid amount');
    }
    else if (lamt.length > 9) {
        document.getElementById('submit').disabled = true;
        alert('maximum digits allwed are 9 digits');
    }
    else {
    enableSubmitButton();
    }
}


function doConvert(){
    let numberInput = document.querySelector('#loanAmt').value ;
    let words = document.querySelector('#words');

    let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if(numberInput.toString().length > 9) 
    {
        return words.innerHTML = 'overlimit' ;
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
    localStorage.setItem("otp", val);
}
var attempt=0;
function ValidateOTP() {
    var a = localStorage.getItem(otp);
    var b = document.getElementById("otpin").value;
    if (a == b && b.length > 0) {
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
            alert('Invalid Code ');
            attempt = attempt + 1;
        }
    }
}

