import React from 'react';
import ReposTable from './table';
import './App.css';
import SubmitButton from './button';

const USERNAME = "rbetik12";

class App extends React.Component {

    gettingRepos = async() => {
        const serverRes = await fetch(`http://localhost:8000/repos/${USERNAME}`,{
            method: "GET",
            headers: {
                "Content-type": 'application/json',
                "User-agent" : "lmao"
            }
        });
        const data = await serverRes.json();
        console.log(data);
    }

    render() {
        return (
            <div className="main">
                <header>
                    <div className="text-header">
                        GitHub repositories viewer
                    </div>
                </header>
                <div className="text-wrapper">
                    <div id="header-main">
                        GitHub repositories viewer
                    </div>
                    <div className="text-main">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dui purus, varius eu consequat ac, porta non nibh.
                        Nullam eu enim sed odio consequat consequat sit amet vel enim. Morbi rhoncus tempus mi vitae fermentum.
                        Nam eget suscipit ligula, ut placerat nisl. Maecenas dolor leo, consequat eget sodales ac, tempus ut nulla.
                        Maecenas vitae neque vel velit malesuada blandit. Sed blandit eu purus sed mattis. Praesent vulputate sem libero, eu scelerisque sem condimentum ut.
                        Proin non metus nec sem pretium suscipit ac eu ipsum. Praesent quis dignissim sapien, eget eleifend eros. Mauris non eros urna. Curabitur quis egestas odio, dictum sodales est.
                        Vivamus eu velit tristique, vestibulum quam non, malesuada erat. Aliquam posuere arcu non enim auctor varius.
                        Phasellus vel fermentum nunc. Vestibulum scelerisque tempor luctus. Cras varius est eget felis pulvinar, non sagittis orci pretium.
                        Praesent egestas dolor in nibh tincidunt, in accumsan tortor blandit. Donec lacinia sit amet metus vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla quis mauris a felis dapibus lacinia id sit amet nisi. Donec accumsan tristique quam, et efficitur orci. Donec nec pharetra libero, vel viverra quam.
                        Donec odio nisl, mollis vel sollicitudin pharetra, fringilla quis turpis. Ut tempor ipsum nec risus hendrerit, et varius orci rhoncus. Etiam tempus dignissim massa vel facilisis.
                </div>
                </div>
                <div className="form-wrapper">
                    <input type="text" className="username-input" placeholder="Enter username" />
                    <div className="button-wrapper">
                        <div className="button-container">
                            <SubmitButton getRepos={this.gettingRepos}/>
                        </div>
                    </div>
                </div>
                <div className="table-wrapper">
                    <ReposTable />
                </div>
                <footer className="footer-wrapper">
                    <div className="footer-container">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dui purus, varius eu consequat ac, porta non nibh.
                        Nullam eu enim sed odio consequat consequat sit amet vel enim. Morbi rhoncus tempus mi vitae fermentum.
                        Nam eget suscipit ligula, ut placerat nisl. Maecenas dolor leo, consequat eget sodales ac, tempus ut nulla.
                    </div>
                </footer>
            </div>
        );
    }
}

window.addEventListener("scroll", function () {
    var headerCollapsed = document.querySelector("header");
    var header = document.getElementById("header-main");
    if (window.pageYOffset >= 70) {
        headerCollapsed.style.opacity = 1;
        header.style.opacity = 0;
    }
    else {
        headerCollapsed.style.opacity = 0;
        header.style.opacity = 1;
    }
});

export default App;