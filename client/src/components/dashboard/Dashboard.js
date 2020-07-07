import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {fetchMovies} from "../../actions/movieActions";
import Movie from "../layout/Movie";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Pagination from "react-js-pagination";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        filtered: [],
        input:"",
        url:"/api/movies/all",
        category:"All",
        activePage:1,
        total:10
    }
}

 componentDidMount() {
     this.props.fetchMovies(this.state.url);
     
 }
 handlePageChange(pageNumber) {
  console.log(`active page is ${pageNumber}`);
  this.setState({activePage: pageNumber});
}
  searchchange = e => {
    console.log("hi",e.target.value);
    this.props.fetchMovies("/api/movies/all");
    this.setState({url:"/api/movies/all"});
    const filtered = this.props.movies.filter(movie => {
      return movie.title.toLowerCase().includes(e.target.value.toLowerCase())||movie.director.toLowerCase().includes(e.target.value.toLowerCase());
    })
    // console.log(filtered);
    this.setState({filtered:filtered,input:e.target.value});
    this.setState({category:"All"});
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  dropchange = e => {
    console.log(e.value);
    
    this.setState({category:e.value});

    // const filtered = e.value=="All"?this.props.movies.filter(movie => {
    //   return movie.category.toLowerCase().includes("".toLowerCase());
    // }):this.props.movies.filter(movie => {
    //   return movie.category.toLowerCase().includes(e.value.toLowerCase());
    // });
    let filtered = [];
    switch(e.value){
      case "All":
        this.setState({url:"/api/movies/all"});
        this.props.fetchMovies("/api/movies/all");
        // filtered = this.props.movies;
        // filtered = this.props.movies.filter(movie => {
        //     return movie.category.toLowerCase().includes("".toLowerCase());
        //   });
          break;
      case "TOP10":
        console.log(this.state.url);
        this.setState({url:"/api/movies/top10"});
        this.props.fetchMovies("/api/movies/top10"); 
        // window.location.reload(false);
        console.log(this.state.url);
        this.setState({input:""});
        break;
      default:
        filtered = this.props.movies.filter(movie => {
            return movie.category.toLowerCase().includes(e.value.toLowerCase());
          });
    }

    // console.log(filtered);
    if(e.value=="All"||e.value=="TOP10")
    this.setState({input:""});
    else
    this.setState({input:e.value});
    this.setState({filtered:filtered});
  }
  addmovie = () =>{
    console.log("movie add");
    this.props.history.push('/add');
  }
render() {
    const { user } = this.props.auth;
    const categories = ['All','TOP10','Action','Sci-Fi','Drama','Horror','Comedy'];
    const defaultOption = this.state.category;
    // console.log(this.state.input);
    let postItems = [];
    console.log(this.state.input);
    console.log(this.props.movies);
    let totalposts = this.state.input===""?this.props.movies.length:this.state.filtered.length;
    this.state.input===""?postItems = this.props.movies.map(post => (
      <Movie key={post.id} data={post}/>
    )):postItems = this.state.filtered.map(post => (
        <Movie key={post.id} data={post}/>
      ));
    let postPerPage=10;
    const indexofLastPost = this.state.activePage*postPerPage;
    const indexofFirstPost = indexofLastPost-postPerPage;
    const currentPosts = postItems.slice(indexofFirstPost,indexofLastPost);
    console.log(totalposts);
return (
      <div style={{ height: "75vh" }} className="">
        <div className="">
          <div style={{
            padding:"1vw",
            margin:"1vw"
          }}>
            <h5>
              <b>Welcome,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are now logged into the movie catalog.
              </p>
            </h5>
          </div>
          <div>
            <button
              style={{
                position:"absolute",
                right: "5vw",
                width: "10vw",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                top:"7vh"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
          <div>
            <button
              style={{
                position:"absolute",
                right: "5vw",
                width: "10vw",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                top:"15vh"
              }}
              onClick={this.addmovie}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Add
            </button>
          </div>
          <div style={{
            margin:"5vh",
            padding:"5vh",
            alignItems:"center"
          }}>
            <input style={{
              
            }}type="text" onChange={this.searchchange} className="input" placeholder="Search by Movie or Director" />
            
            <Dropdown style={{
              width:"10vw"
            }} options={categories} onChange={this.dropchange} value={this.state.category} placeholder="Select an option" />
          </div>
            <div style={{
              display:"flex",
              flexWrap:"wrap"
            }}>
              {currentPosts}
            </div>
            <div style={{
              position:"absolute",
              margin:"1vw",
              left:"45vw"
            }}>
            <Pagination
        
          activePage={this.state.activePage}
          itemsCountPerPage={postPerPage}
          totalItemsCount={totalposts}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        </div>
          </div>
        </div>
      
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fetchMovies : PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies.items
});
export default connect(
  mapStateToProps,
  { logoutUser,fetchMovies }
)(Dashboard);