import { useState, useEffect } from "react";
import "./App.css";
import DiscoverCard from "./components/DiscoverCard";
import BanList from "./components/BanList";
import History from "./components/History";

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_DOG_API_KEY;

  // Function to fetch a random dog
  const fetchRandomDog = async () => {
    try {
      const response = await fetch(
        "https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1",
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );
      const data = await response.json();
      return data && data[0] ? data[0] : null;
    } catch (error) {
      console.error("Error fetching dog:", error);
      return null;
    }
  };

  // add current dog to history (up to 10)
  const addToHistory = (dog) => {
    if (dog && !history.find((h) => h.id === dog.id)) {
      setHistory((prev) => [dog, ...prev].slice(0, 10));
    }
  };

  // add attribute to ban list
  const addToBanList = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes((prev) => [...prev, attribute]);
    }
  };

  // remove attribute from ban list
  const removeFromBanList = (attribute) => {
    setBannedAttributes((prev) => prev.filter((attr) => attr !== attribute));
  };

  // check if current dog should be skipped based on ban list
  const shouldSkipDog = (dog) => {
    if (!dog || !dog.breeds || dog.breeds.length === 0) return false;

    const breed = dog.breeds[0];
    return bannedAttributes.some(
      (attr) =>
        breed.name?.toLowerCase().includes(attr.toLowerCase()) ||
        breed.breed_group?.toLowerCase().includes(attr.toLowerCase()) ||
        breed.temperament?.toLowerCase().includes(attr.toLowerCase())
    );
  };

  // discover new dog based on ban list
  const discoverNewDog = async () => {
    setLoading(true);
    let attempts = 0;
    const maxAttempts = 30;
    let foundDog = null;

    try {
      // pick a dog, after 30 attempts to pick an unbanned dog
      while (attempts < maxAttempts) { // i had to do this to avoid long wait
        const dog = await fetchRandomDog();

        if (!dog) {
          attempts++;
          continue;
        }

        // Check if the fetched dog should be skipped based on ban list
        if (shouldSkipDog(dog)) {
          attempts++;
          continue; // try again
        }

        foundDog = dog;
        break;
      }

      // fixes issue, only adding dog if found
      if (foundDog) {
        setCurrentDog(foundDog);
        addToHistory(foundDog);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial dog on component mount
  useEffect(() => {
    const initializeDog = async () => {
      await discoverNewDog();
    };
    initializeDog();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐕 FurFetch</h1>
        <p>Discover your perfect furry companion!</p>
      </header>

      <main className="app-main">
        <div className="discover-section">
          <DiscoverCard
            dog={currentDog}
            loading={loading}
            onDiscover={discoverNewDog}
            onAddToBanList={addToBanList}
          />
        </div>

        <aside className="app-sidebar">
          <BanList
            bannedAttributes={bannedAttributes}
            onRemoveFromBanList={removeFromBanList}
          />

          <History history={history} onSelectDog={setCurrentDog} />
        </aside>
      </main>
    </div>
  );
}

export default App;
