import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Dashboard} from '@material-ui/icons'
import Link  from 'next/link'

export const mainListItems =  (
  <div>

  <Link href='/manufacturer/dashboard'>
      <a>
      <ListItem button>   
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />   
      </ListItem>
      </a>
    </Link>

  </div>
);
