const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '/Users/stepansalikov/CryptoManager/.env' });

module.exports = {
    registerUser,
    loginUser
};


async function registerUser(userData, res, client) {
    try {
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
                return;
            }
            console.log('Registration success:', response.success);

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.statusCode = 200;
            res.end(JSON.stringify({ success: response.success, token }));
        });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Unexpected error occurred' }));
    }
}


async function loginUser(userData, res, client) {
    try {
        const user = {
            email: userData.email,
            password: userData.password
        };

        client.LoginUser(user, (error, response) => {
            if (error) {
                console.error('Error logging in user:', error.message);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            console.log('Login success:', response.success);

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.statusCode = 200;
            res.end(JSON.stringify({ success: response.success, token}));
        });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Unexpected error occurred' }));
    }
}
