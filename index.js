const http = require("http");
const getPage = require('./src/getPage.js');

const PORT = process.env.PORT || 5500;


const server = http.createServer(
    async (req, res) => {
        try {
            res.writeHead(200, { 'Content-Type': "text/html; charset=utf-8;" });
            const html = await getPage(req, res);
            res.end(html);
        } catch (error) {
            if (error.code) {
                res.writeHead(error.code, { "Content-Type": "text/plain" });
                res.write(`${error.message}\n`);
            } else {
                console.error(error.name, error.stack);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.write(`Internal Server Error\n`);
            }
            res.end();
        }
    }
)

server.listen(PORT, () => {
    console.log(`Server is started at port: ${PORT}`)
});
