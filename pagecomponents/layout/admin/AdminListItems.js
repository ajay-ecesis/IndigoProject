import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Archive,Comment,AssignmentLate,ConfirmationNumber,DeviceHub,Category,LocalMall,Layers,People,ExitToApp,ShoppingCart,Dashboard,Assignment, Announcement, CreditCard} from '@material-ui/icons'
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

    <Link href='/admin/categories'>
      <a>
        <ListItem button>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Manage Categories" />
        </ListItem> 
      </a>
    </Link>

    <Link href='/admin/markets'>
      <a>
        <ListItem button>
          <ListItemIcon>
            <LocalMall />
          </ListItemIcon>
          <ListItemText primary="Manage Markets" />
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
          <DeviceHub />
        </ListItemIcon>
        <ListItemText primary="Manage Manufacturers" />
      </ListItem> 
      </a>
    </Link>

    <Link href='/admin/comments'>
        <a>
      <ListItem button>
        <ListItemIcon>
          <Comment />
        </ListItemIcon>
        <ListItemText primary="Manage Comments" />
      </ListItem> 
      </a>
    </Link>

    <Link href='/admin/newsletters'>
        <a>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Manage Newsletters" />
      </ListItem> 
      </a>
    </Link>

  </div>
);
