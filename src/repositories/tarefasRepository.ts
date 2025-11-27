import { resolve } from "path";
import Tarefa from "../model/tarefa"
import { rejects } from "assert";

const listaTarefas: Tarefa[] = []

async function getTarefas():Promise<Tarefa[]|any> {
    return new Promise((resolve, reject)=>{
        return resolve(listaTarefas)
    });
}

async function getTarefa(id:number) :Promise<Tarefa|any>{
    return new Promise ((resolve, reject)=>{
        const tarefa = listaTarefas.find(t=>t.id === id)
        return resolve(tarefa)
    });
}

async function criarTarefa(dados:Tarefa):Promise<Tarefa>{
    return new Promise ((resolve, reject)=>{
        if (!dados.nome || !dados.descricao){
            return reject(new Error("dados inválido"))
        }
        const novaTarefa = new Tarefa(dados.nome, dados.descricao)
        listaTarefas.push(novaTarefa)
        return resolve(novaTarefa)
    });
}

async function atualizarTarefa(id:number, dados:Tarefa):Promise<Tarefa>{
    return new Promise((resolve, reject)=>{
        const indice = listaTarefas.findIndex(t => t.id === id)
        if (indice === -1) {
            return reject(new Error("Tarefa nao encontrada"))
        }
        listaTarefas[indice].nome = dados.nome
        listaTarefas[indice].descricao = dados.descricao
        return resolve(listaTarefas[indice])
    });
}

async function deletarTarefa(id:number): Promise<Tarefa> {
    return new Promise((resolve, reject)=>{
        const indice = listaTarefas.findIndex(t => t.id === id)
        if( indice === -1){
            return reject(new Error("tarefa noa existe"))
        }
        const [tarefa] = listaTarefas.splice(indice, 1)
        return resolve(tarefa)
    })
}

export default {
    getTarefas, getTarefa, criarTarefa, atualizarTarefa, deletarTarefa
} 