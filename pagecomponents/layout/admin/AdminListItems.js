import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import ListSubheader from '@material-ui/core/ListSubheader';
import {Archive,AssignmentLate,ConfirmationNumber,DeviceHub,Category,LocalMall,Layers,People,ExitToApp,ShoppingCart,Dashboard,Assignment, Announcement, CreditCard} from '@material-ui/icons'
import Link  from 'next/link'

export const mainListItems =  (
  <div>

  <Link href='/admin/dashboard'>
      <a>
      <ListItem button>   
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />   
      </ListItem>
      </a>
    </Link>
    
    <Link href='/admin/users'>
        <a>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem> 
      </a>
    </Link>

    <Link href='/admin/brands'>
        <a>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Manage Brands" />
      </ListItem> 
      </a>
    </Link>

    <Link href='/admin/manufacturers'>
        <a>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Manage Manufacturers" />
      </ListItem> 
      </a>
    </Link>

  </div>
);

/* export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>

  </div>
); */