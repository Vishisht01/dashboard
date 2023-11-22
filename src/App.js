
import {
  AppBar,
  Box,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Delete, Edit, MoreVert, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomTableCell, CustomTextField, DangerButton, SuccessButton, WarningButton } from './customised';

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = tableData.slice(startIndex, endIndex);
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
    const updatedData = tableData.filter((row) => row !== selectedRow);
    const updatedDataWithIds = updatedData.map((row, index) => ({ ...row, id: index + 1 }));
    localStorage.setItem('tableData', JSON.stringify(updatedDataWithIds));
    setTableData(updatedDataWithIds);
    setDeleteModalOpen(false);
    toast.success("Deleted Successfully");
  };

  const handleEditSave = () => {
    const updatedData = tableData.map((row) =>
      row === selectedRow
        ? {
          ...row,
          name: editName,
          age: editAge,
          city: editCity,
          pinCode: editPincode,
        }
        : row
    );
    localStorage.setItem('tableData', JSON.stringify(updatedData));
    setTableData(updatedData);
    setEditModalOpen(false);
    toast.success("Successfully Edited the field")
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const localStorageData = localStorage.getItem('tableData');
        if (localStorageData) {
          const parsedData = JSON.parse(localStorageData);
          setTableData(parsedData);
        } else {
          const response = await fetch('https://assets.alippo.com/catalog/static/data.json');
          const result = await response.json();
          const dataWithIds = result.map((item, index) => ({ ...item, id: index + 1 }));
          localStorage.setItem('tableData', JSON.stringify(dataWithIds));
          setTableData(dataWithIds);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img src="/logo.png" width={60} />
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ backgroundColor: "#E30047", color: "white" }}>
          <ListItemButton >
            <ListItemIcon>
              <Person sx={{ color: "white" }} />
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
      <ToastContainer
        autoClose={2000}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ backgroundColor: "#e30047" }}>
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
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 5, boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" }}>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell label="S.no" />
                <CustomTableCell label="Name" />
                <CustomTableCell label="Age" />
                <CustomTableCell label="City" />
                <CustomTableCell label="Pincode" />
                <CustomTableCell label="Action" />
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((row, index) => (
                <TableRow
                  key={index}>
                  <TableCell>{row?.id}</TableCell>
                  <TableCell>{row?.name ? row.name : <i>Name not in records</i>}</TableCell>
                  <TableCell>{row?.age ? row.age : <i>Age not recorded</i>}</TableCell>
                  <TableCell>{row?.city ? row?.city : <i>City not in records</i>}</TableCell>
                  <TableCell>{row?.pinCode ? row.pinCode : <i>Pincode not in records</i>}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-controls="vertical-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, row)}
                    >
                      <MoreVert sx={{ color: "grey" }} />
                    </IconButton>
                    <Menu
                      id={`vertical-menu-${index}`}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedRow === row}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleEditClick(row)} sx={{ display: "flex", gap: "1rem" }}><Edit fontSize='small' sx={{ color: "#e30047" }} />Edit</MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(row)} sx={{ display: "flex", gap: "1rem" }}><Delete fontSize='small' sx={{ color: "#e30047" }} />Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: "flex-end" }}>
          <WarningButton
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            label="Prev"
          />

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
            <CustomTextField
              label="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <CustomTextField
              label="Age"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
            <CustomTextField
              label="City"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
            />
            <CustomTextField
              label="Pincode"
              value={editPincode}
              onChange={(e) => setEditPincode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <WarningButton onClick={handleEditModalClose} label="Cancel" />
            <SuccessButton onClick={handleEditSave} label="Save" />
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
            <WarningButton onClick={handleDeleteModalClose} label="Cancel" />
            <DangerButton onClick={handleDeleteConfirm} label="Delete" />
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
