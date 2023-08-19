window.onload = function () {

    const loading = document.getElementById("loading");

    setTimeout(()=>{
    loading.style.opacity = "0";    
    loading.style.transform = "scale(0)";    
    loading.style.transition='all 1s';   
    
    },1200);

    // console.log(loading) 
}
    


