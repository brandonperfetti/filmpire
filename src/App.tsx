import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ActorInfo, Actors, MovieInfo, Movies, Profile } from "./pages";

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfo />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:id" element={<ActorInfo />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
