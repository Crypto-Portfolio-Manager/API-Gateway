const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const http = require('http');
const {registerUser, loginUser} = require('../controller/users_controller.js');


const PROTO_PATH = '/Users/stepansalikov/CryptoManager/API-Gateway/proto/user.proto'
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const usersProto = grpc.loadPackageDefinition(packageDefinition).usersproto;
const client = new usersProto.Greeter('localhost:50051', grpc.credentials.createInsecure());


    

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                registerUser(userData, res, client);
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }

    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                loginUser(userData, res, client);
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});


    server.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
