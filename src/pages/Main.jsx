import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";

const API_KEY = "207c014b3dbf7c7f14feb8d54377a83b";

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    setLoading(true)
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err)).finally(() => setLoading(false))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }else if(!searchTerm){
      alert("Please enter a text")
    }else if(!currentUser){
      alert("Please log in to see details")
    }
    
  };

  return (
    <>
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button className="text-white" type="submit">
          Search
        </button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div class="flex justify-center items-center">
          <div class="spinner-border text-white animate-spin block w-8 h-8 border-4 rounded-full" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        ) :
        
        
        movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Main;
