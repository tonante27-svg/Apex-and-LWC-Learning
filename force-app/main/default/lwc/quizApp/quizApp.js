import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    correctAnswers = 0; // to show the result
    myQuestions = [
        {
            id:"Question1",
            question: "Which one of the following is not a template loop?",
            answers:{
                    a:"for:each",
                    b:"iterator",
                    c:"map loop"
            },
            correctAnswer:"c"
        },
        {
            id:"Question2",
            question: "Which of the following is invalid in LWC component folder?",
            answers:{
                    a:".svg",
                    b:".apex",
                    c:".js"
            },
            correctAnswer:"b"
        },
          {
            id:"Question3",
            question: "Which of the following is not a directive?",
            answers:{
                    a:".for:each",
                    b:"lwc:if",
                    c:"@track"
            },
            correctAnswer:"c"
        },
    ];
    isSubmitted = false;//used to verify if the quiz form has been submitted.
    selected={};// for storing user's selected answers
    // Gets the number of sleected answers form the form  for every click on the radio button options
      changeHandler(event){
        const{name,value} = event.target;
        this.selected={...this.selected,[name]:value}
    }
    // Disables the Submit button if all the questionshave nt been answered yet
    get allNotSelected(){
        const result =
        Object.keys(this.selected).length !== this.myQuestions.length;

        console.log('Selected count:', Object.keys(this.selected).length);
        console.log('Submit disabled:', result);

        return result;    
    }

    get allSelected(){
        return (Object.keys(this.selected).length === this.myQuestions.length) ;

    }
    // Prints out the winning banner when all quesitons have been answered correctly after Submit button click.
    get winnerScore(){
        return this.correctAnswers === this.myQuestions.length;
    }
    //Prints out the  losing banner when all quesitons have been answered correctly after Submit button click.
    get isNotAllCorrect(){
        return this.correctAnswers !== this.myQuestions.length && (Object.keys(this.selected).length === this.myQuestions.length) ;
    }
    //Is A Dynamic class styler that prints a Large banner Text when all answers are correct.
    get isScoredFull(){
        return `slds-var-m-around_medium slds-text-heading_large ${this.myQuestions.length == this.correctAnswers ? 'slds-text-color_success' : 'slds-text-color_error' }`;
    }
    // Sets the corrects answers and lets the form know that the answers have all been submitted
    submitHandler(event){
        //event.preventDefault();
        const correct =  this.myQuestions.filter(item=>this.selected[item.id] ===item.correctAnswer);
        this.correctAnswers = correct.length;
        this.isSubmitted = true;
    }
    //Resets the form 
    resetHandler(){
        this.selected = {};
        this.correctAnswers = 0;
        this.isSubmitted = false;
    }
}