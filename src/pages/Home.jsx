import Card from "../components/Card";
import React from "react"
import AppContext from "../context"

function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,

}) {
    const renderItems = () => {
        const filtered = items && items.filter(sneaker => sneaker.name.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(10)] : filtered).map((sneaker, index) => (
            <Card
                id={sneaker && sneaker.id}
                key={index}
                title={sneaker && sneaker.name}
                price={sneaker && sneaker.price}
                imageUrl={sneaker && sneaker.imageUrl}
                onPlus={() => onAddToCart(sneaker)}
                onFavorite={() => onAddToFavorite(sneaker)}
                isLoading={isLoading} />
        ));
    }

    return (<div className="content p-40">
        <div className="mb-40 d-flex align-center justify-between">
            <h1>{searchValue ? `Search "${searchValue}"` : "All sneakers"}</h1>
            <div className="search-block d-flex">
                <img src="img/search.svg" alt="Search" />
                {searchValue && <img onClick={() => setSearchValue('')} className="removeBtn clear" src="/img/btn-remove.svg" alt="Clear" />}
                <input type="text" onChange={onChangeSearchInput} value={searchValue} placeholder="Search. . ." />
            </div>
        </div>
        <div className="sneakers d-flex flex-wrap">
            {
                renderItems()
            }
        </div>
    </div>);
}

export default Home;