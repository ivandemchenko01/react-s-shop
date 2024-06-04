import Card from "../components/Card"
import React from "react"
import AppContext from "../context"

function Favorites() {
    const {favorites, onAddToFavorite} = React.useContext(AppContext);
    console.log(onAddToFavorite)
    return (
        <div className="content p-40">
            <div className="mb-40 d-flex">
                <h1>My favorites</h1>
            </div>
            <div className="d-flex flex-wrap">
                {
                    favorites.map((sneaker, index) => (
                        <Card
                            key={index}
                            title={sneaker.name}
                            price={sneaker.price}
                            imageUrl={sneaker.imageUrl}
                            favorited={true}
                            onFavorite={() => onAddToFavorite(sneaker)}
                             />
                    ))
                }
            </div>
        </div>
    );
}

export default Favorites;