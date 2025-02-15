const {clientUser, clientPortfolio} = require('../config/proto.js')
const http = require('http');
const {registerUser, loginUser} = require('../controller/users_controller.js');
const {createPortfolio} = require('../controller/portfolio_controller.js')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const userData = JSON.parse(body);
            if (req.method === 'POST' && req.url === '/register') {
                registerUser(userData, res, clientUser);
            } else if (req.method === 'POST' && req.url === '/login') {
                loginUser(userData, res, clientUser);
            } else if (req.method === 'POST' && req.url === '/createPortfolio') {
                try {
                    const authHeader = req.headers['authorization'];
                    if (!authHeader || !authHeader.startsWith('Bearer ')) {
                        res.statusCode = 401;
                        res.end(JSON.stringify({ error: 'Authorization header missing or invalid' }));
                        return;
                    }

                    const token = authHeader.split(' ')[1];
                    let decoded;
                    try {
                        decoded = jwt.verify(token, JWT_SECRET);
                    } catch (err) {
                        res.statusCode = 401;
                        res.end(JSON.stringify({ error: 'Invalid or expired token' }));
                        return;
                    }

                    const email = decoded.email;
                    if (!email) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'Email not found in token' }));
                        return;
                    }

                    userData.email = email

                    createPortfolio(userData, res, clientPortfolio);
                    
                } catch (error) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                }
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});