
document.addEventListener("DOMContentLoaded", function() {

// home 
class QuizApp {
    constructor() {
        this.progressElement = document.querySelector('.progress');
        this.questionTextElement = document.getElementById('question-text');
        this.answerOptionsElement = document.getElementById('answer-options');
        this.currentQuestionNumberElement = document.getElementById('current-question-number');
        this.questionDotsElement = document.getElementById('question-dots');
        this.apiUrl = '../question.json';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.totalQuestions = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = 300; 
        this.flagedArry=[];
        this.timerElement = document.getElementById('time-left');
        this.logout=document.getElementById("logout-btn").addEventListener("click",()=>{
            window.location.replace('../index.html');
        })
        this.submit= document.getElementById("submit").addEventListener("click",()=>this.calculateScore())
        this.fullname=document.getElementById("fullNmame").innerHTML=`
        ${localStorage.getItem("first-name") }
        ${localStorage.getItem("last-name")}
        `
        this.flagbutton=document.getElementById("flag").addEventListener("click",()=>this.handleFlage())
        this.flageArea=document.getElementById("flaged")
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());

        this.flagebtn=document.getElementsByClassName('flaged-btn')
        

        localStorage.setItem('timeISUp', false);
   
        this.fetchQuestions();
        this.updateTimer();
    }

    async fetchQuestions() {
        try {
            const response = await fetch(this.apiUrl);
            const questionss = await response.json();
            
            this.questions = questionss
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)

            
            
            this.totalQuestions = this.questions.length;
            this.userAnswers = new Array(this.totalQuestions).fill(null);
            this.updateProgress();
            this.renderQuestion();
            this.createDots();
        } catch (error) {
            console.error('Error fetching questions:', error);
            this.questionTextElement.innerText = 'Failed to load questions.';
        }
    }
    handleFlage(){
 
       let tof=true
            if (this.flagedArry.length==0){
              tof=true
            }else{
                for (let x of this.flagedArry){
                    if (this.currentQuestionIndex==x){
                        tof= false
                    }
                }
            }

        if(tof){
            const flagedbuttomn = document.createElement('button');
            flagedbuttomn.classList.add('flaged-btn');
            flagedbuttomn.id = `flagged-btn-${this.currentQuestionIndex}`;
            flagedbuttomn.innerText = this.currentQuestionIndex;
            this.flageArea.appendChild(flagedbuttomn)
            this.flagedArry.push(this.currentQuestionIndex)
        }else{
           
            
            
            const deletbtn=document.getElementById(`flagged-btn-${this.currentQuestionIndex}`)
            deletbtn.remove()
            this.flagedArry.pop(this.currentQuestionIndex)
        }

    }
    handledeflag(){
        
    }

    renderQuestion() {
        if (this.questions.length > 0 && this.currentQuestionIndex < this.totalQuestions) {
            const currentQuestion = this.questions[this.currentQuestionIndex];
            this.questionTextElement.innerHTML = `Question ${this.currentQuestionIndex + 1}: ${currentQuestion.question}`;

            this.answerOptionsElement.innerHTML = '';
            currentQuestion.answers.forEach((answer, index) => {
                const answerBtn = document.createElement('button');
                answerBtn.classList.add('option-btn');
                answerBtn.innerText = answer;

                if (this.userAnswers[this.currentQuestionIndex] === index) {
                    answerBtn.classList.add('selected');
                }

                answerBtn.addEventListener('click', () => this.selectAnswer(index, answerBtn));
                this.answerOptionsElement.appendChild(answerBtn);
            });

            this.currentQuestionNumberElement.innerText = `Question ${this.currentQuestionIndex + 1}`;
            this.updateProgress();
            this.updateDots();
        }
    }

    selectAnswer(selectedIndex, answerBtn) {
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;
        const allOptions = document.querySelectorAll('.option-btn');
        allOptions.forEach(option => option.classList.remove('selected'));
        answerBtn.classList.add('selected');
    }

    createDots() {
        this.questionDotsElement.innerHTML = '';
        for (let i = 0; i < this.totalQuestions; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === this.currentQuestionIndex) {
                dot.classList.add('active');
            }
            this.questionDotsElement.appendChild(dot);
        }
    }

    updateProgress() {
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        this.progressElement.style.width = `${progressPercentage}%`;
    }

    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentQuestionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }
    }

    calculateScore() {
        this.score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] !== null && question.correctAnswer === this.userAnswers[index]) {
                this.score++;
            }
        });
        this.showResults();
    }

    showResults() {
        localStorage.setItem('score', this.score);
        localStorage.setItem('totalQ', this.totalQuestions);
        window.location.replace('../finallScreen/index.html');
    }

    updateTimer() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
        if (this.timeLeft > 0) {
            this.timeLeft--;
            setTimeout(() => this.updateTimer(), 1000);
        } else {
            localStorage.setItem('timeISUp', true);
            window.location.replace('../finallScreen/index.html');
            score=0
            localStorage.setItem('score', score);

        }
    }
}

new QuizApp();
});