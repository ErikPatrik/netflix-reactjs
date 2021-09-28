/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

    const [movieList, setMovieList] = useState([])
    const [featuredData, setFeaturedData] = useState(null)
 
    // o que eu colocar aqui, ao carregar a página vai ser exibido
    useEffect(() => {
        const loadAll = async() => {
            // Pega lista total do TMDB
            let list = await Tmdb.getHomeList()
            setMovieList(list)

            // Pegar filme em destaque/featured, só pega o item deste array qye tem o slug 
            let originals = list.filter(i=>i.slug === 'originals')
            // gera numero aleatorio de 0 ao total da listas
            let randomChose = Math.floor(Math.random() * (originals[0].items.results.length -1))
            let chosen = originals[0].items.results[randomChose]
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
            setFeaturedData(chosenInfo)
            
        }

        loadAll()
    }, [])

    return(
        <div className="page">

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">                
                {movieList.map((item, key) =>(
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    )
} 