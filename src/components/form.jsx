import React from "react"
import SubmitButton from "./button";

function Form(props) {
    return (
        <form className="form-wrapper main-wrapper card-wrapper" id="username_form" onSubmit={props.getRepos}>
            <input type="text" className="username-input" placeholder="Enter username" name="username" />
            <div className="button-wrapper">
                <SubmitButton />
            </div>
            <span className="user-exist animated">
                User doesn't exist
            </span>
        </form>
    );
}

export default Form;