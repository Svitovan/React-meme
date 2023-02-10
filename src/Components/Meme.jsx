import React from "react";
// import memesData from "../memesData";

export default function Meme() {
    // const [memeImage, setMemeImage] = React.useState('');

    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '', 
        randomImage: 'https://picsum.photos/500'
    })
    const [allMemeImages, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                     className="form--button"
                     onClick={getMemeImage}
                    
                >
                    Get a new meme image
                </button>
            </div>
            <div className="meme" >
                <img src={meme.randomImage} className="meme--image" alt='' />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>

            </div>
            
            
        </main>
    )
}