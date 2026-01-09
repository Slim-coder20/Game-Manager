import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-container">
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/" className="btn">Go back to the home page</Link>
    </div>
  )
}