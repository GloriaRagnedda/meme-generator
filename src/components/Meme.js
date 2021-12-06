import memesData from '../memesData'
import { useState, useEffect } from 'react'
import React from 'react'

export default function Meme (){

const [allMemes, setAllMemes] = useState()
const [memesImage, setMemesImage] = useState('')
const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
})
const [allMemeImages, setAllMemeImages] = React.useState([])


useEffect(() => {
    async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
    }
    getMemes()
}, [])

function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
    
}


function handleChange(event){
    const {name, value} = event.target
    setMeme(prevState => {
        return{
            ...prevState,
            [name]: value
        }
    })
}

console.log(meme)

function handleSubmit(event){
    event.preventDefault();
    console.log(meme)
}

    return(
        <>
        <div className="main-inputs_container" onSubmit={handleSubmit}>
            <div className="inputs-container">
                <div className="inputs">
                <input 
                className="input1" 
                type="text" 
                name="topText"
                id="topText" 
                placeholder="shut up"
                value={meme.topText}
                onChange={handleChange}
                 />

                <input  
                className="input2"
                type="text"
                name="bottomText" 
                id="bottomText" 
                placeholder="and take my money"
                value={meme.bottomText}
                onChange={handleChange}
                 />

                </div>

                <button 
                className="btn" 
                onClick={getMemeImage} >
                Get a new image
                </button>
            </div>

        </div>
        <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
            </>
    )
}