import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from 'components/Layout/Drawer';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import StarIcon from 'mdi-react/StarIcon';
import FileIcon from 'mdi-react/FileTableIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DashboardIndexPage from './Dashboard';
import SamplePage from './Sample';
import UserIndexPage from './Users';
import OrderListPage from './Order';

export const ScrollTopContext = React.createContext<Function>(() => {});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm
    }
  }
}));

const AdminPage = memo((props: {}) => {
  const classes = useStyles(props);

  const mainContent = useRef<HTMLDivElement>();
  const [menu] = useState([
    { path: '/', display: 'Dashboard', icon: ViewDashboardIcon },
    {
      path: '/usuarios',
      display: 'Usuários',
      // role: enRoles.admin,
      icon: AccountMultipleIcon
    },
    {
      path: '/pedidos',
      display: 'Pedidos',
      icon: FileIcon
    },
    { path: '/exemplos', display: 'Exemplos', icon: StarIcon }
  ]);

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current.scrollTo(0, 0), 100), []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <div className={classes.root}>
      <ScrollTopContext.Provider value={scrollTop}>
        <Drawer menu={menu}>
          <main ref={mainContent} className={classes.content}>
            <Switch>
              <Route path='/exemplos' component={SamplePage} />
              <Route path='/pedidos' component={OrderListPage} />
              <Route path='/usuarios' component={UserIndexPage} />
              <Route path='/' component={DashboardIndexPage} />
              <Route render={renderRedirect} />
            </Switch>
          </main>
        </Drawer>
      </ScrollTopContext.Provider>
    </div>
  );
});

export default AdminPage;
