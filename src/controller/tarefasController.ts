import {Request, Response, NextFunction} from "express";
import tarefasRepository from "../repositories/tarefasRepository";
import Tarefa from "../model/tarefa";


async function getTarefas(req: Request, res: Response, next:NextFunction){
  const result = await tarefasRepository.getTarefas()
  res.json(result)
}

async function getTarefa(req: Request, res: Response, next:NextFunction){
  const {id} = req.params
  const result = await tarefasRepository.getTarefa(parseInt(id))
  const code = result ? 200 : 404
  res.status(code).json(result)
}

async function criarTarefa(req: Request, res: Response, next:NextFunction){
  const tarefa = req.body as Tarefa

  try{
    const result = await tarefasRepository.criarTarefa(tarefa)
    return res.status(201).json(result)

  }catch(error){
    console.log("erro ao criar", error)
    return res.status(400).json({erro: "dados incompletos"})
  }
}

async function atualizarTarefa(req: Request, res: Response, next:NextFunction){
  const {id} = req.params
  const tarefa = req.body as Tarefa

  try{
    const result = await tarefasRepository.atualizarTarefa(parseInt(id), tarefa)
    return res.status(201).json(result)
  }catch(error){
    console.log("erro ao atualizar", error)
    return res.status(400).json({erro: "erro ao atualizar"})
  }
}

async function deletarTarefa(req: Request, res: Response, next:NextFunction){
  const {id} = req.params
  try{
    const result = await tarefasRepository.deletarTarefa(parseInt(id))
    return res.json(result)
  }catch (error){
    console.log("erro ao deletar", error)
    return res.status(400).json({erro: "erro ao deletar"})
  }
}

export default {
  getTarefas, getTarefa, criarTarefa, atualizarTarefa, deletarTarefa
}
