import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToken } from "../../../store/tokens/Actions";
import { TokenState } from "../../../store/tokens/tokensReducer";
import './Navbar.css';


function Navbar(){

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function goLogout(){
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        }); 
        navigate('/login')
    }
    var navbarComponent;

    
    if(token != ""){
        navbarComponent = <AppBar position="static" className="cor menu" >
        <Toolbar variant="dense" >
            <Box className="cursor" >
                
            </Box>

            <Box display="flex" justifyContent="start">
                <Link to='/home' className="text-decorator-none">
                <Box mx={1} className="cursor">
                <img className="foto" src="https://i.pinimg.com/originals/61/3c/3f/613c3f5dc73cbca7e360c91dbd0aaee4.gif" alt="" />
                </Box>
                </Link>
                <Link to='/posts' className="text-decorator-none">
                <Box mx={1} className="cursor">
                    <Typography variant="h6" color="textPrimary">
                        postagens
                    </Typography>
                </Box>
                </Link>
                <Link to='/temas' className="text-decorator-none">
                <Box mx={1} className="cursor">
                    <Typography variant="h6" color="textPrimary">
                        temas
                    </Typography>
                </Box>
                </Link>
                <Link  to='/formularioTema' className="text-decorator-none">
                <Box mx={1} className="cursor">
                    <Typography variant="h6" color="textPrimary">
                        novo tema
                    </Typography>
                </Box>
                </Link>
                <Box mx={1} className="cursor" onClick={goLogout} >
                    <Typography variant="h6" color="textPrimary">
                        Sair
                    </Typography>
                </Box>
            </Box>

        </Toolbar>
    </AppBar>
    }
    return(

        <>
        {navbarComponent}
        </>

    )
}
export default Navbar;
