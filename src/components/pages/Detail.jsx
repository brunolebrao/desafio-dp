import React, {Component} from 'react';
import axios from 'axios'
import md5 from 'md5'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Fascicles from './Fascicles'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            caracters: [],
            comics: []
        }
        this.handleBack = this.handleBack.bind(this)
      }
    componentDidMount() {
        const {match} = this.props
        const pv = 'c7211b772d95c9f305f27605dac085ac50b95e2d'
        let hash = md5(match.params.ts + pv + match.params.pb)
        
        axios.get(`https://gateway.marvel.com/v1/public/characters/${match.params.id}`, {
        params: {
            ts: match.params.ts,
            apikey: match.params.pb,
            hash: hash
            }
        })
        .then(res => {
          this.setState({
            caracters: res.data.data.results
          })
        })

        axios.get(`https://gateway.marvel.com/v1/public/characters/${match.params.id}/comics`, {
            params: {
              ts: match.params.ts,
              apikey: match.params.pb,
              hash: hash
            }
          })
          .then(res => {
            this.setState({
              comics: res.data.data.results
            })
          })
      }

      handleBack = () => {
        const {match} = this.props
        const pv = 'c7211b772d95c9f305f27605dac085ac50b95e2d';
        return <Redirect to={`/home/${match.params.ts}/${pv}/${match.params.pb}`}/>
      }

    render() {
        const {caracters, comics} = this.state
        const {match} = this.props
        const pv = 'c7211b772d95c9f305f27605dac085ac50b95e2d';
        return (
            <div className='container'>
                <div className='detail-box-container'>
                    <div className='detail-box-img-container'>
                       {caracters.map(item => {
                           return <img key={1} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="teste"/>
                        })}
                    </div>
                    <div className='detail-box-text-container'>
                        <div className='detail-box-text-top'>
                            {caracters.map(item => {
                                return <h4 key={2}>{item.name}</h4>
                            })}
                        </div>
                        <div className='detail-box-text-bottom'>
                            {caracters.map(item => {
                                if(item.description.length <= 0){
                                    return <p>Não há descrição</p>
                                }else {
                                    return <div key={3}><h5>Descrição:</h5><p>{item.description}</p></div>
                                }
                                
                            })}
                        </div>
                        
                    </div>
                </div>
                <div className='detail-button'>
                    <Link className="btn btn-lg btn-primary" to={`/home/${match.params.ts}/${pv}/${match.params.pb}`} >Voltar</Link>
                </div>
                <div>
                    <h4 className='fascicles-title-container'>Fascículos</h4>
                    <hr/>
                    {comics.map((item) => {
                        if(item.images.length > 0){
                            return <Fascicles key={item.id} comics={item}/>
                        }else {
                            return false
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Detail;