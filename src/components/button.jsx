import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        height: "100%",
    },
    input: {
        display: "none",
    },
});

class SubmitButton extends React.Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary"  onClick={() => { this.props.getRepos(); }}>
                    Show repositories
                </Button>
            </div>
        );
    }
}

SubmitButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitButton);