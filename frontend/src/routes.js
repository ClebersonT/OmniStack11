//router que precisa ficar por volta de todas as rotas pra nosso roteamento funcione
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//lembrando que não preciso passar o index, quando passo a pasta ele ja busca pelo arquivo index.js
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function Routes() {
    return (
        //BrowserRouter precisa estar por volta de tudo
        <BrowserRouter>
            {/*switch garante que so vai ser executado uma rota por vez*/}
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />



            </Switch>
        </BrowserRouter>
    )
}
