import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
export default function Wishlist() {
    // const[movies,setMovies] = useState([]);
    const[movie,setMovie]=useState({
        "id":"",
        "movieRank":null ,
        "title": "",
        "description": "",
        "image": "",
        "rating": "",
        "year": null
});
const fetchMovies = async (event) => {
  try {
      const email=localStorage.getItem("email");
      const response = await axios.get(`http://localhost:8084/api/v4/wishListService/movies/${email}`,{
        
      headers: {
              Authorization:`${localStorage.getItem("token")}`
          }
      });
      setMovie(response.data);
  }catch(error){
      console.error('Error fetching movie data :',error.message);
  }
};
    useEffect(()=>{
       
        fetchMovies();
    },[]);
    
    const handleDeleteWishlist = (e, id) => {
      e.preventDefault();
      axios.delete(`http://localhost:8084/api/v4/wishListService/delete/movie/${id}`, movie, {
            
        })
        .then(response => {
            // setMovies(response.data);
            fetchMovies();
            toast.success("Movie deleted from wishlist");
        })
        .catch(error => {
            console.error('Error deleting movie from wishlist:', error.message);
        });
    };
    return (
      <div id="dbur01">
    <h1 className="wishlistheadername">Wishlist</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {movie && movie.length > 0 ? (
        movie.map((movie) => (
            <div key={movie.id} style={{ border: '1px solid #ddd', padding: '20px', margin: '20px', width: '300px' }}>
            <h3>{movie.rank}</h3>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <img alt={movie.title} src={movie.image} width={250} height={250} />
            <h3>{movie.rating}</h3>
            <h3>{movie.year}</h3>
            <button className="WishlistBtn" onClick={(e,id)=> handleDeleteWishlist(e,movie.id)} >Delete</button>

            </div>
        ))
      ) : (
        <p>No movies available.</p>
      )}
    </div>
  </div>
);
};
