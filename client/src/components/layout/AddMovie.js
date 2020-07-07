import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            director:"",
            imdb:0,
            trailer:"",
            cover_pic:"",
            category:"",
            year:"",
            summary:""
        }
        
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
        const newMovie = {
            title:this.state.title,
            director:this.state.director,
            imdb:this.state.imdb,
            trailer:this.state.trailer,
            cover_pic:this.state.cover_pic,
            category:this.state.category,
            year:this.state.year,
            summary:this.state.summary
        }
        console.log(newMovie);
        axios.post("/api/movies/add",newMovie).then(res=>console.log(res));
        this.props.history.push('/dashboard');
      };
  render() {
    return (
        <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add a MOVIE</b> below
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  
                  id="title"
                  type="text"
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="year"
                  type="text" 
                />
                <label htmlFor="year">Year</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="summary"
                  type="text" 
                />
                <label htmlFor="summary">Summary</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="imdb"
                  type="text" 
                />
                <label htmlFor="imdb">IMDB Rating</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="director"
                  type="text" 
                />
                <label htmlFor="director">Director</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="category"
                  type="text" 
                />
                <label htmlFor="category">Category</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="trailer"
                  type="text" 
                />
                <label htmlFor="trailer">Trailer</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  id="cover_pic"
                  type="text" 
                />
                <label htmlFor="cover_pic">Poster</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  ADD MOVIE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
// export default Movie;