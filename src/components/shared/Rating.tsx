import React from "react";

import StarEmpty from "/assets/icons/star-empty.svg";
import StarFilled from "/assets/icons/star-filled.svg";

interface RatingProps {
  value: number;
  precision?: number;
}

const Rating: React.FC<RatingProps> = ({ value, precision = 0.1 }) => {
  const fullStars = Math.floor(value);
  const remaining = (value - fullStars).toFixed(1);
  const halfStar = parseFloat(remaining) >= precision ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex space-x-1">
      {[...Array(fullStars)].map((_, index) => (
        <img key={index} src={StarFilled} alt="Full Star" className="w-5 h-5" />
      ))}

      {halfStar === 1 && (
        <img
          src={StarFilled}
          alt="Half Star"
          className="w-5 h-5"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <img key={index} src={StarEmpty} alt="Empty Star" className="w-5 h-5" />
      ))}
    </div>
  );
};

export default Rating;
