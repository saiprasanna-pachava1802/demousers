import MenuBar from "../components/MenuBar";

function Home() {
    return (
        <div>
            <MenuBar />

            <div className="home-content">
                <h1>Welcome to Support Management System</h1>
                <h3>Please select an option from the menu.</h3>
            </div>
        </div>
    );
}

export default Home;