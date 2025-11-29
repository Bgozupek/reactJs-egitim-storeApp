import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AdressForm() {
    const { register, formState: {errors} } = useFormContext()

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("firstname", {
                    required: "firstname alanı zorunludur.",
                    minLength: {
                        value: 3,
                        message: "firstname en az 3 karakter olmalıdır."
                    },
                    })}
                    label="Enter firstname" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.firstname}
                    helperText= {errors.firstname?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("lastname", {
                    required: "lastname alanı zorunludur.",
                    minLength: {
                        value: 3,
                        message: "lastname en az 3 karakter olmalıdır."
                    },
                    })}
                    label="Enter lastname" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.lastname}
                    helperText= {errors.lastname?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("phone", {
                    required: "phone alanı zorunludur."
                    })}
                    label="Enter phone" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.phone}
                    helperText= {errors.phone?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}>
               <TextField 
                    {...register("city", {
                    required: "city alanı zorunludur."
                    })}
                    label="Enter city" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.city}
                    helperText= {errors.city?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12}}>
               <TextField 
                    {...register("addressLine", {
                    required: "addressLine alanı zorunludur."
                    })}
                    label="Enter addressLine" 
                    size="small" 
                    fullWidth  
                    autoFocus 
                    sx={{mb:2}}
                    error={!!errors.addressLine}
                    helperText= {errors.addressLine?.message}
                />
            </Grid2>
            <Grid2 size={{xs:12, md:6}}></Grid2>
        </Grid2>
    )
}