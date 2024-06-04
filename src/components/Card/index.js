import React from 'react'
import styles from './card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'

function Card({
    id,
    title,
    price,
    imageUrl,
    onPlus,
    onFavorite,
    favorited = false,
    isLoading = false}) {

    const {isAddedToCart} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus();
    }

    const onClickFavorite = () => {
        onFavorite();
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {
                isLoading ? (<ContentLoader
                    speed={2}
                    width={150}
                    height={197}
                    viewBox="0 0 150 197"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="105" rx="10" ry="10" width="171" height="15" />
                    <rect x="0" y="130" rx="10" ry="10" width="140" height="15" />
                    <rect x="0" y="172" rx="10" ry="10" width="80" height="24" />
                    <rect x="120" y="167" rx="5" ry="5" width="30" height="30" />
                </ContentLoader>)
                    :
                    (<>
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? "img/heart-on.svg" : "img/heart-off.svg"} alt="Unlicked" />
                        </div>
                        <img width={133} height={113} src={imageUrl} alt="Sneaker" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена</span>
                                <b>{price} USD</b>
                            </div>
                            <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isAddedToCart(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="Plus" />
                        </div>
                    </>)
            }
        </div>
    );
}

export default Card;