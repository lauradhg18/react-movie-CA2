import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import React from "react";

const ProfilePage = () => {

    const {signout} = React.useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogOut = (pageURL) => {
        navigate(pageURL, { replace: true });
        signout();
        
    };
    

    return (
     <>
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Profile
      </Typography>

      <Button
        key={'Log out'}
        color="inherit"
        onClick={() => handleLogOut('/')}
      >
        {'Log out'}
      </Button>
    
    </>);
}

export default ProfilePage;