const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({ static: "public" });
const multer = require("multer");

server.use(middlewares);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post("/upload", upload.single("file"), (req, res) => {
  return res.status(200).json(req.file.filename);
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
