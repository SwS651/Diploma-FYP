//Declaraction
var btnSave = document.getElementById("btnSave");
var divAnsBox = document.getElementById('answerOption');
var formTitle = document.getElementById('form-Title');
var btnIncrease = document.getElementById('inc');
var btnDecrease = document.getElementById('dec');
var txtNumOption = document.getElementById('showNumOption');

var quesContent = document.getElementById('ques-Text');
var ansContent = document.getElementsByName('answerContent');
var ansCheck = document.querySelectorAll('#answerCheck');
var timeSelect = document.getElementById('time');
var typeSelect =document.getElementById('typeOfAnswer');
var intpoint = document.getElementById('point');
var intAttempts = document.getElementById('attempts');

var totalQuestion = 1;
var currentQuestion = 1;


//type of Answer option: change AnswerCheck <input> when select other type
function typeChange() {
    let typeOfSelect = document.getElementById('typeOfAnswer');
    let selectedText = typeOfSelect.options[typeOfSelect.selectedIndex].text;
 
    switch(selectedText){
        case 'MCQ':
            changeRadioOption();    //change to input=radio
        break;
        case 'Multiple Selection':
           changeCheckboxOption();  //input = checkbox
        break;
        case 'Short Answer':
            changeFillOption();     //input = text, hidden = true
        break;
        case 'Matching':
            changeMatchOption()     //input = text
        break;
    }
}

//increse or decrease answer option box
function btnAnsOption(){
    let btnid = event.target.id;
    let numOption = document.getElementsByName('answerContent').length;
    switch (btnid) {
        case 'dec':
                if (numOption>2) {
                    let parentDiv = document.getElementById('ansOption');
                    let divInput = document.querySelectorAll('.input-group');
                    let lastdiv = divInput[divInput.length-1];
                    lastdiv.parentNode.removeChild(lastdiv);
                }
            break;
        case 'inc':
                if (numOption<6) 
                    addAnswerOption();
                    
            break;
    }
    txtNumOption.value=ansContent.length;
}

// increase an answer option
function addAnswerOption(){
    let ansCheck
    let anstype = document.getElementById('typeOfAnswer').value;
    let divAnsOption = document.getElementById('answerOption');
    var ansNum = ansContent.length + 1;
    
    if(anstype=='fill')
        ansCheck = '<input type="text" id="answerCheck" name="ans" hidden=true>';
    else
        ansCheck = `<input type="${anstype}" id="answerCheck" name="ans" value="${ansNum}">`;

    divAnsOption.insertAdjacentHTML('beforeend',`
        <div class="input-group" style="margin-bottom: 10px;">
            <div class="input-group-prepend">
                <span class="input-group-text">${ansCheck}</span>
            </div>
            <input name="answerContent" id="${ansNum}" type="text" class="form-control">
        </div>`);
}

//for fill
function btnAnsFill(){
    let numOption = document.getElementsByName('answerContent').length;
    while(numOption != 1){
        let divInput = document.querySelectorAll('.input-group');
        let lastdiv = divInput[divInput.length-1];
        lastdiv.parentNode.removeChild(lastdiv);
    }
    
    txtNumOption.value=ansContent.length;
}

function ansOptionsSeparater(){
    //var ans = document.getElementById('answerText').value;
    if(document.getElementById("answerText").value.includes('[')){
        const answers = (document.getElementById("answerText").value).toString().split("[");
        var ans1 = ""
        for (let i = 0; i < answers.length; i++) {
            ans1 = ans1 + answers[i] + " ";
        }
        document.getElementById("answerText").value = ans1;
    }else{
        document.getElementById("answerText").value = document.getElementById("answerText").value;
    }
}


//For editQuestion.html
function loadAnsOptions(){
    //alert("try")
    ansOptionsSeparater();
    var numOptions = document.getElementById('answerText').value;
    let anstype = document.getElementById('typeOfAnswer').value;
    let numOption = document.getElementsByName('answerContent').length;
    var ansChecker = document.getElementById('checkText').value;


    var ansNum = numOption + 1;
   
    const num = numOptions.split(";");
    const ansCheckers = ansChecker.split(";");

    while(ansNum != num.length){
        addAnswerOption();
        document.getElementById(ansNum).value = num[(ansNum-1)];
        //alert(num[0])
        ansNum = ansNum + 1;
    }
    txtNumOption.value=ansContent.length;
    console.log(ansCheckers.toString())
    var ansCheck2 = document.querySelectorAll('#answerCheck')
    for (let i = 0; i < ansCheck2.length; i++) {
        if(anstype=="radio" || anstype=="checkbox")
        {
            if(ansCheckers[i] == "True"){
                ansCheck2[i].checked = true
            }else{
                ansCheck2[i].checked = false
            }
            
            
        }
        else if (anstype == "Matching"){
            ansCheck2[i].value = ansCheckers[i]
     
        }
            
    }
}


//these 4 function are for <select>, change type of Answer
function changeRadioOption() {
    document.querySelectorAll('#answerCheck').forEach(element=>{
        element.removeAttribute('hidden');
        element.type = 'radio'
    });
}
function changeCheckboxOption() {
    document.querySelectorAll('#answerCheck').forEach(element=>{
        element.removeAttribute('hidden');
        element.type = 'checkbox'
    });
}
function changeFillOption() {
    document.querySelectorAll('#answerCheck').forEach(element=>element.setAttribute('hidden',true));
}

function changeMatchOption() {
    let allAnswerCheck = document.querySelectorAll('#answerCheck');
    for (let i = 0; i < allAnswerCheck.length; i++) {
        allAnswerCheck[i].removeAttribute('hidden');
        allAnswerCheck[i].type = 'text';
    }
}