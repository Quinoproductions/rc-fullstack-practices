import React from "react";
import Axios from "axios";

export class MemeGenerator extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            randomimg: "http://i.imgflip.com/1bij.jpg",
            allMemes: [],
            texttop:"",
            textbottom:"",

        };
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

     async componentDidMount() {
        const response = await Axios.get("https://api.imgflip.com/get_memes");
        const memes= response.data.data.memes;
        this.setState({allMemes: memes})
    }

    handleSubmit(event) {
        event.preventDefault();
        const randomItem = Math.floor(Math.random() * this.state.allMemes.length);
        const newmemeurl = this.state.allMemes[randomItem].url;
        this.setState({randomimg:newmemeurl});

    }

    handleChange(event) {
        const{name, value} = event.target;
        if (name == "top-imput") {
            this.setState({texttop: value});
        }

        else if (name == "bottom-imput") {
            this.setState({textbottom: value});
        }
    }


    render() {
        return (
            <>
            <form className="meme-form" onSubmit={this.handleSubmit}>
             <input type="text" name="top-imput" placeholder="texto de arriba" onChange={this.handleChange} ></input>
             <input type="text" name="bottom-imput" placeholder="texto de abajo" onChange={this.handleChange} ></input> 
            <button> Change Meme </button>
            </form>
            <div className="meme">
                <img src={this.state.randomimg} ></img>
                <h2 className="top"  >{this.state.texttop}</h2>
                <h2 className="button" >{this.state.textbottom}</h2>
            </div>
            </>
        );
    } 
}