import React from "react"

export default function Meme(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    const [allMemes, setAllMemes] = React.useState([])

    const [fontColor, setFontColor] = React.useState("white")

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({...prevMeme, randomImage: url}))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name] : value
            }
        }) 
    }
    function handleFontChange(){
        setFontColor(prevColor => (prevColor === "white" ? "black" : "white"))
    }

    return(
        <main>
            <div className="form">
                <div>
                    <label htmlFor="top-text">Top Text</label>
                    <input
                        id="top-text"
                        type="text"
                        placeholder="Shut up"
                        className="form--input"
                        onChange={handleChange}
                        name="topText"
                        value={meme.topText}
                    />
                </div>
                <div>
                <label htmlFor="bottom-text">Bottom Text</label>
                    <input
                        id="bottom-text"
                        type="text"
                        placeholder="and take my money"
                        className="form--input"
                        onChange={handleChange}
                        name="bottomText"
                        value={meme.bottomText}
                        />
                </div>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image"/>
                <h2 className="meme--text top" style={{ color: fontColor }}>{meme.topText}</h2>
                <h2 className="meme--text bottom" style={{ color: fontColor }}>{meme.bottomText}</h2>
            </div>

            <button className="form--button" onClick={getMemeImage}>Get a new meme image</button> 
            <button className="form--button" onClick={handleFontChange}>Change font colour</button>
        </main>
    )
}