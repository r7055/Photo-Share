import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material"
import { Delete as DeleteIcon, DeleteForever } from "@mui/icons-material"
import RecycleBinAlbums from "./RecycleBinAlbums"
import RecycleBinPhotos from "./RecycleBinPhotos"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recycle-bin-tabpanel-${index}`}
      aria-labelledby={`recycle-bin-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `recycle-bin-tab-${index}`,
    "aria-controls": `recycle-bin-tabpanel-${index}`,
  }
}

const RecycleBin: React.FC = () => {
  const [value, setValue] = useState(0)
  const [openEmptyDialog, setOpenEmptyDialog] = useState(false)
  const [emptyLoading, setEmptyLoading] = useState(false)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleEmptyRecycleBin = () => {
    setOpenEmptyDialog(true)
  }

  const handleConfirmEmpty = async () => {
    setEmptyLoading(true)
    // Here you would add the actual logic to empty the recycle bin
    // For example:
    // await dispatch(emptyRecycleBin({ token }));
    setTimeout(() => {
      setEmptyLoading(false)
      setOpenEmptyDialog(false)
    }, 1500)
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DeleteIcon sx={{ fontSize: 32, color: "#f44336", mr: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
            Recycle Bin
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<DeleteForever />}
          onClick={handleEmptyRecycleBin}
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Empty Recycle Bin
        </Button>
      </Box>

      <Paper
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="recycle bin tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#f44336",
              },
              "& .MuiTab-root": {
                fontSize: "1rem",
                fontWeight: "medium",
                textTransform: "none",
                minHeight: 64,
                "&.Mui-selected": {
                  color: "#f44336",
                },
              },
            }}
          >
            <Tab
              icon={<DeleteIcon />}
              iconPosition="start"
              label="Deleted Albums"
              {...a11yProps(0)}
              sx={{ py: 3, px: 4 }}
            />
            <Tab
              icon={<DeleteIcon />}
              iconPosition="start"
              label="Deleted Photos"
              {...a11yProps(1)}
              sx={{ py: 3, px: 4 }}
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Items in the recycle bin will be automatically deleted after 30 days. You can restore items or delete them
            permanently.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <TabPanel value={value} index={0}>
            <RecycleBinAlbums />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RecycleBinPhotos />
          </TabPanel>
        </Box>
      </Paper>

      {/* Empty Recycle Bin Confirmation Dialog */}
      <Dialog
        open={openEmptyDialog}
        onClose={() => setOpenEmptyDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #1a1f36, #252a4b)",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DeleteForever sx={{ mr: 1.5, color: "#f44336" }} />
          Empty Recycle Bin
        </DialogTitle>

        <DialogContent sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", pt: 3 }}>
          <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
            Are you sure you want to permanently delete all items in the recycle bin?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            This action cannot be undone. All albums and photos will be permanently removed.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ background: "linear-gradient(90deg, #1a1f36, #252a4b)", p: 2 }}>
          <Button
            onClick={() => setOpenEmptyDialog(false)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEmpty}
            variant="contained"
            disabled={emptyLoading}
            startIcon={emptyLoading ? <CircularProgress size={20} /> : <DeleteForever />}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(244, 67, 54, 0.5)",
              },
            }}
          >
            {emptyLoading ? "Deleting..." : "Empty Recycle Bin"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RecycleBin
