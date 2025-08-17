import Link from 'next/link';
import "../global.css"

export default function NotFound() {
    return (
        <div className="error-page">
            <h1>500</h1>
            <p>Status Internal Server Error</p>
            <Link href="/">Go back to Homepage</Link>
        </div>
    );
}