function Info({title, description, image}) {
    return (
        <div className="empty-cart-container">
            <img width={150} height={150} src={image} alt="Empty" />
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

export default Info;