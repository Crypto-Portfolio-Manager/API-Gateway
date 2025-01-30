module.exports = {
    registerUser,
    loginUser
};  
  
  function registerUser(userData, res, client) {
    const user = {
        email: userData.email,
        password: userData.password,
        name: userData.name
    };

    client.RegisterUser(user, (error, response) => {
        if (error) {
            console.error('Error registering user:', error.message);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
            console.log('Registration success:', response.success);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: response.success }));
        }
    });
}
function loginUser(userData, res, client) {
    const user = {
        email: userData.email,
        password: userData.password
    };

    client.LoginUser(user, (error, response) => {
        if (error) {
            console.error('Error login user:', error.message);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
            console.log('Login success:', response.success);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: response.success }));
        }
    });



}

  

