/**
 * Created by Damian on 10/08/2017.
 */
let score = 0; //set initial input
const numbers = document.querySelectorAll('button[data-key]'); // get every button with data-key
const deleteButtons = document.querySelectorAll('.delete-buttons'); //get all clear buttons


// function responsible for numbers pressed on keyboard
function keyboardFunction(e){
    const button = document.querySelector(`button[data-key="${e.key}"]`); // get button with data-key pressed
    const equalButton = document.querySelector('button[data-key="="'); // get button with equal data-key
    const output = document.querySelector('.output p'); //get output paragraph
    button.classList.add('pressed'); // add class 'pressed' to button with pressed data-key
    if(!button || score.length >= 22) {return;} // button is null or  score length is longer or equal to 22 stop function
    else if(button === equalButton) {  // pressed button is '=' return score on html
        score = eval(score);
        return output.innerHTML = score;
    }
    else if(score === 0){ // when score is equal to 0 set score to pressed button
        if(/\+|\*|\/|\./g.test(`${e.key}`)) {return;} // if pressed button is + or / or * or . stop function
        score = `${e.key}`;
        output.innerHTML = score;
    }else if(score !== 0){ //when score is diffrent than 0 add to to score pressed number or sign
      score += `${e.key}`;
      if(/\+\+|\+-|\+\*|\+\/|\+\.|--|-\+|-\*|-\/|-\.|\/\/|\/\+|\/-|\/\*|\/\.|\*\*|\*\+|\*\/|\*-|\*\.|\.\+|\.-|\.\/|\.\*|\.\./g.test(score)){ // when pressed 2 times aritmetical signs change it to last pressed sign
        score = score.replace(/\+\+|\+-|\+\*|\+\/|\+\.|--|-\+|-\*|-\/|-\.|\/\/|\/\+|\/-|\/\*|\/\.|\*\*|\*\+|\*\/|\*-|\*\.|\.\+|\.-|\.\/|\.\*|\.\./g, `${e.key}`);
      }  // if pressed double time + - * / . replace with last pressed button
    output.innerHTML = score;
  }
}

// function resposible for clicking buttons
function mouseFunction() {
    const clickedButton = this.dataset.key; //get data-key value of clicked button
    const button = this; // get clicked button
    const equalButton = document.querySelector('button[data-key="="').dataset.key; // get eqal button
    const output = document.querySelector('.output p'); //output

    button.classList.add('pressed'); //add class pressed to clicked button

    if(clickedButton === equalButton){ //clicked button is '=' return score on html
        score = eval(score);
        return output.innerHTML = score;
    }
    else if(score === 0){ //when score is equal to 0 set score to clicked button
      if(/\+|\*|\/|\./g.test(clickedButton)) {return;} // if clicked button is + or / or * or . stop function
        score = clickedButton;
        output.innerHTML = score;

    }else if(score !== 0) //when score is diffrent than 0 add to score clicked number or sign
        score += clickedButton;
        if(/\+\+|\+-|\+\*|\+\/|\+\.|--|-\+|-\*|-\/|-\.|\/\/|\/\+|\/-|\/\*|\/\.|\*\*|\*\+|\*\/|\*-|\*\.|\.\+|\.-|\.\/|\.\*|\.\./g.test(score)){
          score = score.replace(/\+\+|\+-|\+\*|\+\/|\+\.|--|-\+|-\*|-\/|-\.|\/\/|\/\+|\/-|\/\*|\/\.|\*\*|\*\+|\*\/|\*-|\*\.|\.\+|\.-|\.\/|\.\*|\.\./g, clickedButton);
        } // if clicked double time + - * / . replace with last pressed button
        output.innerHTML = score;
}

//function resposible for removing animation
function removeAnimation(e){
  this.classList.remove('pressed');
}

//function resposible for clear buttons
function clearFunction(){
  const deleteButton = this.value; //get clicked button value
  const output = document.querySelector('.output p'); //output
  if(deleteButton === 'AC'){ //if value is 'AC' set score back to 0
    this.classList.add('pressed'); //add class 'pressed' to clicked button
    score = 0;
    output.innerHTML = score;
  }else if( deleteButton === 'CE'){ //if value is 'CE' do one of things
    this.classList.add('pressed');
    if(score.lastIndexOf('+') > 0){
      score = score.slice(0, score.lastIndexOf('+'));
      output.innerHTML = score;
    }else if(score.lastIndexOf('-') > 0){
      score = score.slice(0, score.lastIndexOf('-'));
      output.innerHTML = score;
    }else if(score.lastIndexOf('/') > 0){
      score = score.slice(0, score.lastIndexOf('/'));
      output.innerHTML = score;
    }else if(score.lastIndexOf('*') > 0){
      score = score.slice(0, score.lastIndexOf('*'));
      output.innerHTML = score;
    }
  }
}

//event listeners

document.addEventListener('keydown', keyboardFunction); //run func keyboardFunction after pressed button
numbers.forEach(key => key.addEventListener('click', mouseFunction));  //run func mouseFunction after mouse click
numbers.forEach(key => key.addEventListener('transitionend', removeAnimation)); //run func removeFunction after transition ends
deleteButtons.forEach(button => button.addEventListener('click', clearFunction)); //run func clearFunction after mouse click
deleteButtons.forEach(button => button.addEventListener('transitionend', removeAnimation)); //run func removeFunction after transition ends
