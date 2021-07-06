import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Dashboard, People, Bookmark, Security} from '@material-ui/icons'
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
      
      <Link href='/manufacturer/saved-posts'>
        <a>
        <ListItem button>   
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          <ListItemText primary="Saved Posts" />   
        </ListItem>
        </a>
      </Link>
      <Link href='/manufacturer/edit-profile'>
        <a>
        <ListItem button>   
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />   
        </ListItem>
        </a>
      </Link>
      <Link href='/manufacturer/change-password'>
        <a>
        <ListItem button>   
          <ListItemIcon>
            <Security />
          </ListItemIcon>
          <ListItemText primary="change-password" />   
        </ListItem>
        </a>
      </Link>

  </div>
);
