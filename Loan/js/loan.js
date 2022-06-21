function NameValidation() {
    var RegName = /^[a-zA-Z]+\s+[a-zA-Z]{4,}$/;
    var full_name = document.getElementById("fn").value;
    var ind = full_name.indexOf(' ');
    if (!RegName.test(full_name)) {
        alert('name should contain 2 words having alphabets and 4 letters each');
    }
    else if (!ind > 3) {
        alert('name should contain 2 words having alphabets and 4 letters each');
    }
    
    var [first, last] = full_name.split(' ');
    localStorage.setItem("nameout", first);
}

function EmailValidation() {
    var regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var mailId = document.getElementById('email').value;
    if (!regMail.test(mailId)) {
        alert('Please enter valid email Id');
    }
    localStorage.setItem("mailout", mailId);
}

function PanValidation() {
    var regpan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    var panId = document.getElementById('pan').value;
    if (!regpan.test(panId)) {
        alert('Pan Number should be in the form: "AAAAA 1234 B" \nNOTE:no spaces allowed in between');
    }
}

function PhoneValidation() {
    var regph = /^\d{11}$/;
    var phn = parseInt(document.getElementById('telephone').value);
    if (!regph.test(phn)) {
        alert('Invalid Phone Number');
    }
}

function LoanAmtValidation() {
    var regamt = /\d{1,9}$/;
    var lamt = document.getElementById("loanAmt").value;
    if (!regamt.test(lamt)) {
        alert('please enter valid amount');
    }
    else if (lamt.length > 9) {
        alert('maximum digits allwed are 9 digits');
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

    let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
  
    outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
    outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
    outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
    outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `)  + ' rupees only ' : ''; 

    words.innerHTML = outputText;
}

function CaptchaGenerate() {
    var Rnum1 = Math.floor((Math.random() * 10));
    var Rnum2 = Math.floor((Math.random() * 100));
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
            operator = "*";
            ActualResult = Rnum1 * Rnum2;
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
       
    }
    else {
        document.getElementById("captchamsg").innerHTML = "Try Again";
        document.getElementById("captchamsg").style = "color:red";
        document.getElementById("result").innerHTML = "";
        
    }

}

function generateOtp() {
    const val = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("otpout").value = val;
}

function ValidateOTP() {
    var a = document.getElementById("otpin").value;
    var b = document.getElementById("otpout").value;
    if (a == b) {
        window.location.href = "http://pixel6.co/";
    }
    else {
        alert('Invalid Code ');
    }
}

