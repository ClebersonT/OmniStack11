import React from 'react';
import './global.css';
//importar meu Component
import Routes from './routes';
//um componente no react é uma função que retorna html
//jsx -> quando o html esta dentro do javascript
//quando vou ter algum codigo que vai se repetir muitas vezes na nossa aplicação
//o interessante é sempre separar esse codigo
function App() {
 
    return (
      //como não tem nehum conteudo, posso fechar a tag nela mesma />
      <Routes/>
    );
}

export default App;
