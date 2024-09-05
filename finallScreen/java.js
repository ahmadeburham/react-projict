let score = null

let main=document.getElementById("main")
if (typeof(score)=="number" && score==10 ){
    main.innerHTML=`
            <div class="pirfctscore">
            <div class="left">
                <h3>
                    CONGRATIOANS GOOOD JOPE FOR THE PIRCT SCORE
                
                </h3>
                <P>YOU GOT A 10/10</P>

            </div>
            <div class="right">
                <img src="./th-3618339294.png" alt="">
            </div>

        </div>
    
    `


}else if(typeof(score)=="number" && score !=0){
    main.innerHTML=`
            <div class="score">

                <h3>
                    hi
                     <br>
                    your score is
                    <br>
                    

                </h3>

                <img src="download.jpeg" alt="">

        </div>
    
    
    
    `

    
}else{
main.innerHTML=`
        <div class="timeOut">
            <div class="container">
                <h3>your time is out</h3>
                <img src="./th-2269865930.png" alt="">
            </div>
        </div>


`

}