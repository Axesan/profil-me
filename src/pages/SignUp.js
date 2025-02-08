import React, { useEffect, useState, useTransition } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import CustomizedSteppers from "../components/SignUp/ProgressBarSign";

import { registerUser, checkEmail, checkLink, getThemes } from "../api/api";

import {
  Step1Link,
  Step2EmailPassword,
  Step3PersonalInfo,
  Step4SocialLinks,
  Step5AdditionalLinks,
  Step6Theme,
} from "../components/SignUp/";
import { useNavigate } from "react-router-dom";
const steps = [
  "Lien",
  "Infos de connexion",
  "Vos informations",
  "Réseaux sociaux",
  "Vos liens",
  "Thème",
];
function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState({ api: { message: "", bool: null } });
  const [isPending, startTransition] = useTransition();

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
    additionalLinks: [],
    theme: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);

    setError({ api: { message: "", bool: null } });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);

    setError({ api: { message: "", bool: null } });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Empêche le comportement par défaut si l'événement existe

    // Vérifiez si toutes les étapes sont complétées avant de soumettre
    if (step === steps.length - 1) {
      // Si c'est la dernière étape
      startTransition(async () => {
        try {
          const validData = await registerUser(formData);
          console.log("fdede", validData);

          if (validData) {
            console.log("ok valider et enregistrer");
            setError({ api: { message: error?.api?.message, bool: true } });
            navigate("/login");
          } else {
            setError({ api: { message: error?.api?.message, bool: false } });
          }
        } catch (error) {
          setError({ api: { message: error.message, bool: false } });
        }
      });
    }
  };
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesData = await getThemes();
        console.log("themesData", themesData);

        setThemes(themesData.themes); // Notez le .themes ici
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        handleSubmit(e); // Exécute ta fonction de soumission
      }}
      sx={{
        padding: "16px",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Barre de progression */}
      <CustomizedSteppers stepData={steps} activeStep={step} />
      {isPending && <CircularProgress sx={{ mb: 2 }} />}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {step === 0 && (
          <Step1Link
            formData={formData}
            setFormData={setFormData}
            error={error}
            handleNextStep={handleNextStep}
            handleCheckLink={checkLink}
            setError={setError}
          />
        )}

        {step === 1 && (
          <Step2EmailPassword
            formData={formData}
            setFormData={setFormData}
            error={error}
            handleNextStep={handleNextStep}
            handleCheckEmailAndPassword={checkEmail}
            setError={setError}
          />
        )}
        {step === 2 && (
          <Step3PersonalInfo
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
          />
        )}

        {step === 3 && (
          <Step4SocialLinks
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 4 && (
          <Step5AdditionalLinks
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 5 && (
          <Step6Theme
            formData={formData}
            setFormData={setFormData}
            themes={themes}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        )}

        {step > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePreviousStep}
            sx={{ mt: 2 }}
          >
            Précédent
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SignUp;
