document.addEventListener("DOMContentLoaded", function() {
    let longinForm =document.getElementById("login")
longinForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    let user =document.getElementById("userName").value;
    let password =document.getElementById("password").value;
    
    const usesr= localStorage.getItem('first-name');
    const passwordd= localStorage.getItem('password');

    
    if (user === usesr && password === passwordd) {
        window.location.assign("../welcome/index.html");
        

    }else{
        
        
    }
    
    
})

});