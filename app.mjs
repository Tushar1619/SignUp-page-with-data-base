function signUp() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;
    if(repassword!=password){
        document.getElementById("message").innerHTML="Password does not match"
        return;
    }
    // 'https://fair-erin-lizard.cyclic.app/signup 
    axios.post('http://localhost:3000/signup', {
        firstName,
        lastName,
        email,
        password
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("message").innerHTML = response.data.message
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("message").innerHTML = error.response.data.message;
        });
}

function login() {
    let email = document.getElementById('lemail').value;
    let password = document.getElementById('lpassword').value;
    axios.post('http://localhost:3000/login', {
        email,
        password
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("lmessage").innerHTML = response.data.message  
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("lmessage").innerHTML = error.response.data.message
        });
}