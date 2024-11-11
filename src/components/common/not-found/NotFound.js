import React from "react";
import "./not-found.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Seite nicht gefunden</h2>
      <p>
        Die gesuchte Seite konnte nicht gefunden werden. Sie wurde
        möglicherweise entfernt, umbenannt oder existierte von vornherein nicht.
      </p>
    </div>
  );
};

export default NotFound;
