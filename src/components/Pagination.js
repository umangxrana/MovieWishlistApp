
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
 
export default function Pagination() {
    const[movies,setMovies] = useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const[moviesPerPage]=useState(6);
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
            alert("Movie added to wishlist");
        })
        .catch(error => {
            console.error('Error adding movie to wishlist:', error.message);
        });
    };
 
 
 
    return (
        <div>
      <h1>Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentMovies && currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
              <div key={movie.id} style={{ border: '2px solid #ddd', padding: '20px', margin: '20px', width: '300px' }}>
              <h3>{movie.rank}</h3>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <img alt={movie.title} src={movie.image}  width={250} height={250}/>
              <h3>{movie.rating}</h3>
              <h3>{movie.year}</h3>
              <button className="MoviesBtn" onClick={(e,id,movieRank,title,description,image,rating,year)=>handleWishList(e,movie.id,movie.rank,movie.title,movie.description,movie.image,movie.rating,movie.year)} >Add to Wishlist</button>
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

