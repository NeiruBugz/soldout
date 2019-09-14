import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.getReviews(),
    };
  }

  getReviews = () => {
    const rows = [];
    axios.get('/reviews').then(({ data }) => {
      data.forEach(item => {
        rows.push(item);
      });
    });
    return rows;
  };

  render() {
    const classes = this.props;
    const { rows } = this.state;
    console.log(rows);
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Админка
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Playlists</TableCell>
                <TableCell align="right">Bugs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                    <TableCell align="right">{row.playlists}</TableCell>
                    <TableCell align="right">{row.bugs}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(AdminLayout);
