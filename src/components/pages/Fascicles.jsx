import React from 'react'

const Fascicles = ({comics}) => {
    return (
        <div className='fascicles-box-container'>
            <div className='fascicles-box-img-container'>
                {comics
                    .images
                    .map(function(item, index){
                        if(index === 0) {
                            return <img
                            key={`Image ${item.path}`}
                            src={`${item.path}.${item.extension}`}
                            alt="Fascicles Images"/>
                        } else {
                            return false
                        }
                    })}
            </div>
            <div className='fascicles-box-text-container'>
                <div className='fascicles-box-text-body'>
                    <h6>Título: <span>{comics.title}</span></h6>
                    
                    <h6>Número da capa: <span>{comics.pageCount}</span></h6>
                </div>
                {comics.description ? 
                    <div className='fascicles-box-text-bottom'><span>{comics.description}</span></div>
                : <h6>Não há descrição</h6>    }
            </div>
        </div>
    )
}

export default Fascicles
