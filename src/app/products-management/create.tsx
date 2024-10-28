'use client'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { Fragment, useLayoutEffect } from 'react'

interface Category {
  id: number
  name: string
}

interface CrawledData {
  name: string
  description: string
  author: string
  image: string
  chapters: {
    chapterNumber: number
    chapterName: string
    content: string
  }[]
}

interface CreateFormProps {
  open: boolean
  handleClose: () => void
  token?: string
  setRefresh: (refresh: boolean) => void
}

export default function CreateForm({ open, handleClose, token, setRefresh }: CreateFormProps) {
  const [selectedValue, setSelectedValue] = React.useState('clone')
  const [crawlUrl, setCrawlUrl] = React.useState('from-truyenhd')
  const [categories, setCategories] = React.useState<Category[]>([])
  const [categoryValue, setCategoryValue] = React.useState<number[]>([])
  const [crawled, setCrawled] = React.useState<CrawledData | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const handleChangeCrawl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrawlUrl(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      if (selectedValue === 'clone') {
        if (!crawled) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crawler/${crawlUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uri: data.get('link'),
            }),
          })
          const result = await response.json()
          if (result.data) {
            setCrawled(result.data)
          } else {
            throw new Error('Failed to fetch crawled data')
          }
        } else {
          const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              categories: categoryValue,
              name: data.get('name'),
              source: 'clone',
              image: data.get('image'),
              description: data.get('description'),
              authorName: data.get('authorName'),
              // userId: JSON.parse(token).id,
              status: 'PROGRESS',
            }),
          })
          const productData = await productResponse.json()

          // Send each chapter
          for (const chapter of crawled.chapters) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                productId: productData.id,
                chapterName: data.get(`chapterName${chapter.chapterNumber}`),
                content: data.get(`content${chapter.chapterNumber}`),
                chapterNumber: data.get(`chapterNumber${chapter.chapterNumber}`),
              }),
            })
          }
          setRefresh(true)
        }
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categories: categoryValue,
            name: data.get('name'),
            source: 'new',
            image: data.get('image'),
            description: data.get('description'),
            authorName: data.get('authorName'),
            // userId: JSON.parse(token).id,
            status: 'PROGRESS',
          }),
        })
        handleClose()
        setRefresh(true)
      }
    } catch (error) {
      alert(error)
    }

    setCrawled(null)
  }

  useLayoutEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 3 },
      }}
      maxWidth="md"
      scroll={'paper'}
      open={open}
      onClose={handleClose}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <FormControl fullWidth>
            <FormLabel id="demo-row-radio-buttons-group-label">Types</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel
                control={<Radio checked={selectedValue === 'clone'} onChange={handleChange} value="clone" />}
                label="Clone"
              />
              <FormControlLabel
                control={<Radio checked={selectedValue === 'new'} onChange={handleChange} value="new" />}
                label="New"
              />
            </RadioGroup>
          </FormControl>
          {selectedValue === 'clone' ? (
            <Fragment>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Crawl Type</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={crawlUrl === 'from-truyenhd'}
                        onChange={handleChangeCrawl}
                        value="from-truyenhd"
                      />
                    }
                    label="truyenhd"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={crawlUrl === 'from-truyenfull'}
                        onChange={handleChangeCrawl}
                        value="from-truyenfull"
                      />
                    }
                    label="truyenfull"
                  />
                  <FormControlLabel
                    control={
                      <Radio checked={crawlUrl === 'from-china'} onChange={handleChangeCrawl} value="from-china" />
                    }
                    label="jjwxc"
                  />
                </RadioGroup>
              </FormControl>
              <TextField required fullWidth id="link" label="A link which you want to crawl" name="link" autoFocus />
              {crawled && (
                <Grid className="mt-1" container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      fullWidth
                      name="name"
                      defaultValue={crawled?.name || ''}
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      id="categories"
                      fullWidth
                      multiple
                      options={categories}
                      getOptionLabel={option => option.name}
                      renderInput={params => <TextField {...params} label="Categories" required />}
                      onChange={(e, val) => setCategoryValue(val.map(v => Number(v.id)))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="description"
                      label="Description"
                      defaultValue={crawled?.description || ''}
                      fullWidth
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      id="authorName"
                      defaultValue={crawled?.author || ''}
                      label="Author Name"
                      name="authorName"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="image"
                      fullWidth
                      defaultValue={crawled?.image || ''}
                      label="Image"
                      placeholder="Put the image's link from gg to display for product"
                      name="image"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5">Chapters</Typography>
                  </Grid>
                  {crawled?.chapters.map((v, index) => (
                    <Grid container spacing={2} className="m-2" key={index}>
                      <div className="w-[100%]">
                        <Divider />
                      </div>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          type="number"
                          fullWidth
                          id="chapterNumber"
                          defaultValue={v?.chapterNumber || ''}
                          label="Chapter Number"
                          name={`chapterNumber${index + 1}`}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          fullWidth
                          id="chapterName"
                          defaultValue={v?.chapterName || ''}
                          label="Chapter Name"
                          name={`chapterName${index + 1}`}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          required
                          fullWidth
                          id="content"
                          defaultValue={v?.content || ''}
                          label="Content"
                          multiline
                          rows={4}
                          name={`content${index + 1}`}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <TextField required fullWidth id="name" label="Name" name="name" autoFocus />
              <Autocomplete
                disablePortal
                id="categories"
                fullWidth
                multiple
                options={categories}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} label="Categories" required />}
                onChange={(e, val) => setCategoryValue(val.map(v => v.id))}
              />
              <TextField required fullWidth id="description" label="Description" name="description" />
              <TextField required fullWidth id="authorName" label="Author Name" name="authorName" />
              <TextField
                required
                fullWidth
                id="image"
                label="Image"
                placeholder="Put the image's link from gg to display for product"
                name="image"
              />
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
