
const URL_BASE: string = "http://localhost:3000/tarefas"

let tarefa_id: number = 0

const nova_tarefa = {
    nome: "tarefa1",
    descricao: "desc tarefa"
}
const tarefa_atualizada = {
    nome: "att_tarefa",
    descricao: "tarefa_att"
}

test("GET: /tarefas = 200", async ()=>{
    const res = await fetch(URL_BASE)
    expect(res.status).toBe(200)

    const body = await res.json()   
    expect(Array.isArray(body)).toBe(true)
})

test("POST: /tarefas = 201(criar tarefa)", async()=>{
    const res= await fetch(URL_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nova_tarefa)
    })
    expect(res.status).toBe(201);

    const content = await res.json()
    tarefa_id = content.id
    console.log(tarefa_id)
    expect(content).toHaveProperty("id")
    expect(content).toHaveProperty("nome")
    expect(content).toHaveProperty("descricao")
})

test("GET: /tarefas = 200", async()=>{
    const res= await fetch(`${URL_BASE}/${tarefa_id}`)
    expect(res.status).toBe(200);

    const content = await res.json()
    expect(content).toHaveProperty("nome", nova_tarefa["nome"])
    expect(content).toHaveProperty("descricao", nova_tarefa["descricao"])
})

test ("PUT: /tarefas/1 = 200 (att tarefa)", async()=>{
    const res= await fetch(`${URL_BASE}/${tarefa_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tarefa_atualizada)
    })
    expect(res.status).toBe(201);
})

test("DELETE: /tarefas/id: = 204", async()=>{
    const res = await fetch (`${URL_BASE}/${tarefa_id}`, {
        method: "DELETE"
    })
    expect(res.status).toBe(200)
    
    const content = await res.json()
    expect(content).toHaveProperty("id")
    expect(content).toHaveProperty("nome")
    expect(content).toHaveProperty("descricao")
})

// ------------------ teste p erros

test("GET: /tarefas = 400", async()=>{
    const res= await fetch(`${URL_BASE}/99999999999`)
    expect(res.status).toBe(404);
})

test("POST: /tarefas = 400(erro criar tarefa)", async()=>{
    const res= await fetch(URL_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({})
    })
    expect(res.status).toBe(400);

    const content = await res.json()
    expect(content).toHaveProperty("erro", "dados incompletos")
})
