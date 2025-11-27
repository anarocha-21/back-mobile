import express from "express";
import { Request, Response, NextFunction } from "express";
import router from "./routes/tarefasRouter";

const app = express();
app.use(express.json())

app.use("/tarefas", router)

// rota generica
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("hello word!");
});


//rota de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("erro na resquisição");
});

export default app;
