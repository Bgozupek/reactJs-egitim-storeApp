import { Box, Button, Grid2, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import Info from "./Info"
import AdressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];

function getStepContent(step) {
    switch(step) {
        case 0:
            return <AdressForm/>
        case 1:
            return <PaymentForm/>
        case 2:
            return <Review/>
    }
}
 
export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0)
    const methods = useForm()
    function handlePrevious(){
        setActiveStep(activeStep - 1)
    }

    function handleNext(){
        if(activeStep === 2) {
            //siparişi tamamla gelecek buraya
        }
        else{
            setActiveStep(activeStep + 1)
        }
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={3}>
                    <Grid2 size={4} p={3} borderRight="1px solid" borderColor="divider">
                        <Info/>
                    </Grid2>
                    <Grid2 size={8} p={3}>
                        <Stepper activeStep={activeStep} sx={{height:40, mb:4}}>
                            {steps.map((label) => (
                                <Step key={label} sx={{color:"secondary"}}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {activeStep === steps.length ? (
                            <Typography>Siparişiniz Alındı</Typography>
                        ):(
                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}
                                <Box sx={[
                                        {display:"flex"},
                                        activeStep !== 0 ? (
                                            {justifyContent:"space-between"}
                                        ):(
                                            {justifyContent:"flex-end"}
                                        )
                                    ]}>
                                        {activeStep !== 0 && (
                                            <Button startIcon={<ChevronLeftRounded/>} variant="contained" color="secondary" onClick={handlePrevious}>
                                                Geri
                                            </Button>
                                        )}
                                        {activeStep === 2 ? (
                                            <Button variant="contained" color="secondary" type="submit">
                                                Siparişi Tamamla
                                            </Button>
                                        ) : (
                                            <Button startIcon={<ChevronRightRounded/>} variant="contained" color="secondary" type="submit">
                                                İleri
                                            </Button>
                                        )}
                                </Box>
                            </form>
                        )}
                    </Grid2>
                </Grid2>
            </Paper>
        </FormProvider>
    )
}