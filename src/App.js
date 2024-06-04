import React from "react"
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import AppContext from './context'

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from './pages/Home'
import Favorites from "./pages/Favorites";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCardOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onAddToCart = async (item) => {
    if (!cartItems.find(fav => fav.id === item.id))
      await axios.post('/cart', item);
    else
      await axios.delete(`/cart/${item.id}`);

    await axios.get('/cart')
      .then(response => setCartItems(response.data));
  };

  const onAddToFavorite = async (item) => {
    if (!favorites.find(fav => fav.id === item.id))
      await axios.post('/favorite', item);
    else
      await axios.delete(`/favorite/${item.id}`);

    await axios.get('/favorite')
      .then(res => setFavorites(res.data));
  }

  const onRemoveItem = (id) => {
    axios.delete(`cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id))
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isAddedToCart = (id) => {
    return cartItems.some(obj => Number(obj.id) == Number(id));
  }

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  React.useEffect(async () => {
    setIsLoading(true);

    axios.get('/cart')
      .then(res => setCartItems(res.data));

    await axios.get('/items')
      .then(res => setItems(res.data));
    console.log('loading ended')
    await sleep(1000);

    axios.get('/favorite')
      .then(res => setFavorites(res.data));
    setIsLoading(false);
  }, []);

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isAddedToCart,
      onAddToFavorite,
      setCartItems
    }}>
      <div className="wrapper clear">
        {cartOpened &&
          <Drawer
            items={cartItems} onCloseCart={() => setCardOpened(false)} onRemove={onRemoveItem} />}

        <Header onClickCart={() => setCardOpened(true)} />
        <Routes>
          <Route
            path="/" exact element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
                isAddedToCart={isAddedToCart} />}>
          </Route>

          <Route
            path="/favorites" exact element={
              <Favorites />}>
          </Route>
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
