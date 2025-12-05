import { useFormContext } from "react-hook-form"
import { Box, Divider, Stack, Typography } from "@mui/material"

export default function Review() {
    const { getValues } = useFormContext()
    return (
        <Stack spacing={3} mb={3}>
            <Box>
                <Typography variant="subtitle2" gutterBottom>
                    Teslimat Bilgileri
                </Typography>
                <Typography gutterBottom>
                    {getValues("firstname")} {getValues("lastname")}
                </Typography>
                <Typography  gutterBottom>
                    {getValues("phone")} 
                </Typography>
                <Typography  gutterBottom>
                    {getValues("address")} {getValues("city")}  
                </Typography>
            </Box>
            <Divider/>
            <Box>
                <Typography variant="subtitle2" gutterBottom>
                    Ödeme Bilgileri
                </Typography>
                <Typography gutterBottom>
                    {getValues("cardname")}
                </Typography>
                <Typography  gutterBottom>
                    {getValues("cardnumber")} 
                </Typography>
                <Typography  gutterBottom>
                    {getValues("expirydate")}
                </Typography>
            </Box>
        </Stack>
    )
}