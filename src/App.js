import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, pink } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';

const useStyles = makeStyles((theme) => ({
  customClasses: {
    width: "100%",
    height: "100%",
    fontSize: "300px",
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: pink[100]
  },
  imgPreview: {
    margin: "30px",
    height: "400px",
    width: "400px"
  },
  dropButtonDiv: {
    marginTop: "-135px",
    marginLeft: "35px"
  }
}));

export default function App() {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const _handleSubmit = e => {
      e.preventDefault();
      console.log('handle uploading-', file, "\n", imagePreviewUrl);
      setAnchorEl(null);
  }

  const _handleImageChange = e => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
          setFile(file);
          setImagePreviewUrl(reader.result);
      }
      reader.readAsDataURL(file);
      setAnchorEl(null);
  }

  const _removePhoto = e => {
    setFile("");
    setImagePreviewUrl("");
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<Avatar alt="user photo" src={imagePreviewUrl} className={classes.customClasses} />);
  } else {
    $imagePreview = (<Avatar className={classes.customClasses}>B</Avatar>);
  }

  return (
    <div>
      <div className={classes.imgPreview}>
        {$imagePreview}
      </div>
      <div className={classes.dropButtonDiv}>
        <Button size="small" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <CreateTwoToneIcon /> Edit 
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <form onSubmit={_handleSubmit}>
              <input type="file" name="uploader" id="uploader" style={{display: "none"}} onChange={_handleImageChange} />
              <label htmlFor="uploader">Upload a photo</label>                
            </form>
          </MenuItem>
          <MenuItem>
            <p style={{margin: "0px"}} onClick={_removePhoto}>Remove a photo</p>
          </MenuItem>
          <MenuItem>
            <p style={{margin: "0px"}} type="submit" onClick={_handleSubmit}>Console Status</p>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
