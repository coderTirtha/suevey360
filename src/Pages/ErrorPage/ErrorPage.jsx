import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center gap-4">
            <p>Content not found! May be the page have been moved to another directory or another file!</p>
            <Link to={'/'}><button className="btn">Back to Home</button></Link>
        </div>
    );
}

export default ErrorPage;