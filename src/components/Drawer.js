import Info from '../components/Info'
import React from 'react'
import AppContext from '../context'
import axios from 'axios'

function Drawer({ onCloseCart, onRemove, items = [] }) {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);

    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("/orders", cartItems)

            for (let item of cartItems)
                await axios.delete(`/cart/${item.id}`);

            setCartItems([]);
            setOrderId(data.id);
            setIsOrderCompleted(true)
        } catch (error) {
            alert('Some error happening');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Cart<img onClick={onCloseCart} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" /></h2>

                {items.length === 0 && <Info
                    title={isOrderCompleted ? "Order completed!" : "Your cart is empty"}
                    description={isOrderCompleted ? `Your order is success with number #${orderId}` : "Please add to cart something"}
                    image={isOrderCompleted ? "img/order-accepted.svg" : "img/empty-box.svg"} />}

                {items.length > 0 && <div className="items">
                    {
                        items.map((item) => (
                            <div className="cartItem d-flex align-center mb-20">
                                <div style={{
                                    backgroundImage: `url(${item.imageUrl})`
                                }} className="cartItemImg">

                                </div>
                                <div className="mr-20 flex">
                                    <p className="mb-5">{item.name}</p>
                                    <b>{item.price} USD</b>
                                </div>
                                <img className="removeBtn" onClick={() => onRemove(item.id)} src="/img/btn-remove.svg" alt="Remove" />
                            </div>
                        ))
                    }
                </div>}



                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Sum: </span>
                            <div></div>
                            <b>15 USD</b>
                        </li>
                        <li>
                            <span>Fee 5%:</span>
                            <div></div>
                            <b>2 USD</b>
                        </li>
                    </ul>
                    <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow-right.svg" alt="Arrow Right" /></button>
                </div>

            </div>
        </div>

    );
}

export default Drawer;