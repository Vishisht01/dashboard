import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { DangerButton, SuccessButton, WarningButton } from './customised';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [editName, setEditName] = React.useState('');
  const [editAge, setEditAge] = React.useState('');
  const [editCity, setEditCity] = React.useState('');
  const [editPincode, setEditPincode] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditName(row.name || '');
    setEditAge(row.age || '');
    setEditCity(row.city || '');
    setEditPincode(row.pinCode || '');
    setEditModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setTableData((prevData) => prevData.filter((row) => row !== selectedRow));
    setDeleteModalOpen(false);
  };
  const handleEditSave = () => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row === selectedRow
          ? {
            ...row,
            name: editName,
            age: editAge,
            city: editCity,
            pinCode: editPincode,
          }
          : row
      )
    );
    setEditModalOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = tableData.slice(startIndex, endIndex);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://assets.alippo.com/catalog/static/data.json');
        const result = await response.json();
        setTableData(result);
        console.log("result--->>>>>>>>>>>>.", result);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">
          Alippo Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Details" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Pincode</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((row, index) => (
                <TableRow
                  key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.name ? row.name : <i>Name not in records</i>}</TableCell>
                  <TableCell>{row?.age ? row.age : <i>Age not recorded</i>}</TableCell>
                  <TableCell>{row?.city ? row?.city : <i>City not in records</i>}</TableCell>
                  <TableCell>{row?.pinCode ? row.pinCode : <i>Pincode not in records</i>}</TableCell>
                  <TableCell>
                    <WarningButton onClick={() => handleEditClick(row)} label="Edit"/>
                    <DangerButton onClick={() => handleDeleteClick(row)} label ="Delete" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: "flex-end" }}>
          <DangerButton
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            label="Prev"
          >
            Previous
          </DangerButton>
          <SuccessButton
            variant="outlined"
            disabled={endIndex >= tableData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            label="Next"
          />
           
        </Box>
        {/* Edit Modal */}
        <Dialog open={editModalOpen} onClose={handleEditModalClose}>
          <DialogTitle>Edit {selectedRow?.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Age"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              fullWidth
            />
            <TextField
              label="City"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              fullWidth
            />
            <TextField
              label="Pincode"
              value={editPincode}
              onChange={(e) => setEditPincode(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditModalClose}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>
        {/* Delete Modal */}
        <Dialog open={deleteModalOpen} onClose={handleDeleteModalClose}>
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the row for {selectedRow?.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteModalClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
