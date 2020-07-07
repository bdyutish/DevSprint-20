import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player';
class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        
    }
    onclick = () => {
      console.log("yeet");
      let id = this.props.data._id;
      console.log(this.props.history);
      this.props.history.push("/details/"+id);
      console.log("yeet");
    }
    
  render() {
    
    return (
      <div className="col s12 l3" style={{
          marginTop:"5vw"
      }}>
          
          <div style={{
        height:"35vh",
        marginLeft:"5vw",
        marginBottom:"1vh"
          }}>
          <img onClick={this.onclick} 
           src={this.props.data.cover_pic} alt="not loaded"/>
         <div>{this.props.data.title}</div>
         <div style={{
             color:"red"
         }}>{this.props.data.imdb}</div>
         </div>
      </div>
    );
  }
}
export default withRouter(Movie);