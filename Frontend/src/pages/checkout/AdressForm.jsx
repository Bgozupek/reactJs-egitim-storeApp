import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AdressForm() {
    const { register, formState: {errors} } = useFormContext()

    function isAlphabetic(value) {
        return value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, "");
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("firstname", {
                    required: "Ad alanı zorunludur.",
                    minLength: {
                        value: 3,
                        message: "Adınız en az 3 karakter olmalıdır."
                    },
                    })}
                    label="Adınızı girin"
                    placeholder="Örnek: Ali"
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.firstname}
                    helperText= {errors.firstname?.message}
                    onInput={(e) => {
                        e.target.value = isAlphabetic(e.target.value);
                    }}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("lastname", {
                    required: "Soyad alanı zorunludur.",
                    minLength: {
                        value: 3,
                        message: "Soyadınız en az 3 karakter olmalıdır."
                    },
                    })}
                    label="Soyadınız girin" 
                    placeholder="Örnek: Yılmaz"
                    size="small" 
                    fullWidth   
                    sx={{mb:2}}
                    error={!!errors.lastname}
                    helperText= {errors.lastname?.message}
                    onInput={(e) => {
                        e.target.value = isAlphabetic(e.target.value);
                    }}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField
                    {...register("phone", {
                        required: "Telefon numarası zorunludur.",
                        validate: {
                        onlyDigits: (value) =>
                            value.replace(/\D/g, "").length === 10 || "Telefon numarası 10 haneli olmalıdır."
                        }
                    })}
                    label="Telefon numaranızı girin"
                    placeholder="Örnek: 555 555 55 55"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    onInput={(e) => {
                        let val = e.target.value.replace(/\D/g, ""); 
                        if (val.length > 10) val = val.substring(0, 10);
                        if (val.length >= 7) {
                        val = val.replace(/(\d{3})(\d{3})(\d{2})(\d{2})?/, "$1 $2 $3 $4").trim();
                        } else if (val.length >= 6) {
                        val = val.replace(/(\d{3})(\d{3})(\d{0,2})/, "$1 $2 $3").trim();
                        } else if (val.length >= 3) {
                        val = val.replace(/(\d{3})(\d{0,3})/, "$1 $2").trim();
                        }

                        e.target.value = val;
                    }}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("city", {
                    required: "Şehir bilgisi alanı zorunludur."
                    })}
                    label="Şehir bilgisi girin"
                    placeholder="Örnek: İstanbul"
                    size="small" 
                    fullWidth   
                    sx={{mb:2}}
                    error={!!errors.city}
                    helperText= {errors.city?.message}
                    onInput={(e) => {
                        e.target.value = isAlphabetic(e.target.value);
                    }}
                />
            </Grid2>
            <Grid2 size={{xs:12}}>
               <TextField 
                    {...register("address", {
                    required: "Adress alanı zorunludur."
                    })}
                    label="Adresinizi girin"
                    placeholder="Örnek: Yavuz mah. Taşdelen sok." 
                    size="small" 
                    fullWidth  
                    multiline
                    rows={4}
                    sx={{mb:2}}
                    error={!!errors.address}
                    helperText= {errors.address?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}></Grid2>
        </Grid2>
    )
}