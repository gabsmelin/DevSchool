import Axios from 'axios';
const api = Axios.create({
    baseURL: 'http://localhost:3031'
})

export default class Api {
    async Listar(){
        let r = await api.get('/matricula');
        return r.data;
    }

    async Inserir( nome, numero, turma, curso ){
        let r = await api.post('/matricula', { nome, numero, turma, curso });
        return r.data;
    }

    async Alterar(id, nome, numero, turma, curso ){
        let r = await api.put('/matricula/' + id, { nome, numero, turma, curso } );
        return r.data;
    }

    async Remover(id){
        let r = await api.delete('/matricula/' + id);
        return r.data;
    }
}