import movies from './movies';

const getListMovies = () => {
  const randomNumbers = [];

  while(randomNumbers.length !== 4){
    let n = Math.floor(Math.random() * movies.length) + 1;
    if(!randomNumbers.includes(n)){
      randomNumbers.push(n);
    }
  }
  const listMovies = randomNumbers.map( i => movies[i]);
  return listMovies;
}

const getMovie = async (title) => {
  const url = `http://www.omdbapi.com/?t=${title}&plot=full&apikey=3beb9416`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const getMovies = async () => {
  const movies = getListMovies();
  const data = movies.map((m) => getMovie(m));
  const all = await Promise.all(data);
  return all;
}

export default getMovies;