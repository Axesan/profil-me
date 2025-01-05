import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stepper,
    Step,
    StepLabel,
    IconButton,
    InputAdornment,
    Stack,
    Divider,
    FormHelperText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TikTokIcon from "@mui/icons-material/VideoLibrary";
import SteamIcon from "@mui/icons-material/SportsEsports";
import SpotifyIcon from "@mui/icons-material/QueueMusic";
import { useNavigate } from "react-router-dom";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CustomizedSteppers from "../components/SignUp/ProgressBarSign";
const steps = [
    "Choisissez votre lien",
    "Renseignez votre email",
    "Informations personnelles",
    "Ajoutez vos réseaux sociaux",
    "Ajoutez vos liens",
    "Choisissez un thème",
];

function SignUp() {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [link, setLink] = useState("");
    const [linkValid, setLinkValid] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [personalData, setPersonalData] = useState({ firstName: "", lastName: "" });
    const [socialLinks, setSocialLinks] = useState({
        instagram: "",
        facebook: "",
        tiktok: "",
        steam: "",
        spotify: "",
    });
    const [additionalLinks, setAdditionalLinks] = useState(["", "", ""]);
    const [theme, setTheme] = useState("");

    const validateLink = (value) => {
        const reservedLinks = ["Titi", "Test"];
        setLinkValid(!reservedLinks.includes(value));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleNextStep = () => {
        setStep(step + 1);
        setProgress(((step + 1) / steps.length) * 100);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
        setProgress((step / steps.length) * 100);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(`paa.ge/${link}`);
        alert("Lien copié dans le presse-papier !");
    };

    const handleFinish = () => {
        navigate("/editor", { state: { link: `paa.ge/${link}` } });
    };

    return (
        <Box sx={{ padding: "16px", height: "100vh", display: "flex", flexDirection: "column" }}>
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
                            Choisissez votre lien unique
                        </Typography>
                        <TextField
                            fullWidth
                            label="Lien"
                            placeholder="Ex: MonLien"
                            value={link}
                            onChange={(e) => {
                                setLink(e.target.value);
                                setLinkValid(null);
                            }}
                            onBlur={() => validateLink(link)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">paa.ge/</InputAdornment>,
                                endAdornment: linkValid !== null && (
                                    <InputAdornment position="end">
                                        {linkValid ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {linkValid === false && (
                            <FormHelperText error>Ce lien est déjà pris. Veuillez en choisir un autre.</FormHelperText>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                            disabled={!linkValid}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 2 : Email */}
                {step === 1 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            Félicitations, paa.ge/{link} est à vous !
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {validateEmail(email) && (
                            <TextField
                                fullWidth
                                label="Mot de passe"
                                type="password"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ marginTop: "16px" }}
                            />
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                            disabled={!validateEmail(email) || !password}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 3 : Informations personnelles */}
                {step === 2 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            Parlez-nous de vous
                        </Typography>
                        <TextField
                            fullWidth
                            label="Prénom"
                            value={personalData.firstName}
                            onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Nom"
                            value={personalData.lastName}
                            onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                            sx={{ marginTop: "16px" }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                            disabled={!personalData.firstName || !personalData.lastName}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 4 : Réseaux sociaux */}
                {step === 3 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
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
                                value={socialLinks[key]}
                                onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
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
                {step === 4 && (
                    <Box>
                        <Typography variant="h6" sx={{ marginBottom: "16px", textAlign: "center" }}>
                            Ajoutez vos liens
                        </Typography>
                        {additionalLinks.map((link, index) => (
                            <TextField
                                key={index}
                                fullWidth
                                label={`Lien ${index + 1}`}
                                placeholder="Ex: https://monlien.com"
                                value={link}
                                onChange={(e) => {
                                    const updatedLinks = [...additionalLinks];
                                    updatedLinks[index] = e.target.value;
                                    setAdditionalLinks(updatedLinks);
                                }}
                                sx={{ marginBottom: "16px" }}
                            />
                        ))}
                        <Stack direction="row" spacing={2}>
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
                            Choisissez votre thème
                        </Typography>
                        <TextField
                            fullWidth
                            label="Thème"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            placeholder="Exemple : Moderne, Classique"
                        />
                        <Button fullWidth variant="contained" color="primary" onClick={handleFinish} sx={{ marginTop: "16px" }}>
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
