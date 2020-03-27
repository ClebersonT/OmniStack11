//useEffect -> que serve pra disparar uma função em um determnado momento
import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    //1º parâmetro -> a função que eu quero que seja executada
    //2º parâmetro -> quando essa função vai ser executada
    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })

        //colocar ongId como uma dependencia
    }, [ongId]);

    //deletar caso
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })

            //percorrer o array e remover o id que acabou de ser deletado
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, teincidentnte novamente.');
        }
    }

    function handleLogout(){
        //dados armazenados no Browser, vou limpar eles
        localStorage.clear();  
        
        history.push('/');
    }   

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Be vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>

            <h1>
                Casos Cadastrados
            </h1>

            <ul>
                {/**percorrer cada um dos incidents */}
                {incidents.map(incident => (
                    //toda vez que fazemos uma repetição
                    //o primeiro elemento que vem dentro do map, eu preciso colocar uma propriedade chamada key
                    //isso vai ajudar o react ajudar a encontrar qual item é qual(para deletar e afins)
                    //e tenho que passar o valor unico que não vai se repetir para identificar o elemento
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )


}