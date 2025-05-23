import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import { errors } from "celebrate";
import cors from "cors";
import errorHandler from "@api/v1/middlewares/errorHandler";
import userRoutes from "./v1/routes/user.route";
import healthRouter from "./v1/routes/health.route";
import trainingRouter from "./v1/routes/training.route";
import equipamentRouter from "./v1/routes/equipament.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/training", trainingRouter)
app.use("/api/v1/equipament", equipamentRouter)

// Errors Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	errorHandler(err, req, res, next);
});
app.use(errors());

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
