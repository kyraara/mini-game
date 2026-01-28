function FloatingHeart({ id, left }) {
    return (
        <div
            className="heart-float"
            style={{ left: `${left}%`, bottom: '20%' }}
        >
            💕
        </div>
    );
}

export default FloatingHeart;
