const form = document.getElementById('loginForm');

form.addEventListener("submit", function(event) { 
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach(value,key  => obj[key] = value);
    fetch('/api/jwt/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(result=>{
        if (result.status === 200) {
            result.json( ).then((data)=>{
                console.log(document.cookie);
                alert("login realizado con exito")
                window.location.replace("/users");
        })
        } else {
            alert("Invalid username or password")
        }
    })

});