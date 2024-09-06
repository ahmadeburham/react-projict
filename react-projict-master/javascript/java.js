document.addEventListener("DOMContentLoaded", function () {
    let score = Number(localStorage.getItem("score"));
    let totalQuestions=Number(localStorage.getItem("totalQuestions"));
    let time=localStorage.getItem("timeISUp");
    let main = document.getElementById("main");

    if(time==true) {
        main.innerHTML = `
        <div class="timeOut">

            <div class="container">
                <h3>your time is out</h3>
                <img src="../img/th-2269865930.png" alt="">
            </div>
        </div>
`; }else if (score === 10) {
        main.innerHTML = `
        <div class="pirfctscore">
            <div class="left">
                <h3>CONGRATIOANS GOOOD JOPE FOR THE PIRCT SCORE</h3>
                <P>YOU GOT A 10/10</P>
            </div>
            <div class="right">
                <img src="../img/th-3618339294.png" alt="">
            </div>
        </div>`;
    } else if (score > 0) {
        main.innerHTML = `
        <div class="score">
            <h3>hi<br>your score is${score}/${totalQuestions} <br></h3>
            <img src="../img/download.jpeg" alt="">
        </div>`;
    }  
});
