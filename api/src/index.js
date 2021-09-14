import db from './bd.js';
import cors from 'cors'
import express from 'express'

const app = express();
app.use(cors());
app.use(express.json());



app.get('/matricula', async (req, resp) => {
    try {
        let l = await db.tb_matricula.findAll({order: [['id_matricula', 'desc']]});
        resp.send(l);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
}) 


app.post('/matricula', async (req, resp) => {
    try {
        let { nome, numero, curso, turma } = req.body;

        let consulta = await db.tb_matricula.findOne({where: {nm_aluno: nome}});
        
        if(consulta != null) {
            resp.send({erro: '😀 Aluno já cadastrado!'})
        } else {
            if(nome == "" && nome.length < 5 || numero == "" &&  numero <= 0 || curso == "" && curso.length < 5 || turma == "" && turma.length <= 3 )
            {
                resp.send({erro: '❌ Campos inválidos!'})
            } else {
                let i = await db.tb_matricula.create({ 
                    nm_aluno: nome,
                    nr_chamada: numero,
                    nm_curso: curso,
                    nm_turma: turma
                })
                resp.send(i)    
            }
        }
    } catch (e) {
        resp.send({ erro: 'O campo "Chamada" só pode conter números positivos!' })
    }
}) 


app.put('/matricula/:id', async (req, resp) => {
    try {
        let { nome, numero, curso, turma } = req.body;
        let { id } = req.params;

        if(nome == "" && nome.length < 2 || numero <= 0 || curso == "" && curso.length < 2 || turma == "" && nome.length <= 0 ) {
            resp.send({erro: '❌ Campos inválidos!'})
        } else {
                let i = await db.tb_matricula.update(
                {
                    nm_aluno: nome,
                    nr_chamada: numero,
                    nm_curso: curso,
                    nm_turma: turma
                },
                {
                    where: {id_matricula: id }
                })
                resp.sendStatus(200);
            }
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
}) 


app.delete('/matricula/:id', async (req, resp) => {
    try {
        let {id} = req.params;

        let d = await db.tb_matricula.destroy({ where: { id_matricula: id }})
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
}) 


app.listen(process.env.PORT,
            x => console.log(`Subiu a Api! ${process.env.PORT}`))