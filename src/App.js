import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef, useContext, useReducer, Suspense, lazy} from "react";
import DescCard from "./components/cards/DescCard";
import ArtCard from "./components/cards/ArtCard";
import VideoCard from "./components/cards/VideoCard";
import "./App.css";
import VideoModal from "./components/modals/VideoModal";
import Button from "./components/cards/Button";
import {videos, navItems, itemsPerPage} from "./constants";
import Pagination from "./components/cards/Pagination";
import { createPortal } from 'react-dom';
import {ModalProvider, ModalContext} from "./providers/ModalProvider";
import { GlobalProvider } from "./providers/globalProvider";
import {AppReducer} from './reducers/AppReducer';
import Skeleton from 'react-loading-skeleton'

const CharacterCard = lazy(()=> import("./components/cards/CharacterCard")) ;
const Modal = lazy(()=> import("./components/modals/Modal")) ;



function App() {
  const {
    caca,
    modalImgOpen,
    modalVidOpen,
    setVidOpen,
    setImgOpen
  } = useContext(ModalContext);
  
  const [monsters, setMonsters] = useState([]);
  const [arts, setArts] = useState([]);
  const [imgData, setImgData] = useState({});
  const [vidData, setVidData] = useState({});
  const [rerender, setRerender] = useState(true)
  const [inputValue, setInputValue] = useState('');
  const [page, pageDispatch] = useReducer(AppReducer, 1)
  const [monst, monstDispatch]= useReducer(AppReducer, [])
  const [artes, artDispatch] = useReducer(AppReducer, [])

  const modalRef = useRef(null)
  const inputRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    console.log('Height: ', cardRef.current.layout)
    const dCard = document.getElementsByClassName('sub-header')
    dCard[0].style = `height: ${cardRef.current.layout}px`
  }, [])

  useEffect(() => {
    fetch("https://botw-compendium.herokuapp.com/api/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        monstDispatch({
          type:'insert_data_monster',
          monster: data.data.monsters
        });
        artDispatch({
          type: 'insert_data_art',
          arte: data.data.creatures.non_food
        });
      });
  }, []);

  

  function handleVideoClick(vidData) {
    setVidData(vidData);
    setVidOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      modalRef.current.printSomething()
    }, 2000);
  }

  const handleArtClick = useCallback((imgData) => {
    setImgData(imgData);
    setImgOpen(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      modalRef.current?.printData()
    }, 1);
  }, [])

  function handlePageChange(pageNumber) {
    pageDispatch({
      type: 'curr_page_changed',
      page_number: pageNumber
    })
  }

  function handleNewsLetter(event) {
    event.preventDefault()
  }

  return (
    <GlobalProvider>
    <div className="body">
      <header className="header">
        <section className="sub-header">
          <div className="bar">
          {navItems.map((button) => (
              <Button
                button={button}
                key={button.id}
                text={button.text}
                url={button.url}
              />
            ))
            }
          </div>
        </section>
      </header>
      <main className="main">
        <section className="description">
          {[1,2].map(() => <DescCard ref={cardRef} />)}
        </section>
        <section className="character">
        <div className="character-list">
        {
          monst.length > 0 ?
            monst
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((character) => {
                return(
                <CharacterCard 
                character={character} 
                key={character.id} />
                )
            }) 
          :
          <Skeleton 
            count={4} 
            height={238} 
            width={164.5} 
            inline={true} 
            baseColor={'#5b95a4'} 
            highlightColor={'#94F2F1'}
            containerClassName='character-skeleton'
            borderRadius={8}/>
        }
        </div>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(monst.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
        </section>
        <section className="fan-art">
          <h1>FAN ART</h1>
          <div className="collage">
            {artes.slice(0, 5).map((art) => {
              return (
                <ArtCard key={art.id} art={art} handleClick={handleArtClick} />
              );
            })}
          </div>
        </section>

        <section className="gameplays">
          <h1>GAMEPLAYS</h1>
          <div className="video">
            {videos.map((video) => {
              return (
                <VideoCard
                  video={video}
                  key={video.id}
                  title={video.title}
                  description={video.description}
                  handleVideoClick={handleVideoClick}
                />
              );
            })}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-option">
          {navItems.map((button) => {
            return(
            <Button  
              button={button}
              key={button.id}
              text={button.text}
              url={button.url}
            />
            );
              })}
          </div>
          <div className="footer-option">
          {navItems.map((button) => (
              <Button
                button={button}
                key={button.id}
                text={button.text}
                url={button.url}
              />
            ))
            }
          </div>
          <div className="newsletter">
            <h1>NEWSLETTER</h1>
            <form onSubmit={handleNewsLetter} className="subscription">
              <input onChange={(event) => setInputValue(event.target.value)} type="email" id="email" placeholder="example@gmail.com" />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
        <p className="copyright">© Pablo Araya 2023</p>
      </footer>

      
        {modalImgOpen && 
        <Suspense fallback={<p>loading</p>}>
          <Modal ref={modalRef} >
            <img src={imgData.image}></img>
          </Modal>
        </Suspense>
        }
        <VideoModal ref={modalRef} isActive={modalVidOpen}>
          <iframe
            width="942"
            height="530"
            src={vidData.url}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </VideoModal>
    </div>
    </GlobalProvider>
  );
}

export default App;
