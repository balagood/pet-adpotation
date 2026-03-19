import axios from "axios";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setKeyword,setLoading,setMovie,setYear } from "../features/movieList";
import { Link } from "react-router-dom";

const API_KEY = "61d66495";

const Movie = ()=>{
    /* dispatch the data from movie list */
    const dispatch = useDispatch()
    /* using the selector we have to get the value */
    const{items,loading,keyword,totalResults,year,allYears,page}=useSelector(
        (state) => state.movies
    )

    /* useEffect to fetch the OMDB API */
    useEffect(()=>{
        const fetchMovie = async()=>{
            dispatch(setLoading())
            
            const searchTerm = keyword.trim() === "" ? "abc":keyword;
            const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}&y=${year}`;
            
            try{
                const res = await axios.get(url)
                const data = res.data
                if(data.Response === "True"){
                    dispatch(setMovie({items:data.Search,totalResults:parseInt(data.totalResults,10)}))
                }else{
                    dispatch(setMovie({items:[],totalResults:0}))
                }
            }catch(error){
                dispatch(setMovie({items:[],totalResults:0}))
            }
        }
        fetchMovie()

    },[keyword,page,year,dispatch])

    /* calculate the total page */
    const totalPages = Math.ceil(totalResults / 10)
    /* get the unique year from th redux */
    const years = allYears
    /* get the unique movie details */
    const uniqueItems = items.filter((item,index,self) => index === self.findIndex((m) => m.imdbID === item.imdbID));

    return(
    
        <div>
            <h2 className="text-center text-red-400">Movie List</h2>
            {/* loading state */}
            {loading && <p>Loading...</p>}

            {/* filter movie */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:ml-8 sm:mt-8 w-full sm:w-1/2 p-4 px-4 py-2 mt-8 border">
                    {/* search input */}
                    <input type="text" value={keyword} onChange={(e) => dispatch(setKeyword(e.target.value))}
                    placeholder="Search movies..."
                    className="border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>

                    {/* year options */}
                    <select value={year} onChange={(e) => dispatch(setYear(e.target.value))}
                        className="border border-gray-300 rounded-lg shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select the year</option>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>{yr}</option>
                        ))}
                    </select>

                </div>
                
                {/* pagination control */}
                <div className="flex items-center gap-4 sm:mt-8 sm:mr-8 justify-end">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400" disabled={page <= 1} onClick={() => dispatch({ type: "movies/setPage", payload: page - 1 })}>Previous</button>
                <span className="mt-2 text-red-400">Page {page} of {totalPages}</span>
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400" disabled={page >= totalPages} onClick={() => dispatch({ type: "movies/setPage", payload: page + 1 })}>Next</button>
                </div>
            </div>

            {/* display the movie list */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-4 p-4">
                {uniqueItems.map((movie)=>(
                    <div className="bg-white flex flex-col rounded-lg shadow-md  hover:shadow-lg"> 
                        <div className="flex-1">
                            <Link to={`/movie/${movie.imdbID}`}><img  className="w-full h-60 object-cover rounded-t-lg" src={movie.Poster} alt="" /></Link>
                            <p className="mb-6 mt-4 p-2 text-body"><b><span className="text-red-700">Title</span></b> - {movie.Title}</p>
                        </div>

                        <div className="flex justify-between">
                             <p className="mb-6 mt-4 p-2 text-body"><b><span className="text-green-500">Type</span></b> - {movie.Type}</p>
                             <p className="mb-6 mt-4 p-2 text-body"><b><span className="text-black">Year</span></b> - {movie.Year}</p>
                        </div>


                        <div className="mt-2 flex bg-blue-500 text-white border-b-blue-500 rounded">
                            <Link to={`/movie/${movie.imdbID}`} className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Read more
                            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg></Link>
                        </div>

                    </div>
                ))}
            </div>

            {/* pagination control */}
            <div className="flex items-center gap-4 sm:mt-8 sm:mr-8 justify-end">
                <button disabled={page <= 1} onClick={() => dispatch({type:"movies/setPage",payload:page-1})}>Previous</button>
                <span className="mb-4 text-red-400">Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => dispatch({type:"movies/setPage",payload:page+1})}>Next</button>
            </div>
        </div>
        
        
    )
}

export default Movie