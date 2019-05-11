import React from "react"
import SubmitButton from "./button";

function Form(props) {
    return (
        <div className="form-wrapper main-wrapper card-wrapper">
            <input type="text" className="username-input" placeholder="Enter username" />
            <div className="button-wrapper">
                <SubmitButton getRepos={props.getRepos} />
            </div>
        </div>
    );
}

export default Form;