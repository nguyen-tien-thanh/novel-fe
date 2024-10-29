'use client'
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
// } from '@stripe/react-stripe-js';
import { useEffect } from 'react'
// import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Autocomplete, Box, Button, Dialog, TextField } from '@mui/material'
import React from 'react'
// import axios from 'axios';

export default function CreateForm({ open, handleClose, setRefresh, products }) {
  // const [productValue, setProductValue] = React.useState()
  const token = ''

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     if (product.ok) {
    //       const productData = await product.json()
    //       setProductValue(productData)
    //     } else {
    //       console.error('Failed to fetch products:', product.statusText)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching products:', error)
    //   }
    // }
    // fetchData()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const chapterResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // productId: productValue,
        chapterName: data.get(`chapterName`),
        price: data.get(`price`),
        content: data.get(`content`),
        chapterNumber: data.get(`chapterNumber`),
      }),
    })

    const result = await chapterResponse.json()
    if (result.data) {
      handleClose()
      setRefresh(true)
    } else {
      throw new Error('Failed to fetch crawled data')
    }
  }
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5 },
      }}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <Box className="flex flex-col items-center" component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Autocomplete
          disablePortal
          id="categories"
          fullWidth
          options={products}
          getOptionLabel={(option: { name: string }) => option.name}
          renderInput={params => <TextField {...params} label="Categories" id="id" />}
          // onChange={(e, val: any) => setProductValue(val?.map((v: any) => Number(v.id)))}
          renderOption={(props, option) => (
            <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
              <h3>{option?.name}</h3>
            </div>
          )}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="chapterNumber"
          label="Chapter Number"
          name="chapterNumber"
          type="number"
          autoFocus
        />
        <TextField margin="normal" required fullWidth id="price" label="Price" name="price" type="number" autoFocus />
        <TextField
          margin="normal"
          required
          fullWidth
          id="chapterName"
          label="Chapter Name"
          name="chapterName"
          autoFocus
        />
        <TextField margin="normal" fullWidth name="content" label="Content" id="content" multiline rows={4} />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </Dialog>
  )
}
