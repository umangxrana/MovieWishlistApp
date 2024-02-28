import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
 
export default function Movies() {
    const[movies,setMovies] = useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const[moviesPerPage]=useState(10);
    const indexOfLastMovie=currentPage*moviesPerPage;
    const indexOfFirstMovie=indexOfLastMovie-moviesPerPage;
    const currentMovies=movies.slice(indexOfFirstMovie,indexOfLastMovie);
    const paginate=(pageNumber)=>{
        setCurrentPage(pageNumber);
    };
    const[movie,setMovie]=useState({
        "id":"",
        "movieRank":null ,
        "title": "",
        "description": "",
        "image": "",
        "rating": "",
        "year": null
});
 
    
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/api/v3/movies`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movie data:', error.message);
        }
    };
    useEffect(() => {
        
        // Call fetchMovies in useEffect
        fetchMovies();
    }, []);
   
   
    const handleWishList = (e, id, movieRank, title, description, image, rating, year) => {
        e.preventDefault();
    
        const email = localStorage.getItem("email");
        const movie = {
            title: title,
            id: id,
            movieRank: movieRank,
            description: description,
            rating: rating,
            year: year,
            image: image
        };
    
        axios.post(`http://localhost:8084/api/v4/wishListService/movie/save?emailId=${email}`, movie, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // setMovies(response.data);
            fetchMovies();
            //toast.success("Movie added to wishlist");
            Swal.fire({
                position: 'center',
                icon: 'success',
               // title: 'Oops! Something went wrong!',
                text: 'Movie added to wishlist',
                showConfirmButton: true,
                timer: 10000})
        })
        .catch(error => {
            console.error('Error adding movie to wishlist:', error.message);
        });
    };
 
 
 
    return (
        <div id= "dbur01">
      <h1 className="movienameHead">Movies</h1>
      <div id="fixedButton" style={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', marginLeft:'4%' }}>
        {currentMovies && currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
              <div key={movie.id} style={{ border: '2px solid #ddd', padding: '20px', margin: '20px', width: '300px', height:'700px' }}>
              <h3>Rank : {movie.rank}</h3>
              <h4>{movie.title}</h4>
              <p>{movie.description}</p>
              <img alt={movie.title} src={movie.image}  width={250} height={250}/>
              <h4>Rating : {movie.rating}</h4>
              <h4>Release : {movie.year}</h4>
              <div id = "uniqueButton">
                <button className="MoviesBtn" onClick={(e,id,movieRank,title,description,image,rating,year)=>handleWishList(e,movie.id,movie.rank,movie.title,movie.description,movie.image,movie.rating,movie.year)} >Add to Wishlist</button>
              </div>
              </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
      <div>
        {movies && movies.length > moviesPerPage && (
            <ul className="pagination">
                {Array.from({length: Math.ceil(movies.length/moviesPerPage)}).map((_,index)=>(
                    <li key={index} className={currentPage ===index + 1? 'active':''}>
                        <button onClick={()=> paginate(index +1)}>{index +1}</button>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
};