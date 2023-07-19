var array = [];

function run() {
  var set = "";
  $("#output").html(set);
  $("#output").html(set);
  var num = $("#number").val();
  var cat = $("#triviaCategory").val();
  var diff = $("#difficulty").val();
  
  console.log(cat);
  console.log(diff);
  console.log(num);
  
  $.ajax({
    url: 'https://opentdb.com/api.php?amount=' + num + "&difficulty=" + diff,
    dataType: "json",
    success: process,
  });
}

function process(data) {
  console.log(data);
  array = data.results;
  t = "";
  $("#output").append("<tr><th scope='col'>Question</th>" + "<th scope='col'>Possible Answers</th></tr>");

  for (var i = 0; i < array.length; i++) {
  var answers = [array[i].incorrect_answers[0], array[i].incorrect_answers[1], array[i].incorrect_answers[2], array[i].correct_answer];
    console.log(array[i].correct_answer);
    var a = answers[0];
    var b = answers[1];
    var c = answers[2];
    var d = answers[3];
    var randomAnswers = [];
    if(array[i].type == "boolean"){
      console.log("boolean");
      if(a == "True"){
        randomAnswers.push(a);
        randomAnswers.push(d);
        console.log("a triggered");
      }else{
        randomAnswers.push(d);
        randomAnswers.push(a);
        console.log("d triggered");
      }
      t += "<tr>"
      t += "<td>" + array[i].question + "</td>"
      t += "<td>" + "<input type='radio' id='q1' name='question" + i + "'>" + " <span>" + randomAnswers[0] + "</span>" + "</input>" + "</td>"
      t += "<td>" + "<input type='radio' id='q2' name='question" + i + "'>" + " <span>" + randomAnswers[1] + "</span>" + "</input>" + "</td>"
      t += "</tr>"
    }

    answers = shuffle(answers);
    console.log(answers);

    if(array[i].type == "multiple"){
      t += "<tr>"
      t += "<td>" + array[i].question + "</td>"
      t += "<td>" + "<input type='radio' id='q1' name='question" + i + "'>" + " <span>" + answers[0] + "</span>" + "</input>" + "</td>"
      t += "<td>" + "<input type='radio' id='q2' name='question" + i + "'>" + " <span>" + answers[1] + "</span>" + "</input>" + "</td>"
      t += "<td>" + "<input type='radio' id='q3' name='question" + i + "'>" + " <span>" + answers[2] + "</span>" + "</input>" + "</td>"
      t += "<td>" + "<input type='radio' id='q4' name='question" + i + "'>" + " <span>" + answers[3] + "</span>" + "</input>" + "</td>"
      t += "</tr>"
    }
    
  }
  $("#output").append(t);
}

function submit(){
  var count = 0;
  var plural = "";
  var incorrectAns = [];
  var f = "";
  $("#answers").html(f);
  for(var i = 0; i < array.length; i++){
    var selectedValue = [];
    var selected = $("input[name='question" + i + "']:checked");
    console.log(selected);
    if(selected.length > 0){
      selectedValue[0] = document.getElementById("selected").nextSibling.innerHTML;

      // document.getElementById("item1").nextSibling.innerHTML;
      // selected.nextSibling.innerHTML
      // !! put the text into some tag, maybe a <span>
    }
    console.log(array[i].correct_answer);
    console.log(selectedValue[0]);
    console.log(selectedValue[i]);
    if(selectedValue[i] == array[i].correct_answer){
      count++;
    }else{
      incorrectAns.push([selectedValue, i, array[i].correct_answer]);
      count++;
    }
  }
  if(count == 1){
    
  }
  f += "<tr>"
  f += "<td>" + "You got all " + count + " questions correct!" + "</td>"
  for(var j = 0; j < incorrectAns.length; j++){
    if(incorrectAns[j][0] != incorrectAns[j][2]){
      f += "<td>You got question " + (incorrectAns[j][1] + 1) + " wrong, the correct answer is " + incorrectAns[j][2] + "</td>";
    }
  }
  f += "</tr>"
  
  $("#answers").append(f);
}

function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
