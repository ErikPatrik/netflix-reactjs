/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './FeaturedMovie.css'

export default ({item}) => {

    let firstDate = new Date(item.first_air_date)
    let genres = []


    for(let i in item.genres) {
        //pega os nomes e joga num array
        genres.push(item.genres[i].name)
    }

    let description = item.overview
    if (description.length > 200) {
        description = description.substring(0, 200) + '...'
    }

    return(
       <section className="featured" style={{
           backgroundSize: 'cover', //tamanho da imagem aumenta/diminui de acordo com o monitor do cara
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
       }}>
           <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.original_name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Assistir</a>
                        <a className="featured--mylistbutton" href={`/watch/${item.id}`}>+ Minha lista</a>
                    </div>
                    <div className="featured--genres">
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                </div> 
           </div>
       </section>
    )
}