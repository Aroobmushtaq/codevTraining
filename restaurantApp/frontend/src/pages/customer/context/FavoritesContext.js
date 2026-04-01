import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:5000/api/favorites/my",
        getAuthConfig()
      );

      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const isFavorite = (itemId) => {
    return favorites.some((fav) => {
      if (fav.menuItem && fav.menuItem._id) {
        return fav.menuItem._id === itemId;
      }
      return fav._id === itemId;
    });
  };

  const addFavorite = async (itemId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/favorites/${itemId}`,
        {},
        getAuthConfig()
      );
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorites/${itemId}`,
        getAuthConfig()
      );

      setFavorites((prev) =>
        prev.filter((fav) => {
          if (fav.menuItem && fav.menuItem._id) {
            return fav.menuItem._id !== itemId;
          }
          return fav._id !== itemId;
        })
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const toggleFavorite = async (itemId) => {
    if (isFavorite(itemId)) {
      await removeFavorite(itemId);
    } else {
      await addFavorite(itemId);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        fetchFavorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};