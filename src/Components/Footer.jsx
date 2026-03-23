import React, { useState } from 'react';

function Footer() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Comment submitted: " + comment);
    setComment("");
  };

  return (
    <footer className="bg-dark text-light mt-5 p-4">
      <div className="container">
        <div className="row">

          {/* Section 1 */}
          <div className="col-md-4">
            <h5>KejaLink</h5>
            <p>
              The epitome of housing luxury. Find your dream home with ease and comfort.
            </p>
          </div>

          {/* Section 2 - Comment Section */}
          <div className="col-md-4">
            <h5>Leave a Comment</h5>
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control mb-2"
                rows="3"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button type="submit" className="btn btn-primary btn-sm">
                Submit
              </button>
            </form>
          </div>

          {/* Section 3 - Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-light" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-light" target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-light" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="bg-light" />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} KejaLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;