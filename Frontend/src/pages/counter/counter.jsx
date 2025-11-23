import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, incrementByValue } from "./counterSlice";

export default function Counter(){

    const value = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return(
        <>
            <Typography>{value}</Typography>
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
            <Button onClick={() => dispatch(incrementByValue(3))}>Increment By Value</Button>
        </>
    )
}