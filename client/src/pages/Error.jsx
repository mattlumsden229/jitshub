import { Link } from "react-router-dom"

export default function Error() {
    return (
        <div className="">
            <h3>Something went wrong...</h3>
            <Link to='/' className="btn btn-dark">
                Go Back
            </Link>
        </div>
    )
}