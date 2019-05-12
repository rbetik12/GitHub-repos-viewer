import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

//Styles for action buttons
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});
//Component that contains buttons to control table
class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

//Creates JSON object with info about repo
let counter = 0;
function createData(name_, language_, forks_, stars_, id_) {
    counter += 1;
    return { id: counter, name: name_, language: language_, forks: forks_, stars: stars_, repoId: id_ };
}

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: "auto",
    },
});

//Defines custom style for header's cells
const HeaderCell = withStyles({
    head: {
        fontWeight: 700,
        color: "black",
        height: 48,
    },
})(TableCell);

//Table
class ReposTable extends React.Component {
    //Fills info to rows to display

    componentWillUpdate(props) {
        // Checks if data really changed to avoid recursively calling update function
        if (!this.compareProps(props)) {
            let repos = Array.from(props.repos);
            let updatedRows = new Array();
            for (let i = 0; i < repos.length; i++) {
                let row = repos[i];
                updatedRows.push(createData(row.full_name, row.language, row.forks, row.stars, row.id));
            }
            updatedRows.sort((a, b) => (a.stars > b.stars ? -1 : 1));
            this.setState({
                rows: updatedRows,
                page: 0,
                rowsPerPage: 5
            });
        }
        else
            return;
    }

    compareProps(props) {
        //Compares previous username and new one
        let newFullName = props.repos[0].full_name.toString();
        let newUsername = newFullName.substring(0, newFullName.indexOf('/'));
        let currentFullName;
        let currentUsername;
        if (this.state.rows[0].name) {
            currentFullName = this.state.rows[0].name.toString();
            currentUsername = currentFullName.substring(0, currentFullName.indexOf('/'));
        }
        console.log(newUsername);
        console.log(currentUsername);
        return newUsername === currentUsername;
    }

    state = {
        rows: [{ name: null }],
        page: 1,
        rowsPerPage: 0,
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <HeaderCell component="th" scope="row">Repository name</HeaderCell>
                            <HeaderCell align="right" classes={{ root: "table-header-cell" }} variant="head">Language</HeaderCell>
                            <HeaderCell align="right">Forks</HeaderCell>
                            <HeaderCell align="right">Stars</HeaderCell>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.language}</TableCell>
                                    <TableCell align="right">{row.forks}</TableCell>
                                    <TableCell align="right">{row.stars}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[ 5, 10, 25]}
                                    colSpan={4}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

ReposTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReposTable);