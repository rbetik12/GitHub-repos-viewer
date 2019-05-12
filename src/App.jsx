import React from "react";
import "./styles/App.css";
import ReposTable from "./components/table";
import Form from "./components/form";
import MainText from "./components/main_text";
import Header from "./components/header";
import Footer from "./components/footer";
import setupCollapse from "./scripts/collapse_header";


class App extends React.Component {

    state = {
        data: []
    }

    constructor(props) {
        super(props);
    }

    gettingRepos = async (e) => {
        e.preventDefault();
        const USERNAME = e.target.elements.username.value;
        const serverRes = await fetch(`http://localhost:8000/repos/${USERNAME}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "User-agent": ""
            }
        });
        const received_data = await serverRes.json();
        this.setState({
            data: received_data
        })
        await console.log(received_data);
    }

    render() {
        return (
            <div className="main-container">
                <div className="content-wrapper">
                    <Header />
                    <MainText />
                    <Form getRepos={this.gettingRepos} />
                    <div className="table-wrapper main-wrapper">
                        <ReposTable repos={this.state.data} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

setupCollapse();

export default App;