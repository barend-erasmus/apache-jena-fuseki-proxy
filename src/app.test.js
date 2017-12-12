const expect = require('chai').expect;
const app = require('./app.js');
const request = require('supertest');

describe('Test: Authentication', () => {
    it('should return 200 given valid JWT', (done) => {
        request(app.server)
            .get('/')
            .set('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTMwNzM2NzksImV4cCI6MTU0NDYwOTY3OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ztYr6ftkKIJxBT1kzfr-5E378rLkARMjr4JkzAYwcCk')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });

    it('should return 401 given invalid format header', (done) => {
        request(app.server)
            .get('/')
            .set('authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTMwNzM2NzksImV4cCI6MTU0NDYwOTY3OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ztYr6ftkKIJxBT1kzfr-5E378rLkARMjr4JkzAYwcCk')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });

    it('should return 401 given invalid JWT', (done) => {
        request(app.server)
            .get('/')
            .set('authorization', 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTMwNzM2NzksImV4cCI6MTU0NDYwOTY3OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.MIt_y2GRCcRHfNQO72v_Vja6zJrkvPvMiu8EFPcYtWU')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });
});