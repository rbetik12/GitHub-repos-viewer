import React from "react";
import "./styles/App.css";
import ReposTable from "./components/table";
import Form from "./components/form";
import MainText from "./components/main_text";
import Header from "./components/header";
import Footer from "./components/footer";
import setupCollapse from "./scripts/collapse_header";

const USERNAME = "rbetik12";

class App extends React.Component {

    gettingRepos = async () => {
        const serverRes = await fetch(`http://localhost:8000/repos/${USERNAME}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "User-agent": ""
            }
        });
        const data = await serverRes.json();
        console.log(data);
    }

    render() {
        return (
            <div className="main">
                <Header />
                <MainText />
                <Form getRepos={this.gettingRepos} />
                <div className="table-wrapper main-wrapper">
                    <ReposTable />
                </div>
                <Footer />
            </div>
        );
    }
}

setupCollapse();

export default App;