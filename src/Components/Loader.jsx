import React from "react";
import "../css/Loader.css"; // import the external css
const Loader = () => {
  return (
    <section className="loader">
      {/* <!-- From Uiverse.io by Li-Deheng -->  */}
      <div class="loader">
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
      </div>
    </section>
  );
};
export default Loader;