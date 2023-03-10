import React, { useEffect } from "react";
import {Grid, Paper, Button, Typography,} from'@material-ui/core'
import {Box} from '@mui/material'
import './Home.css'
import {indigo} from '@mui/material/colors';
import MenuIcon from '@material-ui/icons/Menu';
import TabPostagem from "../../components/postangens/tabpostagem/TabPostagem";
import ModalPostagem from "../../components/postangens/modalPostagem/ModalPostagem";
import { useNavigate } from "react-router";
import useLocalStorage from "react-use-localstorage";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Home(){

    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    useEffect(() => {
      if (token == "") {
        toast.error('Você precisa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
          navigate("/login")
  
      }
  }, [token])
    return(
<>
<Grid container direction="row" justifyContent="center" alignItems="center"className='caixa'>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="/posts" className="text-decorator-none">
                        <Button variant="outlined"className="botao">Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://as2.ftcdn.net/v2/jpg/02/75/97/59/1000_F_275975969_UiTkcNHFkEdEF2irWCQdSlEKqrPfVBwp.jpg" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} className='postagens'>
                    <TabPostagem/>
                </Grid>
            </Grid>
</>
    );
}
export default Home;