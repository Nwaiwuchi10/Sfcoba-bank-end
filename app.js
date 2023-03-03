const express = require("express");
// const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");

const multer = require("multer");
const userRoute = require("./routes/users");

const authRoute = require("./routes/auth");
const eventPostRoute = require("./routes/eventPost");
const projectsRoute = require("./routes/projects");
const announcementRoute = require("./routes/announcement");
const tributeRoute = require("./routes/tribute");
const calenderRoute = require("./routes/calender");
const hallFameRoute = require("./routes/hallFame");
const businessAdvertRoute = require("./routes/businessAdvert");
// const playerRoute = require("./routes/player");
// const leagueteamsRoute = require("./routes/leagueteams");
// const tournamentRoute = require("./routes/tournament");
// const imageRoute = require("./routes/imageGallery");
// const uploadRoutes = require("./routes/uploadRoutes");

const router = express.Router();
const cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");
const config = require("config");

////init app
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

app.use(cors());
// const dotenv = require("dotenv");

// dotenv.config();
dotenv.config({ path: "./config.env" });

///
const server = http.createServer(app);
//

////
if (process.env.NODE.ENV === "development") {
  app.use(morgan("dev"));
}
//
// Db config
const db = config.get("mongoURI");

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log(`MongoDb Connected`))
  .catch((err) => console.log(err));

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );

// app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", eventPostRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/announcement", announcementRoute);
app.use("/api/tribute", tributeRoute);
app.use("/api/calender", calenderRoute);
app.use("/api/hallfame", hallFameRoute);
app.use("/api/businessAdvert", businessAdvertRoute);
// app.use("/api/match", gameFixturesRoute);
// app.use("/api/teams", teamRoute);
// app.use("/api/officials", officialsRoute);
// app.use("/api/coaches", coachRoute);
// app.use("/api/players", playerRoute);
// app.use("/api/vl/media", mediaRoutes);
// app.use("/public ", express.static(path.join(__dirname, "public")));
app.use("./uploadsfile", express.static(path.join(__dirname, "./uploadsfile")));

// const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
