import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { setReviews } from '../../store/actions/admin';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from '../../helpers/axios';

import './styles.scss';
import { Link, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    overflowX: 'auto',
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 320,
  },
  title: {
    flexGrow: 1,
  },
});

class AdminLayout extends React.Component {
  componentDidMount() {
    const { setReviews } = this.props;
    axios.get('/reviews').then(({ data }) => setReviews(data));
  }

  render() {
    const { classes, reviews } = this.props;
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Админка
            </Typography>
            <Button color="inherit">
              <a href="/">В игру</a>
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Оценка</TableCell>
                <TableCell>Жанры/Плейлисты</TableCell>
                <TableCell>Баги</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews &&
                reviews.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.playlists}</TableCell>
                    <TableCell>{row.bugs}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default connect(
  state => ({
    reviews: state.admin.reviews,
  }),
  { setReviews }
)(withStyles(styles)(AdminLayout));
