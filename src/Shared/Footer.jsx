import logo from "../assets/logo.png";
const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <aside>
                <img src={logo} alt="" className="w-[150px]" />
                <p>Survey360<br />Providing reliable survey since 2023</p>
            </aside>
            <nav>
                <header className="footer-title">Services</header>
                <a className="link link-hover">Survey</a>
                <a className="link link-hover">Analytics</a>
                <a className="link link-hover">Query</a>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Surveys</a>
                <a className="link link-hover">Pricing</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">FAQ</a>
            </nav>
        </footer>
    );
};

export default Footer;