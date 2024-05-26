const Card = ({ type }) => {
  const getEmoji = (type) => {
    switch (type) {
      case "poule":
        return "🐔";
      case "renard":
        return "🦊";
      case "vipere":
        return "🐍";
      default:
        return "❓";
    }
  };

  return (
    <div>
       <div className="card">{getEmoji(type)}</div>
    </div>
   );
};
export default Card;
