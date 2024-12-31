import React, { useState } from 'react';
import { Avatar, Card, Typography, Box, IconButton, TextField, createTheme, ThemeProvider, CssBaseline, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const ProfileCard = ({ photo, title, name, bio, socialLinks, getSocialIcon }) => {
    const [textColorChoice, setTextColorChoice] = useState('#0a1f0d'); // Couleur par défaut
    const [backgroundColorChoice, setBackgroundColorChoice] = useState('#465e49'); // Couleur par défaut
    const [shadowChoice, setShadowChoice] = useState('#1e822b'); // Couleur par défaut
    const [borderChoice, setBorderChoice] = useState('#FFF'); // Couleur par défaut

    // Créer un thème dynamique
    const theme = createTheme({
        palette: {
            custom: {
                text: textColorChoice,
                background: backgroundColorChoice,
                shadow: shadowChoice,
                border: borderChoice
            },
        },
    });

    const handleTextColorChoice = (event) => {
        setTextColorChoice(event.target.value);
    };
    const handleBackgroundChoice = (event) => {
        setBackgroundColorChoice(event.target.value);
    };
    const handleShadowChoice = (event) => {
        setShadowChoice(event.target.value);
    };
    const handleBorderChoice = (event) => {
        setBorderChoice(event.target.value);
    };



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h6">Choisissez la couleur principale :</Typography>
                <TextField
                    type="color"
                    value={textColorChoice}
                    onChange={handleTextColorChoice}
                    sx={{ width: '100px', marginTop: '10px' }}
                />
                <Typography variant="h6">Choisissez la couleur du fond :</Typography>
                <TextField
                    type="color"
                    value={backgroundColorChoice}
                    onChange={handleBackgroundChoice}
                    sx={{ width: '100px', marginTop: '10px' }}
                />
                <Typography variant="h6">Choisissez la couleur de l'ombre :</Typography>
                <TextField
                    type="color"
                    value={shadowChoice}
                    onChange={handleShadowChoice}

                    sx={{ width: '50px', marginTop: '10px' }}
                />

                <Typography variant="h6">Choisissez la couleur de la bordure :</Typography>
                <TextField
                    type="color"
                    value={borderChoice}
                    onChange={handleBorderChoice}

                    sx={{ width: '100px', marginTop: '10px' }}
                />

            </Box>
            <Card
                sx={{
                    boxShadow: `0px 4px 10px ${theme.palette.custom.shadow}`,
                    backgroundColor: theme.palette.custom.background,
                    padding: '20px',
                    border: `5px solid  ${theme.palette.custom.border}`,
                    width: '350px',
                    height: '500px',
                    borderRadius: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{ width: 150, height: 150, marginBottom: '10px' }}
                    alt="User Avatar"
                    src={photo}
                />

                {title ? (
                    <Typography
                        variant="h5"
                        sx={{
                            display: 'flex',
                            alignItems: "center",
                            marginTop: '10px',
                            color: theme.palette.custom.text,
                            flexShrink: 0, // Empêche le texte de s'étirer
                        }}
                    >
                        {title}
                        <SpeedDial
                            ariaLabel="Modifier le texte"
                            sx={{ position: 'relative' }}
                            icon={<SpeedDialIcon />}
                            size="small"
                        >
                            <SpeedDialAction
                                icon={<ModeEditOutlineIcon />}
                                tooltipTitle="Changer la photo"
                                onClick={() => document.getElementById('upload-photo').click()}
                            />
                        </SpeedDial>
                    </Typography>
                ) : null}

                {name ? (
                    <Typography
                        sx={{
                            color: theme.palette.custom.text,
                            flexShrink: 0, // Empêche le texte de s'étirer
                        }}
                        variant="h6"
                    >
                        {name}
                        <IconButton >
                            <ModeEditOutlineIcon />
                        </IconButton>
                    </Typography>
                ) : null}

                {bio ? (
                    <Typography
                        color="primary"
                        sx={{
                            marginTop: '10px',
                            whiteSpace: 'normal', // Permet au texte de se casser normalement
                            color: theme.palette.custom.text,
                            flexGrow: 0, // N'agrandit pas le texte pour occuper tout l'espace restant
                            display: 'flex',
                            flexDirection: 'column', // Utilise une colonne pour que chaque ligne de texte soit bien empilée
                            justifyContent: 'flex-start', // Aligne le texte en haut
                            alignItems: 'center', // Centre le texte horizontalement
                            maxHeight: 'calc(100% - 40px)', // Limite la hauteur pour éviter l'extension de la carte
                            overflow: 'hidden', // Empêche le débordement du texte
                        }}
                    >
                        {bio}
                        <IconButton >
                            <ModeEditOutlineIcon />
                        </IconButton>
                    </Typography>
                ) : null}


                <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {socialLinks.map((link, index) => (
                        <IconButton
                            key={index}
                            onClick={() => window.open(link.url, '_blank')}
                            disabled={!link.url}
                        >
                            {getSocialIcon(link.type)}
                        </IconButton>
                    ))}
                </Box>
            </Card>
        </ThemeProvider>
    );
};

export default ProfileCard;
