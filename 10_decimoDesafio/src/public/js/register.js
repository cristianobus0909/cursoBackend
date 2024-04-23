const form = document.getElementById('registerForm');

form.addEventListener('submit', (e)=>{
    e.preventDefault( );
    const data = new FormData(form);
    fetch('/api/users', {
        method: 'POST',  
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"  
        } 
    })
    .then((res) =>{
        if(res.status === 201){
            window.location.replace('/users/login')
        }
    })
})