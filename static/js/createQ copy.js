var questions = {}
var currentQuestion;
var arrAns = new Array();
var arrcheck = new Array();
var totalQues = 1;

var questionBox = document.getElementById('questionBox');
var num_Of_Ans_Input_Option = document.getElementById('txtNumber');

/*Check currently input option*/
function checkCurrentOption(){
    let selectedIndex = $('#type-option option:selected').index();
    if(selectedIndex==0|| selectedIndex==1 ||selectedIndex==2)
        if ($('.ansContainer input[type=text]').length>4) {
            return (document.querySelectorAll('.ansContainer input[type=text]').length)/2;
        }else
            return document.querySelectorAll('.ansContainer input[type=text]').length;
    else if(selectedIndex==3 ||selectedIndex||4)
    {
        if($('.ansContainer input[type=text]').length<4)
            return (document.querySelectorAll('.ansContainer input[type=text]').length);
        else
            return (document.querySelectorAll('.ansContainer input[type=text]').length)/2;
        
    }
}
function checkSelectedValue(){return $('#type-option option:selected').val()}



function clickQues()
{
    alert('hello');
}


function setForm()
{
    num_Of_Ans_Input_Option.value = 4;
    let selectTag = document.getElementsByTagName('select');
    selectTag[0].selectedIndex = 1;
    questionBox.innerHTML=`<div class='quesContainer' >
                                <div class="textarea" id="text-question" contenteditable="True" placeholder="Write your question here"></div>
                                </div>
                                <br>
                                
                                <div class="ansContainer">
                                    <input type="text"  group="group-1" id="input1" class="ansBox box1" placeholder="Answer option 1" >
                                    <input type="radio" group="group-1" id="ans1"   class='ans' data-type="radio" name="ans" checked='True'>

                                    <input type="text"  group="group-2" id="input2" class="ansBox box2" placeholder="Answer option 2" >
                                    <input type="radio" group="group-2" id="ans2"   class='ans'  data-type="radio" name="ans">

                                    <input type="text"  group="group-3" id="input3" class="ansBox box3" placeholder="Answer option 3"> 
                                    <input type="radio" group="group-3" id="ans3"   class='ans' data-type="radio" name="ans">

                                    <input type="text"  group="group-4" id="input4" class="ansBox box4" placeholder="Answer option 4">
                                    <input type="radio" group="group-4" id="ans4"   class='ans' data-type="radio" name="ans">     
                                </div>
                                <div>
                                    <button>Cancel</button>
                                    <button type="button" id="btnNext" onclick="btnNext()">Next</button>
                            </div>`
}

function saveQuestion(index,answerContent,answercheck) {
    questions[index] = {
        no :`${index}`,
        quesContent : document.querySelector('#text-question').innerHTML,
        anscontent : answerContent,
        answer : answercheck,
        totalOption : checkCurrentOption(),
        selectedIndex : checkSelectedValue()   
    };

    console.log(answerContent)

    
}
//////
function foo(){
    return arguments;
}

function saveAttribute(currentIndex){
    $(`.question-list>ul>li a[href='#question${currentIndex}']`).attr('data-question',`${questions[currentIndex].quesContent}`)
    $(`.question-list>ul>li a[href='#question${currentIndex}']`).attr('data-anscontent',`${questions[currentIndex].anscontent}`)
    $(`.question-list>ul>li a[href='#question${currentIndex}']`).attr('data-answer',`${questions[currentIndex].answer}`)
    $(`.question-list>ul>li a[href='#question${currentIndex}']`).attr('data-totalOption',`${questions[currentIndex].totalOption}`) 
}

function clearinput(){
    var inputs = document.querySelectorAll('.type-ans input');
    inputs.forEach(input=> input.value=''); 
}

/*listening <select> Tag  (dropdownlist) */
$('#type-option').change(function(){
    //console.log($('#type-option option:selected').index());
    //take previous total of answer option
    //...saveQuestion();
    let intpre_answer_option = checkCurrentOption();                             
    
    ////clear the Answer option, and add it again
    $('.ansContainer').empty();
    for (let index = 1; index <= intpre_answer_option; index+=1)
    {  
        setInputOption(index);
    } 
    num_Of_Ans_Input_Option.value=intpre_answer_option;
})


//reset Input option/ change type of option
function setInputOption(index){               
    switch($('#type-option option:selected').index()){
        case 0: //MCQ
                $('.ansContainer').append(`
                    <input type="text"  group="group-${index}" id="input${index}" class="ansBox ${index}" placeholder="Answer option ${index}" >
                    <input type="radio" group="group-${index}" id="ans${index}"   class='ans' data-type="radio" name="ans" checked='True'>
                `)
            break;
        case 1: //Checkbox
                $('.ansContainer').append(`
                    <input type="text"  group="group-${index}" id="input${index}" class="ansBox ${index}" placeholder="Answer option ${index}" >
                    <input type="checkbox" group="group-${index}" id="ans${index}"   class='ans' data-type="checkBox" name="ans">
                `)
            break;
        case 2: //Fill in
                $('.ansContainer').append(`
                    <input type="text"  group="group-${index}" id="input${index}" class="ansBox ${index}" placeholder="Answer option ${index}" >
                `)
            break;
        case 3:  // Matching
        case 4:
                $('.ansContainer').append(`
                <input type="text"  group="group-${index}" id="input${index}" class="ansBox ${index}" placeholder="Text option ${index}" >
                <input type="text"  group="group-${index}" id="input${index}" class="ansBox ${index}" placeholder="Matching option ${index}" >
                `)
            break;
          
    } 
}


/*Add or remove input option*/
function btnAnsOption(){
   //let numOfInputOption = document.querySelectorAll('.type-ans input[type=text]').length+1;
    switch(event.target.id){
        case 'dec':
            if(parseInt(num_Of_Ans_Input_Option.value)<=2)
                num_Of_Ans_Input_Option.value=2;
            else{
                
                
                $('.ansContainer').children(`input[group="group-${num_Of_Ans_Input_Option.value}"]`).remove();
                $('.ansContainer').children(`input[id=ans]`).remove();
                num_Of_Ans_Input_Option.value = parseInt(num_Of_Ans_Input_Option.value)-1;
            }
             
             break;

        case 'inc':
            if (parseInt(num_Of_Ans_Input_Option.value)>=6)
                num_Of_Ans_Input_Option.value=6;
            else
            {
                num_Of_Ans_Input_Option.value = parseInt(num_Of_Ans_Input_Option.value)+1;
                //var inputOption =''
                //inputOption = `<input type="text" group="group-${num_Of_Ans_Input_Option.value}" class="ansBox box${num_Of_Ans_Input_Option.value}" placeholder="Answer option ${num_Of_Ans_Input_Option.value}">`
                setInputOption(num_Of_Ans_Input_Option.value);
                //$('.ansContainer').append(inputOption);
            }
            break;
    }
}






//listening current option
// $('#btnNext').click(
//     function() {
//        console.log('current option: '+checkCurrentOption())

//        console.log(currentQuestion);
//     }
// );

//$('.question-list>ul>li').click(
    
    //function(){
         //clearinput();
         //alert('clicked')

         //get currentlist index and <a></a>
        //  currentIndex = $(this).index();
        //  let clickques = document.getElementById(event.target.id);
        //  console.log(clickques);
        //  let questioncontent = clickques.getAttribute('data-question');
        //  let answercontent = clickques.getAttribute('data-anscontent');
        //  answercontent = answercontent.split(",");
        //  document.getElementById('text-question').innerText=questioncontent;
        

        //  console.log(questioncontent);
        //  console.log(clickques);
        //  console.log(answercontent);

        
        
   // }
//)

/*aside 1 here, no complete yet*/
// function btnNext(){
//     arrAns.length=0;
//     arrcheck.length=0;
//     let delEmpty =[];

//      $('.ansContainer input[type=text]').each(function(){
//              arrAns.push($(this).val());
//              if ($(this).val()=='') {
//                  delEmpty.push(arrAns.length-1);
//              }
//      })
    
//      $('.ansContainer input[name="ans"]').each(function(){
//          if ($(this).is(':checked'))
//              arrcheck.push($(this).is(':checked'));
//          else
//              arrcheck.push($(this).is(':checked'));
//      })
    
//      for (let i = 0; i < delEmpty.length; i++) {
//          arrAns.splice(delEmpty[i],1)
//          arrcheck.splice(delEmpty[i],1)
//      }
    
//     saveQuestion(totalQues,arrAns,arrcheck);
    
//     $('.question-list>ul').append(`<li onclick='clickQues()'><a href='#question${totalQues}' id='question-${totalQues}' num='${totalQues}'>Question ${totalQues}</a></li>`)
    
//     saveAttribute(totalQues);
//     currentQuestion = questions[totalQues];
//     arrAns=[];
//     arrcheck=[];
//     totalQues++;
    
//     $('#questionBox').empty();
    
//     clearinput();
//     setForm();
//     console.log(currentQuestion);
    
// }
























//At creteQ.js
// //Question list: click <li>
// quesUl.onclick = function(event) {

//     //get current click <li>
//     var li = event.target;
//     //Get the element attributes in <li> again
//     setForm(li);

//     //Add question button and Save question button, 
//     //if click previous <li> addquestion button set disabled, and show save button
//     if(formTitle.innerHTML!=quesLi[quesLi.length-1].textContent){
//         btnAdd.disabled = true;
//         btnSave.hidden =false
//     }
//     else{
//         btnAdd.disabled = false;
//         btnSave.hidden = true;
//     }
// }; 

//line : set attribute data of <li> to container
// function setForm(li) {
//     formTitle.innerHTML = li.innerHTML;
//     quesContent.value = li.getAttribute('quesText');
//     let answer = li.getAttribute('ansText')
//     let check  = li.getAttribute('ansCheck');

//     if(answer){
//          answer = answer.split(',');
//          check = check.split(',');
//     }
    
//     //type (MCQ/Fill/Matching), set selected index to <select></select>
//     for (let i = 0; i < typeSelect.length; i++) {
//        if (typeSelect.options[i].text == li.getAttribute('type')) {
//            typeSelect.options[i].selected = "selected";
//            typeChange();
//        }
//     }
//     //Time select, set selected index to <select></select>
//     for (let i = 0; i < timeSelect.length; i++) {
//        if (timeSelect.options[i].text == li.getAttribute('time'))
//            timeSelect.options[i].selected = "selected";
//     }

//     //clear the Answer option, and add new option.
//     divAnsBox.innerHTML="";
//     for (let i = 0; i < parseInt(li.getAttribute('numOption')); i++) {
//         addAnswerOption();
//         ansContent[i].value = answer[i];
//         console.log(check[i])
//         // if ((typeSelect.options[typeSelect.selectedIndex].text)=="MCQ") 
//         // {
//         //     if(check[i]==true)//////////////////////////////////////////////////
//         //         ansCheck[i].setAttribute('checked','checked');
            
//         // }
//         // if ((typeSelect.options[typeSelect.selectedIndex].text)=="Matching") 
//         //     ansCheck[i].value = check[i];
        
        
        
//     }
//     //set point 
//     intpoint.value = li.getAttribute('point');
    
// }


// //set data to <li> attribute
// function setQuestionList(numquestion) {

//     let selectedTime = timeSelect.options[timeSelect.selectedIndex].text;
//     let selectedType = typeSelect.options[typeSelect.selectedIndex].text;
//     let answerContent = new Array();
//     let answerChecking = new Array();

//     //General>?  for add question and go back or next...
//     for (let i = 0; i < quesLi.length; i++) {
//         if (quesLi[i].textContent == formTitle.textContent) {
//             quesLi[i].textContent = "Question " + numquestion;
//             quesLi[i].setAttribute("value", "Question " + numquestion);
//             quesLi[i].setAttribute("quesText", quesContent.value.trim());
//             quesLi[i].setAttribute('time',selectedTime);
//             quesLi[i].setAttribute('type',selectedType);
            
//             for (let i = 0; i < ansContent.length; i++) {
//                 answerContent.push(ansContent[i].value.trim());
//                // answerChecking.push(ansCheck[i].checked);
//                 if (selectedType=="MCQ"||selectedType=="MCQs")
//                     answerChecking.push(ansCheck[i].checked);
//                 if (selectedType=="Matching")
//                     answerChecking.push(ansCheck[i].value.trim());
//                 if (selectedType=="Short Answer")
//                     answerChecking.push("None");
//             }

//             quesLi[i].setAttribute("ansText", answerContent);
//             quesLi[i].setAttribute("ansCheck", answerChecking);
//             quesLi[i].setAttribute("point",intpoint.value);
//             quesLi[i].setAttribute("numOption",answerChecking.length);
//         }
//     }

//     answerContent.length = 0;
//     answerChecking.length = 0;
// }

// //Clear Question container, set default
// function defaultForm() {
//     document.querySelector('#ques-Text').value = "";
//     document.getElementsByName('answerContent').forEach(e=>e.value="");
//     //ansCheck.forEach(e=>e.value="");
//     document.getElementById('time').options.selectedIndex = 0;
//     document.getElementById('typeOfAnswer').options.selectedIndex = 0;
//     document.getElementById('point').value = 0;
//     document.getElementById('attempts').value = 1;

    
//     divAnsBox.innerHTML="";

//     // divAnsBox = document.createElement('div');
//     let div1 = `<div class="input-group" style="margin-bottom: 10px;">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text"><input type="radio" id="answerCheck" name="ans" ></span>
//                     </div>
//                     <input name="answerContent" type="text" class="form-control">
//                 </div>`
    
//     for (let i = 0; i < 4; i++) { divAnsBox.insertAdjacentHTML('beforeend',div1); }
// }

/**
 * function saveEdit() {
    let num = formTitle.textContent;
    num = num.substr(num.length-1);
    setQuestionList(num);
    alert("Saved")
}

function submitForm() {

    var answerInput = ""
    var answerC = ""
    let anstype = document.getElementById('typeOfAnswer').value
    document.getElementsByName('answerContent').forEach(input =>{
        answerInput = answerInput + input.value +";"
    } )

    //  Get Answer Check
    var ansCheck = document.querySelectorAll('#answerCheck')
    for (let i = 0; i < ansCheck.length; i++) {
    
        if(anstype=="radio" || anstype=="checkbox")
        {
            if(ansCheck[i].checked)
                answerC = answerC + "True;"
            else
                answerC = answerC + "False;"
        }
        else if (anstype =="Matching")
            answerC = answerC + ansCheck[i].value +";"
    
    }

    document.getElementsByName('answerText').value = answerInput
    document.getElementsByName('checkText').value = answerC
    alert(answerC)
    console.log(answerC)
    return true
}


//Add new question to question list <li>
function btnAddToList()
{
    let quesUl = document.getElementById('ques-List');
    setQuestionList(totalQuestion);
    totalQuestion+=1;
    //currentQuestion = totalQuestion;
    document.getElementById('form-Title').textContent = "*Question "+totalQuestion;
    quesUl.insertAdjacentHTML('beforeend',`<li class="nav-item" value="*Question ${totalQuestion}" questext="" time="10s" type="MCQ" anstext="" anscheck="true,false,false,false" point="1" numOption="4">*Question ${totalQuestion}</li>`)
    defaultForm();
}

 */