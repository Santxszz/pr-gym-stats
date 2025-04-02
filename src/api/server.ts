import express, { type Request, type Response, type NextFunction } from "express";
import { errors } from "celebrate";
import errorHandler from "@api/v1/middlewares/errorHandler";
import userRoutes from "./v1/routes/user.route";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rotas
app.use('/api/v1/', userRoutes);

// Middleware de erro (deve ser o último)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});
app.use(errors()); 

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});