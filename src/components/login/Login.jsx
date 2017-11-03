import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import md5 from 'md5'



class Login extends Component {
  constructor(props) {
    super(props)
  
    this.handleLoginKey = this.handleLoginKey.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  
    this.state = {
      login:{
        privateKey: undefined,
        publicKey: undefined
      },      
      caracters: {},
      error: {},
      status:''
    }
  
  }

  componentDidMount = () => {
  }
  

  handleLoginKey = (event) => {
    let {login} = this.state
    switch(event.target.name){
      case 'privateKey' :
      login['privateKey'] = event.target.value
      this.setState({...login, login, status: ''})
      break;
      case 'publicKey' :
      login['publicKey'] = event.target.value
      this.setState({...login, login, status: ''})
      break;
      default:
    }
  }

  handleLoginPublicKey = (event) => {
    let login = {publicKey: undefined}
    login[event.target.name] = event.target.value
    this.setState({...this.state.login, login})
  }

  handleLogin = (event) => {
    const {login} = this.state
    const ts = new Date().getTime();
    let hash = md5(ts + login.privateKey + login.publicKey)
    event.preventDefault()
    axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: {
        ts: ts,
        apikey: login.publicKey,
        hash: hash
      }
    })
    .then(res => {
      this.setState({
        caracters: res.data.data,
        status: res.status,
        ts: ts
      })
    })
    .catch(err => {
      this.setState({
        status: err.response.status
      })
    })
  }

  render() {
    const {login, status, ts} = this.state
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Dados de acesso</h2>
          <label className="sr-only" >private_key</label>
          <input name='privateKey' type="text" className="form-control" placeholder="Digite sua Private Key" onChange={this.handleLoginKey}/>
          <label className="sr-only">public_key</label>
          <input name='publicKey' type="password" className="form-control" placeholder="Digite sua Public Key" onChange={this.handleLoginKey}/>
          {status === 401 || status === 409 ? (
            <div className="alert alert-danger" role="alert">
              Usuário ou senha inválida
            </div>
          ) : ''}
          {status === 200 ? (
           <Redirect to={`/home/${ts}/${login.privateKey}/${login.publicKey}`}/>
          ) : ''}
          <button type="submit" value="Submit" className="btn btn-lg btn-primary btn-block" onClick={this.handleLogin}>Acessar</button>
        </form>
      </div>
    )
  }
}

export default Login
