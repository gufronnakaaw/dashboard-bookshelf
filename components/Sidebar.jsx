import { PowerIcon, PresentationChartBarIcon } from '@heroicons/react/24/solid';
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  return (
    <Card className="h-auto w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[#eaeaea]">
      <div className="mb-2 p-4 text-center">
        <Typography variant="h5" color="blue-gray">
          Bookshelf
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => router.push('/')}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem
          onClick={() => {
            if (confirm('are you sure?')) signOut();
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
