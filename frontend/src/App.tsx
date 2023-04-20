import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppMenu } from "./components/AppMenu";
import { AppHome } from "./components/AppHome";
import { AnimalsShowAll } from "./components/animals/AnimalShowAll";
import { SheltersShowAll } from "./components/shelters/ShelterShowAll";
import { AnimalDetails } from "./components/animals/AnimalDetails";
import { ShelterDetails } from "./components/shelters/ShelterDetails";
import { ShelterAdd } from "./components/shelters/ShelterAdd";
import { ShelterDelete } from "./components/shelters/ShelterDelete";
import { ShelterUpdate } from "./components/shelters/ShelterUpdate";
import { ShelterStatistics } from "./components/shelters/ShelterAnimalStatistic";



function App() {
  return (

    <React.Fragment>
      <Router>
              <AppMenu />
              <Routes>
                      
                      <Route path="/" element={<AppHome />} />

                      {/* shelter routes */}
                      <Route path="/shelter" element={<SheltersShowAll />}/>
                      <Route path="/shelter/save" element={<ShelterAdd />} />
                      <Route path="/shelter/:shelterId" element={<ShelterDetails />}/>
                      <Route path="/shelter/delete/:shelterId" element={<ShelterDelete />} />
                      <Route path="/shelter/update/:shelterId" element={<ShelterUpdate />} />
                      <Route path="/shelter/statistics-countAnimal" element={<ShelterStatistics />} />
                      {/* animal routes */}
                      <Route path="/animal" element={<AnimalsShowAll />}/>
                      <Route path="/animal/:animalId" element={<AnimalDetails />} />
              </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;