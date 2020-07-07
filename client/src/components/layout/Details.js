import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPlayer from 'react-player';


export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary:"",
            title:"",
            trailer:"",
            cover_pic:"",
            director:"",
            imdb:"",
            category:"",
            year:""
        }
        
    }
    componentDidMount(){
        let {id} = this.props.match.params;
        axios.get("/api/movies/"+id).
        then(res=>res).
        then(data=>{
            this.setState({
                summary:data.data.summary,
                title:data.data.title,
                trailer:data.data.trailer,
                cover_pic:data.data.cover_pic,
                director:data.data.director,
                imdb:data.data.imdb,
                category:data.data.category,
                year:data.data.year
            });
            
        }).
        catch(err => console.log(err));
    }
    render(){
    return (
      <div>
         <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Dashboard
        </Link>
        <h4 style={{
            position:"absolute",
            padding:"1vw",
            margin:"1vw",
            left:"12vw"
        }}>
            <b>{this.state.title}</b>
            <p className="flow-text grey-text text-darken-1">{this.state.year} {this.state.category}</p>
        </h4>
        <img 
        style={{
            position:"absolute",
            left:"0",
            margin:"1vw",
            padding:"1vw",
            top:"10vh"
        }}
        src={this.state.cover_pic} alt="cover"/>
        <div style={{
            position:"absolute",
            fontSize:"2vh",
            top:"13vw",
            left:"14vw"
        }}>
            {this.state.summary}
        </div>
        <div style={{
            position:"absolute",
            fontSize:"2.5vh",
            left:"24vw",
            top:"7.5vw",
            color:"red",
            marginLeft:"3vw"
        }}>
            {this.state.imdb}
        </div>
        <div style={{
            left:"14vw",
            position:"absolute",
            fontSize:"2vh",
            top:"28vh",
            marginTop:"3vh"
        }}>
            Director: {this.state.director}
        </div>
        <div style=
        {{
            position:"absolute",
            top:"54vh",
            left:"27vw"
        }}>
            <ReactPlayer controls={true} url={this.state.trailer} />
        </div>
      </div>
    );
  }
}
// export default Movie;