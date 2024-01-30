var cardBody = document.querySelector('.card-body');
var cardFooter = document.querySelector('.card-footer');
const btnNext = document.getElementById('btnNext');

var question = {}
//Change string to array, split ";" = [1,2,3,4,5]
let answerSplit;
let ansCheckSplit;
var num = document.getElementById('qtans').value;
for (let i = 0; i < parseInt(num); i++) {

   var quesTxt = document.getElementById(`question${i + 1}`).value
   var answerTxt = document.getElementById(`qansOption${(i + 1)}`).value
   var ansCheck = document.getElementById(`qansCheck${(i + 1)}`).value
   var point = document.getElementById(`qmark${(i + 1)}`).value
   var tmer = document.getElementById(`qtime${(i + 1)}`).value
   var quesType = document.getElementById(`qtype${(i + 1)}`).value;

      answerSplit = answerTxt.split(';');
      ansCheckSplit = ansCheck.split(';');
      question[i] = {
         ques: quesTxt,
         ans: answerSplit,
         ansChck: ansCheckSplit,
         p: point,
         timee: tmer,
         typ: quesType
      }
      question[i].ansChck.pop()
      question[i].ans.pop()
}

   console.log(question)

   const timeCount = document.getElementById('timer_sec');
   var currNum = 0;
   var questiontitle = document.getElementById('question-title');

   function checkAnswer() {

      clearInterval(counter);
      if (event.target.id == "btnstart") {
         cardFooter.innerHTML = `
            <div id="nextDiv" class="text-center">
               <button  class="btn btn-secondary" id="btnNext" onclick="checkAnswer()">Next</button>
            </div>`;

      } else
         results(event.target.id);

      setQuestion();

      //If the currNum out of questions, set Result page
      console.log("currNum = " + currNum)
      if (currNum == Object.keys(question).length) {
         generateReport();
      }



   }


   function generateReport() {
      currNum = Object.keys(question).length;
      clearInterval(counter);
      let totalPoint = 0
      let totalTime = 0
      let correct = 0
       for (let i = 0; i < Object.keys(report).length; i++) {
         if (report[i].point == question[i].p)
               correct += 1;   
         
           totalTime += report[i].time
           totalPoint += report[i].point;
      }
      var title = document.getElementById('quizTitle').value
      
      cardBody.innerHTML = `
                           <form id="reportForm" action="/start/submit" onsubmit="submit_result();" method="POST">
                              <input type="hidden" id="quizReport" name="quizReport" value="None">
                              <div class="form-group row">
                                 <label class="col-sm-3 col-form-label">Quiz Name: </label>   
                                 <p>${title}<p>
                              </div>
                              <div class="form-group row">
                                 <label class="col-sm-3 col-form-label">Correct Questions: </label>   
                                 <p>${correct}/${currNum}<p>
                              </div>
                              <div class="form-group row">
                                 <label class="col-sm-3 col-form-label">Time Taken: </label> 
                                 <p>${totalTime}s <p>
                              </div>
                              <div class="form-group row">
                                 <label class="col-sm-3 col-form-label">Total Mark: </label> 
                                 <p>${totalPoint}<p>    
                              </div>
                           </form>`;

      questiontitle.textContent="Report"
      cardFooter.innerHTML = "";
      cardFooter.insertAdjacentHTML("beforeend", `
                                                <button data-toggle="modal" data-target="#modalReport">View Answer</button>
                                                <div class="text-center">
                                                      <button type="button" class="btn btn-secondary" onclick="submit_result();">Confirm</button>
                                                </div>`);

      modal_result_question_Box();
   }

   function modal_result_question_Box() {
      let strBox = "";
      
      for (let i = 0; i < Object.keys(report).length; i++) {
         let yourAns = "";
         let correctAns = "";
         switch (question[i].typ) {
            case 'radio':
               correctAns=""   

               for (let j = 0; j < question[i].ans.length; j++) { 
                  if (question[i].ans[j]==report[i].playerAnswer) {
                     //correctAns+=question[i].ans[j]
                     yourAns+=`<div class="input-group" style="margin-bottom: 10px;">
                                       <div class="input-group-prepend">
                                          <span class="input-group-text">
                                             <input type="radio" id="answerCheck" checked disabled>
                                          </span>
                                       </div>
                                       <input name="answerContent" type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                              </div>`
                  }
                  else{
                     yourAns+=`<div class="input-group" style="margin-bottom: 10px;">
                                       <div class="input-group-prepend">
                                          <span class="input-group-text">
                                             <input type="radio" id="answerCheck" disabled>
                                          </span>
                                       </div>
                                       <input name="answerContent" type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                              </div>`
                  }
                  
                  if (question[i].ansChck[j]=="True") {
                     
                     correctAns+=`<div class="input-group" style="margin-bottom: 10px;">
                                 <div class="input-group-prepend">
                                    <span class="input-group-text">
                                       <input type="radio" id="answerCheck" checked disabled>
                                    </span>
                                 </div>
                                 <input name="answerContent" type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                              </div>`
                  }
               }

               strBox +=`<div class="card">
                           <div class="card-header">
                                 <h3 class="card-title">Question ${i+1}</h3>
                              </div>
                              <div class="card-body">
                              <p>${question[i].ques}</p>
                              <label>Your answer: </label>
                              ${yourAns}
                              
                           </div>
                           <div class="card-footer">
                              <label class="col-form-label">Correct Answer: </label>
                              
                              <span class="text-success">${correctAns}</span>
                              
                           </div>
                         </div>`

               break;
            case 'checkbox': 
            correctAns=""              
              
                              
      
            for (let j = 0; j < question[i].ans.length; j++) {
               yourAns+=`<div class="input-group" style="margin-bottom: 10px;">
                              <div class="input-group-prepend">
                                 <span class="input-group-text">`;

               if (question[i].ansChck[j]=="True") {
                  correctAns+=`<div class="input-group" style="margin-bottom: 10px;">
                                 <div class="input-group-prepend">
                                    <span class="input-group-text">
                                       <input type="checkbox" id="answerCheck" checked disabled>
                                    </span>
                                 </div>
                                 <input name="answerContent" type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                              </div>`
               }

               if (report[i].playerAnswer[j] =="True") {
                  yourAns+=`  <input type="checkbox" checked disabled>
                            </span>
                           </div>
                              <input type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                           </div>`;
               }
               else{
                  yourAns+=` <input type="checkbox" disabled>
                            </span>
                           </div>
                              <input type="text" class="form-control" value="${question[i].ans[j]}" disabled>
                           </div>`;
               }

            }
            strBox +=`<div class="card">
                        <div class="card-header">
                              <h3 class="card-title">Question ${i+1}</h3>
                           </div>
                           <div class="card-body">
                           <p>${question[i].ques}</p>
                           <label>Your answer: </label>
                           ${yourAns}
                           
                        </div>
                        <div class="card-footer">
                           <label class="col-form-label">Correct Answer: </label>
                           
                           <span class="text-success">${correctAns}</span>
                           
                        </div>
                     </div>`
    
            break;
            case 'fill':
               correctAns=""   
   
               for (j=0;j<question[i].ans.length;j++) {
                  if(correctAns==""){
                     correctAns = correctAns + question[i].ans[j]
                  }else{
                     correctAns = correctAns + ' or ' + question[i].ans[j] 
                  }
                  
               }
               strBox +=`<div class="card">
                        <div class="card-header">
                              <h3 class="card-title">Question ${i+1}</h3>
                           </div>
                           <div class="card-body">
                           <p>${question[i].ques}</p>
                           <label>Your answer: </label>
                           <input type="text" disabled value="${report[i].playerAnswer}">
                        </div>
                        <div class="card-footer">
                           <label class="col-form-label">Correct Answer: </label>
                           <span class="text-success">${correctAns}</span>
                        </div>
               </div>`
   
               break;
            case 'Matching':
               correctAns=""
               
               for (let j = 0; j < question[i].ansChck.length; j++) {
                  yourAns += `<div class="col">             
                                 <div class="row">
                                    <div class="col-5">
                                       <div class="form-group border  bg-yellow disabled p-2">
                                          <p>${report[i].playerAnswer[j]}</p>
                                       </div>
                                    </div>
                                    <div class="col-5">
                                       <div class="form-group bg-yellow disabled  p-2">
                                          <p>${question[i].ansChck[j]}</p>
                                       </div>
                                    </div>
                                 </div>                                 
                              </div>`

                  correctAns += `<div class="col">             
                                       <div class="row">
                                          <div class="col-5">
                                             <div class="form-group border   bg-success p-2">
                                                <p>${question[i].ans[j]}</p>
                                             </div>
                                          </div>
                                          <div class="col-5">
                                             <div class="form-group border   bg-success p-2">
                                                <p>${question[i].ansChck[j]}</p>
                                             </div>
                                          </div>
                                       </div>                                 
                                    </div>`
               }

               strBox +=`<div class="card">
                              <div class="card-header">
                                 <h3 class="card-title">Question ${i+1}</h3>
                              </div>
                              <div class="card-body">
                                 <p>${question[i].ques}</p>
                                 <label>Your answer: </label>
                                    ${yourAns}
                              </div>
                              <div class="card-footer">
                                 <label class="col-form-label">Correct Answer: </label>
                                 ${correctAns}
                              </div>
                            
                        </div>`
   
               
               break;

         }
         
      }
      let modalBody = document.getElementById('reportBody')
      modalBody.innerHTML = strBox
   }

   function submit_result() {
  
      var totalyourAns = "";

      for (let i = 0; i < Object.keys(report).length; i++) {
   
         switch (question[i].typ) {
            case 'radio':
               totalyourAns = totalyourAns + `${report[i].playerAnswer}` + "[}";
               break;
            case 'checkbox':                 
               totalyourAns = totalyourAns + `${report[i].playerAnswer}` + "[}";
               break;
            case 'fill':
               totalyourAns = totalyourAns + `${report[i].playerAnswer}` + "[}";
               break;
            case 'Matching':
             
               totalyourAns = totalyourAns + `${report[i].playerAnswer}` + "[}";       
               break;

         }
     
      }

      document.getElementById('hiddenQuizReport').value = totalyourAns

      currNum = Object.keys(question).length;
      clearInterval(counter);
      var totalPoint = ""
      var totalTime = ""
      var correct = 0
      for (let i = 0; i < Object.keys(report).length; i++) {
         if (report[i].point != 0) {
            correct += 1;      
         }
         totalPoint += report[i].point.toString() + ";";
         totalTime += report[i].time.toString() + ";";
      }
 
      document.getElementById('hiddenQuizRatio').value = correct.toString() + "/" + currNum.toString()
      document.getElementById('hiddenTotalTime').value = totalTime
      document.getElementById('hiddenTotalPoint').value = totalPoint

      document.getElementById('reportForm1').submit();
   }

   var report = {}
   function results(e) {
      //get the button that bind with checkAnswer()
      let point = 0;
      let getD = document.getElementById(e);
      let plyAns;
      console.log(getD.textContent);
      switch (question[currNum].typ) {
         case 'radio':
            let ans = "-"
            console.log(question[currNum].ans.length)
            for (let i = 0; i < question[currNum].ans.length; i++) {
               if (getD.textContent == question[currNum].ans[i] && question[currNum].ansChck[i] == "True"){
                  point = question[currNum].p
               }else if(getD.textContent == "Next"){
                  ans = "None"
               }
            }
            if(ans == "None"){
               plyAns = ans;
            }else{
               plyAns = getD.textContent;
            } 
            break;
         case 'checkbox':
            let checkedAns = document.getElementsByName('answer')
            let checkboxAns = []
            let numOfTrue = 0
      
            console.log(checkedAns.textContent)
   
            for (i = 0; i < (question[currNum].ansChck).length; i++){
               if(question[currNum].ansChck[i].toString() == 'True'){
                  numOfTrue = numOfTrue + 1
               }
            }
            let checkboxPoint = Math.round(question[currNum].p/numOfTrue)
            for (i = 0; i < checkedAns.length; i++) {
               if (checkedAns[i].checked)
                  checkboxAns.push('True')
               else
                  checkboxAns.push('False')
            }

            for (i = 0; i < (question[currNum].ansChck).length; i++){
               if(question[currNum].ansChck[i].toString() == 'True' && checkboxAns[i].toString() == 'True' ){
                  point = point + checkboxPoint
               }
            }
            if(point>question[currNum].p)
               point = question[currNum].p

            plyAns = checkboxAns;
            break;

         case 'fill':
            plyAns = document.getElementById('fill_area').value

            for (i = 0; i < question[currNum].ans.length; i++){
               if(question[currNum].ans[i].toString() == plyAns ){
                  point = question[currNum].p
               }
               
            }
            break;

         case 'Matching':
            var matchCheck = document.getElementsByName('matchCheck')
            var matchTxt = "None"
            var arrMatchAns =[]
            var arrMatchBox =[]
            for (let i = 0; i < matchCheck.length; i++) {
                  

               var matchTxt = "None"
               if(document.getElementById(`div${i+1}`).childNodes.length!=0){
                  let childAns = document.getElementById(`div${i+1}`).lastChild.textContent.trim()
  
                  matchTxt=childAns
               }
               
               arrMatchAns.push(document.getElementById(`div${i+1}`).previousElementSibling.textContent.trim())
               arrMatchBox.push(matchTxt)

                  
            }plyAns = arrMatchBox
            let matchPoint = Math.round(question[currNum].p/question[currNum].ans.length)
            for (i = 0; i < question[currNum].ans.length; i++){
               if (question[currNum].ans[i].toString() == plyAns[i].toString()) {
    
                  point = point + matchPoint
               }
            }
            if (plyAns.toString() == question[currNum].ans.toString()) {
 
                  point = question[currNum].p
            }

            break;
      }
      var timeUsed = parseInt(question[currNum].timee) - parseInt(timeCount.textContent)
      console.log(timeUsed)
      if(timeUsed <= 0){
         timeUsed = 1
      }
      report[currNum] = {
         playerAnswer: plyAns,
         time: timeUsed,
         point: parseInt(point)
      }
      currNum += 1;
   }

   function setQuestion() {
      console.log(Object.keys(question).length)
      cardFooter.hidden = false;

      //Check the valid range of questions
      if (currNum <= Object.keys(question).length - 1) {
         //start count down
         startTimer(question[currNum].timee)

         questiontitle.textContent = question[currNum].ques;
         timeCount.textContent = parseInt(question[currNum].timee)
         cardBody.innerHTML = "";

         //check and setup type of question
         switch (question[currNum].typ) {
            case 'radio':
               //Hide the next button
               cardFooter.hidden = true;
               //Setup option
               for (let i = 0; i < question[currNum].ans.length; i++) {
                  cardBody.insertAdjacentHTML('beforeend', `<div class="form-group">
                  <button type="button" id="btn${i + 1}" onclick="checkAnswer()" class="btn-lg btn-block" name="answer" style="text-align: justify;">${question[currNum].ans[i]}</button>
                  </div>`)
               }

               break;

            case 'checkbox':

               for (let i = 0; i < question[currNum].ans.length; i++) {

                  console.log(question[currNum].ans.length)
                  cardBody.insertAdjacentHTML('beforeend', `<div class="custom-control custom-checkbox">
                        <input type="checkbox" value=""  name="answer" style="width:20px; height:20px">
                        <label class="form-check-label">${question[currNum].ans[i]}</label>
                     </div>`)
               }
               break;
            case 'fill':

               cardBody.insertAdjacentHTML('beforeend', `<div class="form-group">
                     <textarea id="fill_area" style="width:100%;"></textarea>
                  </div>`)
               break;

            case 'Matching':

               var ansOption = ""
               var ansmatching = ""
               console.log(question[currNum].ans.length)
               //Set the matching option, answer block and check block
               for (let i = 0; i < question[currNum].ans.length; i++) {
                  ansOption = ansOption + `<div class="form-group border border-primary p-2" id="drap${i + 1}" name="matchAnswer" style="text-align: justify;" draggable="true"
                        ondragstart=" drag(event) ">
                              ${question[currNum].ans[i]}
                        </div>`


                  ansmatching = ansmatching + `<div class="form-group" name="matchBox">
                           <div class="p-1 mb-2 bg-secondary" name="matchCheck">${question[currNum].ansChck[i]}
                           </div>
                           <div class="droparea" id="div${i + 1}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
                        </div>`
               }

               //insert both of block into HTML page
               cardBody.insertAdjacentHTML('beforeend', `<div class="row">
                              <div class="col">
                                 <div id="dragarea" class="dragarea" ondrop="drop(event)" ondragover="allowDrop(event)">
                                    ${ansOption}
                                 </div>
                              </div>
                              <div class="col" id="matchContainer">
                                 ${ansmatching}   
                              </div>
                           </div>
                  `)
               break;
         }
         //end Switch(question[currNum].typ)  
      }
   }