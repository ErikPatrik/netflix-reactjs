/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header'

export default () => {

    const [movieList, setMovieList] = useState([])
    const [featuredData, setFeaturedData] = useState(null)
    const [blackHeader, setBlackHeader] = useState(false)
 
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

    useEffect(() => {
        //monitoramos o scroll da tela, e assim que quisermos, colocamos como true o BlackHeader
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true)
            } else {
                setBlackHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        //remover o listner quando sair da página
        return () => {
            window.removeEventListener('scroll', scrollListener)
        }

        //quando tiver evento de tela na tela, roda o scrolllistner
    }, [])

    return(
        <div className="page">

            <Header black={blackHeader}/>

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">                
                {movieList.map((item, key) =>(
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>

            <footer>
                Site desenvolvido com ReactJS<br/>
                Direitos de imagem para Netflix<br/>
                Dados pegos do site Themoviedb.org
            </footer>
            
            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://th.bing.com/th/id/R.d4214fd9d5d9c1a3ad1d1ba75cc3a286?rik=FZgXPB5lETXV%2bQ&riu=http%3a%2f%2fwww.wired.com%2fwp-content%2fuploads%2f2016%2f01%2fNetflix_LoadTime.gif&ehk=Z2vvzNiV55QVTIi2lkdxoCUbCKjz4RNfygXsjMcFk1I%3d&risl=&pid=ImgRaw&r=0" alt="Carregando" />
                </div>
            }
        </div>
    )
} 