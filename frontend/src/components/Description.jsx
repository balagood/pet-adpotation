import axios from "axios"
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { setLoading,setRating,setSelectedMovie } from "../features/movieList"

const API_KEY = "61d66495";

const Description = () =>{
    /* using an params to get the particular movie id */
    const {id} = useParams();
    /* dispatch the data from movie list */
    const dispatch = useDispatch()

    /* using the selector we have to get the value */
    const {selectedMovie,rating,loading } = useSelector(
        state => state.movies,
        //rating =>state.rating
    )

    /* using an event handling to store the star and id value */
    const handleClick = (rating) =>{
        dispatch(setRating({id,rating}))
    }

    /* useEffect to fetch the OMDB API based on the imdb id */
    useEffect(() => {
        async function callApi() {
            dispatch(setLoading())
            const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
            try {
                const res = await axios.get(url);
                const data = res.data;
                if (data.Response === "True") {
                dispatch(setSelectedMovie(data));
                } else {
                dispatch(setSelectedMovie(null));
                }
            } catch (err) {
                console.error(err);
                dispatch(setSelectedMovie(null));
            }
            //dispatch(setSelectedMovie(data.data.meals[0]))
        }
        callApi()
    }, [id,dispatch])
    

    return(
        <div className="p-6">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-center flex-1 mt-4 text-red-400">Movie Description</h2>
                <Link to="/" className="text-white bg-blue-500 border-8 p-4 rounded-4xl hover:text-white bold mt-4">Back to Homepage</Link>
            </div>

            {/* Loading state */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
                {/* Only render if selectedMovie exists */}
                {selectedMovie && (
                    <>
                    {/* Left side: Movie Poster */}
                    <div className="w-full md:w-1/2">
                        <img
                        src={selectedMovie.Poster}
                        alt={selectedMovie.Title}
                        className="w-full h-auto max-h-125 object-contain rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right side: Movie Detail */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 text-green-600">{selectedMovie.Title}</h2>
                        <p className="text-gray-700 leading-relaxed sm:text-center md:text-right">
                        <strong><span className="text-yellow-500">IMDB Rating:</span></strong> {selectedMovie.imdbRating} / 10
                        </p>

                        {/* it is an your rating  */}
                        <p className="text-gray-700 leading-relaxed flex justify-center md:justify-end">
                        <strong><span className="text-green-500">Your Rating:</span></strong>
                        {Array.isArray(rating) && rating.some(r => r.id ==id) ? (
                            rating.filter(ratingObj =>ratingObj.id == id)
                                .map((ratingObj) => (
                                    <div key={ratingObj.id} className="flex space-x-2 justify-end star">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} onClick={() => handleClick(star)} 
                                        className={`text-3xl cursor-pointer transition-colors duration-200 ${ratingObj.id == id ? star <= ratingObj.rating ? "text-yellow-400" : "text-gray-400":"text-gray-400"} hover:text-yellow-400`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12,2 15.09,8.26 22,9.27 17,13.97 18.18,21 12,17.77 5.82,21 7,13.97 2,9.27 8.91,8.26"/></svg>
                                        </span>
                                    ))}
                                    </div>
                                ))
                            ) : 
                            (
                            <div class="flex space-x-2 justify-end star">
                                {[1, 2, 3, 4, 5].map((star) => (
                                
                                <span key={star} onClick={() => handleClick(star)}
                                className={`text-3xl cursor-pointer transition-colors duration-200 ${rating.id == id? star <= rating.rating? 'text-yellow-400': 'text-gray-400': 'text-gray-400'} hover:text-yellow-400`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12,2 15.09,8.26 22,9.27 17,13.97 18.18,21 12,17.77 5.82,21 7,13.97 2,9.27 8.91,8.26"/></svg>
                                </span>
                                ))}
                            </div>
                        )}
                        </p>
                        <p className="text-gray-700 mb-2"><strong>Year:</strong> {selectedMovie.Year}</p>
                        <p className="text-gray-700 mb-2"><strong>Released Date:</strong> {selectedMovie.Released}</p>
                        <p className="text-gray-700 mb-2"><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                        <p className="text-gray-700 mb-2"><strong>Language:</strong> {selectedMovie.Language}</p>
                        <p className="text-gray-700 mb-2"><strong>Genre:</strong> {selectedMovie.Genre}</p>
                        <p className="text-gray-700 leading-relaxed"><strong>Plot:</strong> {selectedMovie.Plot}</p>
                        <p className="text-gray-700 leading-relaxed"><strong>Director:</strong> {selectedMovie.Director}</p>
                    </div>
                    </>
                )}
            </div>
        </div>
                        
    )
}

export default Description