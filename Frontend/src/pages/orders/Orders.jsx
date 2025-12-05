import { useEffect, useState } from "react"
import requests from "../../api/apiClient"
import { Alert, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Loading from "../../components/Loading"
import { currenyTRY } from "../../utils/formats"
import CloseIcon from '@mui/icons-material/Close';

export default function OrdersPage(){
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [open, setOpen] = useState(false)

    function handleDialogOpen(order){
        setOpen(true)
        setSelectedOrder(order)
    }

    function handleDialogClose(){
        setOpen(false)
        setSelectedOrder(null)
    }

    useEffect(() => {
        async function fetchOrders() {
            try{
                setLoading(true);
                const result = await requests.orders.getOrders();
                setOrders(result);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        fetchOrders();
    },[]);
    
    if(loading) return <Loading/>

    if(!orders || orders.length === 0 ){
        return <Alert severity="warning">Henüz siparişiniz yok</Alert>
    } 

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sipariş Numarası</TableCell>
                            <TableCell>Sipariş Durumu</TableCell>
                            <TableCell>Sipariş Tarihi</TableCell>
                            <TableCell>Toplam Fiyat</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    <Chip variant="outlined" color="secondary" label={item.orderStatus}/>
                                </TableCell>
                                <TableCell>{new Date(item.orderDate).toLocaleString()}</TableCell>
                                <TableCell>{currenyTRY.format(item.total)}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" size="small" onClick={() => handleDialogOpen(item)}>Detaylar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="md" transitionDuration={0}>
                <DialogTitle>Sipariş no: {selectedOrder?.id}</DialogTitle>
                <IconButton onClick={handleDialogClose} sx={{position:"absolute", right:8, top:8}}>
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Paper sx={{p:3, mb:3}}>
                        <Typography variant="h6" gutterBottom>
                            Teslimat Bilgileri
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {selectedOrder?.firstName} {selectedOrder?.lastName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {selectedOrder?.address} / {selectedOrder?.city}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {selectedOrder?.phone} 
                        </Typography>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Fiyat</TableCell>
                                    <TableCell>Adet</TableCell>
                                    <TableCell>Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.orderItems.map((item) =>(
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img 
                                                src={`http://localhost:5000/images/${item.image}`}
                                                style={{height: 60}}  
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            {currenyTRY.format(item.price)}
                                        </TableCell>
                                        <TableCell>
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell>
                                            {currenyTRY.format(item.price * item.quantity)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </>
    )   
}
