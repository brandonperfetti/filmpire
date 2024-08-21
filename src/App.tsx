import { Route, Routes } from "react-router-dom";
import LeftSidebar from "./components/shared/LeftSidebar";
import Navbar from "./components/shared/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";
import { ActorInfo, Actors, MovieInfo, Movies, Profile } from "./pages";

function App() {
  return (
    <div className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <main className="flex min-h-dvh flex-1 flex-col px-4 md:px-6 pb-6 pt-24 md:pt-32 max-md:pb-14 sm:px-14">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieInfo />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/actors/:id" element={<ActorInfo />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </div>
  );
}

export default App;
