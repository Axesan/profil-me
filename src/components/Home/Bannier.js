import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PeopleIcon from "@mui/icons-material/People";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: "#fff",
  height: "100%",
  padding: theme.spacing(4),
  textAlign: "start",
  display: "flex",
  alignItems: "center",
  borderRadius: 80,
  justifyContent: "space-between",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export default function Bannier({ isLoggedIn }) {
  return (
    <Box width={"100%"}>
      {isLoggedIn ? (
        <h1>Connected</h1>
      ) : (
        <div>
          <h1>Bienvenue sur profilMe</h1>
          <Box
            //backgroundColor={"red"}
            //border="red 1px solid"
            mr={"auto"}
            ml={"auto"}
            borderRadius={8}
            //width={{ xs: 40, sm: 600 }}
            // p={2}
          >
            <Grid
              container
              rowSpacing={1}
              width={"auto"}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={6}>
                <Item>
                  <PeopleIcon />
                  <Typography variant="body1">
                    Plus de {300} inscrit !
                  </Typography>
                </Item>
              </Grid>
              <Grid size={6}>
                <Item>
                  <RecordVoiceOverIcon />
                  <Typography variant="body1">{250} Profile crées !</Typography>
                </Item>
              </Grid>
              <Grid size={6}>
                <Item>
                  <LensBlurIcon />
                  <Typography variant="body1">
                    {30} théme a prêt à l'emploie
                  </Typography>
                </Item>
              </Grid>
              <Grid size={6}>
                <Item>
                  <SendIcon />
                  <Typography>{} Partager votre profil!</Typography>
                </Item>
              </Grid>
            </Grid>

            <Button
              size="large"
              fullWidth
              startIcon={<RocketLaunchIcon />}
              variant="contained"
              sx={{ mt: 5 }}
            >
              COMMENCER
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
}
