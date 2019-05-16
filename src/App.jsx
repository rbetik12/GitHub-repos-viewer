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

        if (received_data[received_data.length - 1].status_code === 200) {
            this.setState({
                data: received_data
            });
            document.getElementsByClassName("table-footer")[0].style.display = "table-footer-group";
            document.getElementsByClassName("table-body")[0].style.display = "table-row-group";
        }
        else{
            document.getElementsByClassName("table-footer")[0].style.display = "none";
            document.getElementsByClassName("table-body")[0].style.display = "none";

        }
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