import React from "react";

function MainText() {
    return (
        <div className="text-wrapper main-wrapper card-wrapper main-text-wrapper">
            <div id="header-main" className="animated">
                GitHub repositories viewer
            </div>
            <div id="text-main" className="animated">
                That simple SPA can be used to check your's or other user's GitHub repositories. All you need to do is just to fill username and click show repositories button.
                Don't worry if you made a mistake in username, app will just show you that it doesn't exist.
            </div>
        </div>
    );
}

export default MainText;