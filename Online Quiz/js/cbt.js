var pos = 0, test, test_status, question , choice, Avalable_choices, chA, chB, chC, correct= 0;
var totQuestion = questions.length;

function putQuestion() {
	test = document.getElementById('test');
	question = questions[pos][0];
	chA = questions[pos][1];	 
	chB = questions[pos][2]; 
	chC = questions[pos][3];
	test.innerHTML ="<h3>"+question+"</h3>";
	test.innerHTML +="<input type='radio' name='choices' value ='A' class='answer'> "+chA+"<br>";	 
	test.innerHTML +="<input type='radio' name='choices' value ='B' class='answer'> "+chB+"<br>";	 
	test.innerHTML +="<input type='radio' name='choices' value ='C' class='answer'> "+chC+"<br> <br>";
	test.innerHTML +="<button onclick = 'checkAnswer()' class='answer btn btn-danger'> Submit Answer </button>";	 
}
function checkAnswer(){
	Avalable_choices = document.getElementsByName('choices');
	for (var i = 0; i < Avalable_choices.length; i++) {
		if (Avalable_choices[i].checked) {
			choice = Avalable_choices[i].value;
		}
	}
	if (choice == questions[pos][5]) {
		correct++;
	}
	pos++;
	document.getElementById('test_status').innerHTML = "Question "+(pos + 1)+" of "+questions.length;
	putQuestion();
}

function countDown(secs, elem){
	var allAnswer=document.getElementsByClassName("answer");
	var element =document.getElementById(elem);
	element.innerHTML="<p style='color:rgb(242, 60, 60);'>You have "+secs+" seconds left</p>";
	document.getElementById('test_status').innerHTML = "Question "+(pos + 1)+" of "+questions.length;
	secs--;
	var timer = setTimeout('countDown('+secs+',"'+elem+'")', 1000);
	if (secs< 1) {
		clearTimeout(timer);
		element.innerHTML='<h3 style="color:rgb(242, 60, 60);"> Time Up</h3>';
		for (var i=0; i < allAnswer.length; i++) {
			allAnswer[i].disabled="disabled";
		}
		document.getElementById('notFinish').innerHTML ="You got "+correct+" of "+questions.length+" questions correct :";
		document.getElementById('notFinish').innerHTML += "&nbsp; " + gradeAnswer(correct, totQuestion) + "%";

	}
	if (pos>=questions.length) {
		test.innerHTML ="<h2>You got "+correct+" of "+questions.length+" questions correct :" + "&nbsp;" +gradeAnswer(correct, totQuestion) + "%"+"</h2>";
		clearTimeout(timer);
		document.getElementById('test_status').innerHTML = "Test Completed";
		return false;
	}
}
function gradeAnswer(correct, totQuestion) {
	var percent = (correct/totQuestion) * 100;
	var result = Math.round(percent * 100)/100;
	return result;
}

putQuestion();
countDown(20, 'counter');
