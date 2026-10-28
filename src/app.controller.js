import connectDB from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import userRouter from "./modules/user/user.controller.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/notFoundHandler/notFoundHandler.js";
import cors from "cors";

const boottstrap = async (app, express) => {
  app.use(cors());
  // Connect to the database
  await connectDB();

  // Middleware
  app.use(express.json());

  app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "hello saraha app" });
  });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  // Routes
  app.all("/{*splat}", notFoundHandler);

  // Error handling middleware
  app.use(globalErrorHandler);
};

export default boottstrap;
