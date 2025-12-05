import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
    const { register, formState: {errors} } = useFormContext()

    function isAlphabetic(value) {
        return value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, "");
    }

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length > 3) value = value.slice(0, 3);
        e.target.value = value;
    }

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); 
        if (value.length > 16) value = value.slice(0, 16); 
        const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = formattedValue;
    };

    const handleExpDateChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); 
        if (value.length > 6) value = value.slice(0, 6); 
        if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    };

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("cardname", {
                    required: "Kart üzerindeki ad alanı zorunludur.",
                    minLength: {
                        value: 3,
                        message: "Kart üzerindeki adınız en az 3 karakter olmalıdır."
                    },
                    })}
                    label="Kart üzerindeki adı girin"
                    placeholder="Örnek: Ali Yılmaz" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.cardname}
                    helperText= {errors.cardname?.message}
                    onInput={(e) => {
                        e.target.value = isAlphabetic(e.target.value);
                    }}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("cardnumber", {
                    required: "Kart numarası alanı zorunludur.",
                    minLength: {
                        value: 16,
                        message: "Kart numarası en az 16 karakter olmalıdır."
                    },
                    })}
                    label="Kart numarasını girin"
                    placeholder="Örnek: XXXX XXXX XXXX XXXX"
                    size="small" 
                    fullWidth   
                    sx={{mb:2}}
                    error={!!errors.cardnumber}
                    helperText= {errors.cardnumber?.message}
                    onChange={handleCardNumberChange}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("expirydate", {
                    required: "Kart son kullanma alanı zorunludur."
                    })}
                    label="Kartınızın son kullanma tarihini girin" 
                    size="small"
                    placeholder="08/2028" 
                    fullWidth   
                    sx={{mb:2}}
                    error={!!errors.expirydate}
                    helperText= {errors.expirydate?.message}
                    onChange={handleExpDateChange}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("cvv", {
                    required: "Cvv bilgisi alanı zorunludur.",
                    minLength:{
                        value:3,
                        message:"Cvv bilgisi en az 3 karakter olmalıdır."
                    },
                    maxLength:{
                        value:3,
                    }
                    })}
                    label="Cvv bilgisi girin"
                    placeholder="Örnek: XXX"
                    size="small" 
                    fullWidth   
                    sx={{mb:2}}
                    error={!!errors.cvv}
                    helperText= {errors.cvv?.message}
                    onChange={handleCvvChange}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}></Grid2>
        </Grid2>
    )
}