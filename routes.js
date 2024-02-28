// const fs = require("fs");

// const requestHandler = (req, res) => {
//   const url = req.url;
//   const method = req.method;
//   if (url === "/") {
//     // it sends back an HTML form for users to enter a message.
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<head><title>Enter Message</title></head>");
//     res.write(
//       "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send !</button> </form></body>"
//     );
//     res.write("</html>");
//     return res.end();
//   }
//   if (url === "/message" && method === "POST") {
//     const body = [];
//     req.on("data", (chunk) => {
//       body.push(chunk);
//     });
//     req.on("end", () => {
//       const parsedBody = Buffer.concat(body).toString();
//       console.log(parsedBody);
//       const message = parsedBody.split("=")[1];
//       fs.writeFileSync("message.txt", message, (err) => {
//         res.statusCode = 302; //redirection status code
//         res.setHeader("Location", "/");
//         return res.end();
//       });
//     });
//   }
//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>Project101</title></head>");
//   res.write("<body><h1>Hello From my Node.js Server </h1> </body>");
//   res.write("</html>");
//   res.end();
// };

// // process.exit()}
// module.exports = { requestHandler };
const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // it sends back an HTML form for users to enter a message.
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send !</button> </form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Internal Server Error");
        } else {
          res.statusCode = 302; // redirection status code
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Project101</title></head>");
  res.write("<body><h1>Hello From my Node.js Server </h1> </body>");
  res.write("</html>");
  res.end();
};

module.exports =  requestHandler ;
