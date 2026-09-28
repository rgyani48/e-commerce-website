import React from "react";

function Rating({ value, text }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${
            value >= star ? "bi-star-fill" : "bi-star"
          } text-warning`}
        ></i>
      ))}

      {text && <span className="ms-2">{text}</span>}
    </div>
  );
}

export default Rating;