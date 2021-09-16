import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import ReactTooltip from 'react-tooltip';

import Menu from '../../componentes/menu/index.js';
import Cabecalho from '../../componentes/cabecalho/index.js';
import Linha from '../../assets/img/barradeitada.png';
import BarraT from '../../assets/img/barra.png';
import Alterar from '../../assets/img/alterar.svg';
import Apagar from '../../assets/img/lixeira.svg';

import { useState, useEffect, useRef } from 'react';

import { Container, Parteprincipal, Bloco1, Bloco2 } from './styled'

import Api from '../../service/api';
const api = new Api;
 
export default function PagPrincipal() {

  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [Numero, setNumero] = useState('');
  const [curso, setCurso] = useState('');
  const [turma, setTurma] = useState('');
  const [idalterado, setIdalterado] = useState(0);

  const loading = useRef(null);

  async function Listar() {
    let r = await api.Listar();
    setAlunos(r);
  }

  async function inserir() {
    loading.current.continuousStart();

    if(idalterado == 0) {
      let r = await api.Inserir(nome, Numero, turma, curso);
      
      if(r.erro) {
          toast.error(`${r.erro}`);
          return;
      } else {
          toast.dark('💕 Produto cadastrado com sucesso!');
        }
    } else {
      let r = await api.Alterar(idalterado, nome, Numero, turma, curso);

      if(r.erro) {
        toast.error(`${r.erro}`);
        return;
      } else {
        toast.dark('✏️ Produto alterado!');
      }
    }

    LimparCampos();
    Listar();
  }

  function LimparCampos() {
    setNome('');
    setNumero('');
    setTurma('');
    setCurso('');
    setIdalterado(0);
  }

  async function deletar(idalterado) {
    confirmAlert({
      title: 'Remover Aluno',
      message: `Tem certeza que deseja remover o aluno ${idalterado} ?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            let r = await api.Remover(idalterado);
            if (r.error)
              toast.error(`${r.error}`);
            else {
              toast.dark('🗑️ Aluno removido!');
              Listar();
            }
          }
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  
  async function editar(item) {
      setNome(item.nm_aluno);
      setNumero(item.nr_chamada);
      setTurma(item.nm_turma);
      setCurso(item.nm_curso);
      setIdalterado(item.id_matricula);
  }



  useEffect(() => {
    Listar();
  }, []);


    return(
        <Container>
          <ToastContainer />
           <LoadingBar color="pink" ref={loading} />
            <ReactTooltip />
              <div className="parte1">
                <Menu />
              </div>

              <div className="parte2">
                <Cabecalho />
                <div className="linha"> <img src={Linha} alt=""/> </div>

                <Parteprincipal>
                  <Bloco1>
                    <div className="titulo">
                        <div className="barra"><img src={BarraT} alt="" /></div>
                        <div className="texto1">{ idalterado == 0 ? "Novo Aluno" : "Alterando Aluno"}</div>
                    </div>

                    <div className="inputs">

                        <div className="linha1">
                            <div className="inp1">Nome:   <input type="text" value={nome} onChange={e => setNome(e.target.value)}></input></div>
                            <div className="inp">Curso:   <input type="text" maxLength="15" value={curso} onChange={e => setCurso(e.target.value)}></input></div>
                        </div>

                        <div className="linha1">
                            <div className="inp2">Número:   <input type="text" maxLength="3" value={Numero} onChange={e => setNumero(e.target.value)}></input></div>
                            <div className="inp">Turma:   <input type="text" maxLength="15" value={turma} onChange={e => setTurma(e.target.value)}></input></div>
                            <div className="btn"><button onClick={inserir}> {idalterado == 0 ? "Cadastrar" : "Alterar"} </button></div>
                        </div>
                    </div>
                  </Bloco1>

                  <Bloco2>
                      <div className="titulo">
                            <div className="barra"><img src={BarraT} alt="" /></div>
                            <div className="texto1">Alunos Cadastrados</div>
                      </div>

                      <table> 
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Nome</th>
                              <th>Numero</th>
                              <th>Turma</th>
                              <th>Curso</th>
                              <th className="coluna-acao"></th>
                              <th className="coluna-acao"></th>
                            </tr>
                          </thead>
                          <tbody>
                          {alunos.map((item, i) =>
                            <tr className={i % 2 == 0 ? "alternado" : ""}>
                              <td> {item.id_matricula} </td>
                              <td title={ item.nm_aluno != null && item.nm_aluno.length > 12 ? item.nm_aluno : null }> { item.nm_aluno != null && item.nm_aluno.length >= 15 ? item.nm_aluno.substr(0, 15) + '...' : item.nm_aluno } </td>
                              <td> { item.nr_chamada } </td>
                              <td  title={ item.nm_turma != null && item.nm_turma.length > 5 ? item.nm_turma : null }> { item.nm_turma != null && item.nm_turma.length >= 5 ? item.nm_turma.substr(0, 5) + '...' : item.nm_turma } </td>
                              <td title={ item.nm_curso != null && item.nm_curso.length > 10 ? item.nm_curso : null }> { item.nm_curso != null && item.nm_curso.length >= 10 ? item.nm_curso.substr(0, 10) + '...' : item.nm_curso } </td>
                              <td className="coluna-acao"><button onClick={() => editar(item)}><img src={Alterar} alt=""/></button></td>
                              <td className="coluna-acao"><button onClick={() => deletar(item.id_matricula)}><img src={Apagar} alt="" /></button></td>
                            </tr>
                          )}
                          </tbody> 
                        </table>
                  </Bloco2>
                </Parteprincipal>
                </div>
        </Container>

    )
}