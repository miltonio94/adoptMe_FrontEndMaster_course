import { useState, useEffect } from "react"
import Pet from "./Pet"

const ANIMALS = ["bird", "cat", "dog", "reptile"];
const BREED = ["French Bulldog"];

const SearchParams = () => {

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [pets, setPets] = useState([]);
  const [breed, setBreed] = useState("");

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}>
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}>
            <option />
            {BREED.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {
        pets.map(pet => (
          <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
        ))
      }
    </div>
  );
};

export default SearchParams;

