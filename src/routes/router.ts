import {Router} from "express";
import router from "./tarefasRouter";

const handlerRouter = Router();

// rotas publicas
handlerRouter.use("/tarefas", router);

//rotas privadas
export default handlerRouter;