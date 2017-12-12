const http = require('http');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');

const proxy = httpProxy.createProxyServer({
    target: 'http://192.168.46.189:3030'
});

const server = http.createServer((req, res) => {
    const token = getTokenFromWebRequest(req);

    if (token) {
        try {
            const decodedJWT = jwt.verify(token, 'my-secret');
            proxy.web(req, res);
        } catch (err) {
            sendInvalidJWTResponse(res);
        }
        return;
    } else {
        sendInvalidJWTResponse(res);
    }
});

function sendInvalidJWTResponse(res) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        message: 'Invalid jwt.'
    }));
    res.end();
}

function getTokenFromWebRequest(req) {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return null;
    }

    if (tokenHeader.split(' ').length < 2) {
        return null;
    }

    if (tokenHeader.split(' ')[0].toLowerCase() !== 'bearer') {
        return null;
    }

    return tokenHeader.split(' ')[1];
}

if (!module.parent) {
    server.listen(3031);
}

module.exports = {
    server,
};