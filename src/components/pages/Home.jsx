import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import md5 from 'md5'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      caracters: {},
      error: {}
    }
  
  }

  componentDidMount() {
    const {match} = this.props
    const hash = md5(match.params.ts + match.params.pv + match.params.pb)
    axios.get('https://gateway.marvel.com/v1/public/characters', {
      params: {
        limit: 50,
        ts: match.params.ts,
        apikey: match.params.pb,
        hash: hash
      }
    })
    .then(res => {
      this.setState({
        caracters: res.data.data,
      })
    })
    .catch(err => {
      this.setState({
        status: err.response.status
      })
    })
  }


  render() {
    const {caracters} = this.state
    
    const handleRowName = (cell, row) => {
      const {match} = this.props
      return <Link to={`/detail/${row.id}/${match.params.ts}/${match.params.pb}`}>{cell}</Link>
    }
    const handleRowModified = (cell, row) => {
      let date = new Date(cell)
      let day = date.getDate() >= 1 && date.getDate() <= 9 ? `0${date.getDate() + 1}` : date.getDate() + 1
      let monthBr = date.getMonth() + 1
      let month = monthBr >= 1 && monthBr <= 9 ? `0${monthBr}` : monthBr
      let year=date.getFullYear();
      const currentDay = `${day}/${month}/${year}`
      return <span>{currentDay}</span>
    }

    const options = {
      hideSizePerPage:true,
      noDataText: <span>Não contem dados</span>
    };

    return (
      <div className='container'>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link active" to={`/`} >Sair</Link>
          </li>
        </ul>
        <BootstrapTable
          data={ caracters.results }
          pagination
          options={ options }>
          <TableHeaderColumn headerAlign='center' width='20%' dataField='name' dataFormat={handleRowName} isKey>Nome</TableHeaderColumn>
          <TableHeaderColumn headerAlign='center' width='60%' dataField='description'>Descrição</TableHeaderColumn>
          <TableHeaderColumn headerAlign='center' dataAlign='center' width='20%' dataField='modified' dataFormat={handleRowModified}>Ultima Atualização</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Home;
