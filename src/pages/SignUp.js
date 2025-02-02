import React, { useState, useTransition } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    Stack,
   
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TikTokIcon from "@mui/icons-material/VideoLibrary";
import SteamIcon from "@mui/icons-material/SportsEsports";
import SpotifyIcon from "@mui/icons-material/QueueMusic";
import { useNavigate } from "react-router-dom";
import CustomizedSteppers from "../components/SignUp/ProgressBarSign";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

//API 
import { registerUser,checkEmail,checkLink } from "../api/api";

const steps = [
    "Lien",
    "Infos de connexion",
    "Vos informations",
    "Réseaux sociaux",
    "Vos liens",
    "Thème",
];
/**
 * A review for form logik
 * const [form, setForm] = useState({
        link: "",
        email: "",
        password: "",
        personnalData: { firstName: "", lastName: "" },
        socialLinks: {
            instagram: "",
            facebook: "",
            tiktok: "",
            steam: "",
            spotify: "",
        },
        additionalLinks: [""],
        theme: "",
        errors: {
            link: "",
            email: "",
            password: "",
            personalData: { firstName: "", lastName: "" },
            theme: "",
        },

    }) */
function SignUp() {
    

    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState({ message: "",bool: true, });
    const [isPending, startTransition] = useTransition();


    const handleNextStep = () => {      
        setStep(step + 1);
        setProgress(((step + 1) / steps.length) * 100);
    };
// verifier si l'email existe déjà || si l'email est valide 

    const handleCheckEmail = async (email) => {    
        
        await checkEmail(email).then((valid) => {
            if (valid) {
                handleNextStep();
                console.log("response",valid);               
            }
        }).catch((err) => {
            setError({message:err.response.data.errorMessage,bool:err.response.data.errorBool});
        });      
    }
    const handleCheckLink = async (link) => {    
        
        await checkLink(link).then((valid) => {
            if (valid) {
                handleNextStep();
                console.log("valid",valid);               
            }
        }).catch((err) => {
            setError({message:err.response.data.errorMessage,bool:err.response.data.errorBool});
        });      
    }

    const handlePreviousStep = () => {
        setStep(step - 1);
        setProgress((step / steps.length) * 100);
    };

    const handleAdditionalLinkChange = (index, value) => {
        const updatedLinks = [...formData.additionalLinks];
        updatedLinks[index] = value; // mettre à jour le lien à l'index donné
        setFormData({ ...formData, additionalLinks: updatedLinks });
    };
    
    const handleAddAdditionalLink = () => {
        setFormData({
            ...formData,
            additionalLinks: [...formData.additionalLinks, ""], // ajouter un nouveau champ vide
        });
    };
    
    const handleRemoveAdditionalLink = (index) => {
        const updatedLinks = formData.additionalLinks.filter((_, i) => i !== index);
        setFormData({ ...formData, additionalLinks: updatedLinks });
    };

    const [formData, setFormData] = useState({
        link: "",
        email: "",
        password: "",
        personnalData: { firstName: "", lastName: "" },
        socialLinks: {
            instagram: "",
            facebook: "",
            tiktok: "",
            steam: "",
            spotify: "",
        },
        additionalLinks: [""],
        theme: "",
        

    })

    const handleSubmit = () => {
        startTransition(async () => {
          const error = await registerUser(formData);
          if (error) {
            setError(error);
            console.log(error);
            
            return;
          } 
         console.log("SUBMIT OK :::",formData);
         
        })
      };


    return (
        <Box component="form" action={handleSubmit} sx={{ padding: "16px", height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Barre de progression */}
            <CustomizedSteppers stepData={steps} activeStep={step} />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Étape 1 : Lien */}
                {step === 0 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Choisissez votre lien unique !
                        </Typography>


                        <TextField
                            fullWidth
                            required
                            label="Lien"
                            placeholder="Ex: toto"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                       
                           
                        />
                        {/* {linkValid === false && (
                            <FormHelperText error>{error}</FormHelperText>
                        )} */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                        
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 2 : Email */}
                {step === 1 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>

                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Félicitations, paa.ge/{formData.link} est à vous !
                        </Typography>
                  
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            } // Mettre à jour le state avec la nouvelle valeur
                            error={error.bool === false ? true : false}
                            
                            helperText={error.bool === false ? `${error.message}` : ""}
                            errorMessage={error.message}
                            InputProps={{
                               endAdornment: error.bool === false ? (<HighlightOffIcon color="error" style={{padding:"right"}}/>) : (<></>),
                            }}
                            
                        />
                        
                            <TextField
                                required
                                fullWidth
                                label="Mot de passe"
                                type="password"
                                placeholder="******"
                                value={formData.password}
                                onChange={(e) => {setFormData({ ...formData, password: e.target.value })}}
                                // error={passwordError}
                                // helperText={passwordError ? "Le mot de passe doit comporter au moins 8 caractères." : ""}
                                sx={{ marginTop: "16px" }}
                            />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => { handleCheckEmail({email:formData.email}) }}
                            // onSubmit={checkEmail(formData.email)}
                            sx={{ marginTop: "16px" }}
                           
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 3 : Informations personnelles */}
                {step === 2 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Parlez-nous de vous
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="Prénom"
                            value={formData.personnalData.firstName}
                            onChange={(e) => setFormData({ ...formData, personnalData: { ...formData.personnalData, firstName: e.target.value } })}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Nom"
                            value={formData.personnalData.lastName}
                            onChange={(e) => setFormData({ ...formData, personnalData: { ...formData.personnalData, lastName: e.target.value } })}
                            sx={{ marginTop: "16px" }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                           // disabled={!personalData.firstName || !personalData.lastName}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

          {/* Étape 4 : Réseaux sociaux */}
          {step === 3 && (
                <Box>
                    <Typography variant="h6" textAlign="center" marginBottom="16px">
                        {steps[step]}
                    </Typography>
                    <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                        Ajoutez vos réseaux sociaux
                    </Typography>
                    {[
                        { label: "Instagram", icon: <InstagramIcon />, key: "instagram" },
                        { label: "Facebook", icon: <FacebookIcon />, key: "facebook" },
                        { label: "TikTok", icon: <TikTokIcon />, key: "tiktok" },
                        { label: "Steam", icon: <SteamIcon />, key: "steam" },
                        { label: "Spotify", icon: <SpotifyIcon />, key: "spotify" },
                    ].map(({ label, icon, key }) => (
                        <TextField
                            key={key}
                            fullWidth
                            label={label}
                            value={formData.socialLinks[key]}
                            onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [key]: e.target.value } })}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                            }}
                            sx={{ marginBottom: "16px" }}
                        />
                    ))}
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleNextStep}>
                            Suivant
                        </Button>
                        <Button variant="text" onClick={handleNextStep}>
                            Ignorer
                        </Button>
                    </Stack>
                </Box>
            )}

            {/* Étape 5 : Liens additionnels */}
            {step === 4 && (
                <Box>
                    <Typography variant="h6" textAlign="center" marginBottom="16px">
                        {steps[step]}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ marginBottom: "16px", textAlign: "center" }}>
                        Ajoutez vos liens additionnels
                    </Typography>
                    {formData.additionalLinks.map((link, index) => (
                        <Box key={index} sx={{ marginBottom: "16px" }}>
                            <TextField
                                fullWidth
                                label={`Lien ${index + 1}`}
                                value={link}
                                onChange={(e) => handleAdditionalLinkChange(index, e.target.value)}
                                placeholder="Ex: https://monlien.com"
                            />
                            <Button variant="outlined" color="error" onClick={() => handleRemoveAdditionalLink(index)}>
                                Supprimer
                            </Button>
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={handleAddAdditionalLink}>
                        Ajouter un lien
                    </Button>
                    <Stack direction="row" spacing={2} sx={{ marginTop: "16px" }}>
                        <Button variant="contained" color="primary" onClick={handleNextStep}>
                            Suivant
                        </Button>
                        <Button variant="text" onClick={handleNextStep}>
                            Ignorer
                        </Button>
                    </Stack>
                </Box>
            )}

            {/* Étape 6 : Choix du thème */}
            {step === 5 && (
                <Box>
                    <Typography variant="h6" textAlign="center" marginBottom="16px">
                        {steps[step]}
                    </Typography>
                    <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                        Choisissez votre thème unique !
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={formData.theme}
                            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Sélectionnez un thème
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <img width={50} height={50} alt="Thème" />
                                    <Typography>s</Typography>
                                </Stack>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type={step === steps.length - 1 ? "submit" : "button"}
                        sx={{ marginTop: "16px" }}
                    >
                        Terminer
                    </Button>
                </Box>
            )}

            {/* Bouton précédent */}
            {step > 0 && (
                <Button fullWidth variant="text" onClick={handlePreviousStep} sx={{ marginTop: "16px" }}>
                    Retour
                </Button>
            )}
        </Box>
    </Box>
    );
}

export default SignUp;
