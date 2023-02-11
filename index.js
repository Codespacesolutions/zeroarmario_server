const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT, connectDB } = require("./libs/libs");
const authRouter = require("./routers/authRouter");
const adminAuthRouter = require("./routers/adminAuthRouter");
const adminProductRouter = require("./routers/adminProductRouter");
const authorizationRouter = require("./routers/authorizationRouter");
const categoryRouter = require("./routers/categoryRouter");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);
app.use("/authorize", authorizationRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/product", adminProductRouter);
app.use('/api/product',adminProductRouter)
app.use("/api/admin/category/", categoryRouter);
app.use("/api/category",categoryRouter)

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
