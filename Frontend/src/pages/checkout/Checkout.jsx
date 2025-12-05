import { Box, Button, CircularProgress, Grid2, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import Info from "./Info"
import AdressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import requests from "../../api/apiClient";
import { clearCart } from "../cart/cartSlice";
import { Link as RouterLink } from "react-router-dom";


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
    const [orderId, setOrderId] = useState(0)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const methods = useForm()
    function handlePrevious(){
        setActiveStep(activeStep - 1)
    }

    async function handleNext(data){
        if(activeStep === 2) {
            setLoading(true)
            try {
                const result = await requests.orders.createOrder(data)
                setOrderId(result.orderId)
                setActiveStep( activeStep + 1)
                dispatch(clearCart())
            } catch(error) {
                console.log(error);
            } finally{
                setLoading(false)
            }
        }
        else{
            setActiveStep(activeStep + 1)
        }
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={3}>

                    {activeStep !== steps.length && (
                        <Grid2 size={4} p={3} borderRight="1px solid" borderColor="divider">
                            <Info/>
                        </Grid2>
                    )}

                    <Grid2 size={activeStep !== steps.length ? (8):(12)} p={3}>
                        <Stepper activeStep={activeStep} sx={{height:40, mb:4}}>
                            {steps.map((label) => (
                                <Step key={label} sx={{color:"secondary"}}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {activeStep === steps.length ? (
                            <Stack>
                                <Typography variant="h5">
                                    Siparişiniz Alındı
                                </Typography>
                                <Typography variant="body1"> 
                                    Sipariş numaranız <strong>{orderId}</strong>. Siparişiniz hakkında ki bildirimleri mail adresinize ileteceğiz.
                                </Typography>
                                <Box sx={{display:"flex", mt:4, gap:"5px"}}>
                                    <Button variant="contained">Siparişleri Listele</Button>
                                    <Button variant="contained" color="secondary" Component={RouterLink} to="/">Ana Sayfa</Button>
                                </Box>
                            </Stack>
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

                                        {loading ? (
                                            <CircularProgress/>
                                        ): (

                                            activeStep === 2 ? (
                                                <Button variant="contained" color="secondary" type="submit">
                                                    Siparişi Tamamla
                                                </Button>
                                            ) : (
                                                <Button startIcon={<ChevronRightRounded/>} variant="contained" color="secondary" type="submit">
                                                    İleri
                                                </Button>
                                            )
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