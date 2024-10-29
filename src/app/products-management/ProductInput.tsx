'use client'
import { ApiResponse, ICategory, ICrawledData, IProduct } from '@/types'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface CreateFormProps {
  create?: (body: string) => Promise<ApiResponse<IProduct>>
  edit?: (body: string) => Promise<ApiResponse<IProduct>>
  crawl?: (url: string, body: string) => Promise<ApiResponse<ICrawledData>>
  createChapter?: (body: string) => Promise<void>
  categories: ICategory[]
  defaultValue?: IProduct
}

export default function ProductInput({ create, crawl, createChapter, defaultValue, categories }: CreateFormProps) {
  const [selectedValue, setSelectedValue] = React.useState('clone')
  const [crawlUrl, setCrawlUrl] = React.useState('truyenfull')
  // const [categories, setCategories] = React.useState<Category[]>([])
  const [categoryValue, setCategoryValue] = React.useState<number[]>([])
  const [crawled, setCrawled] = React.useState<ICrawledData | null>(null)
  const router = useRouter()

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
        if (!crawled && crawl) {
          const response = await crawl(crawlUrl, JSON.stringify({ uri: data.get('link') }))
          console.log('crawwwwlll========>', response)

          // if (response) {
          setCrawled(response.data)
          // } else {
          //   throw new Error('Failed to fetch crawled data')
          // }
        } else {
          if (create) {
            const productResponse = await create(
              JSON.stringify(
                JSON.stringify({
                  categories: categoryValue,
                  name: data.get('name'),
                  source: 'clone',
                  image: data.get('image'),
                  description: data.get('description'),
                  authorName: data.get('authorName'),
                  // userId: JSON.parse(token).id,
                  status: 'PROGRESS',
                }),
              ),
            )

            console.log('productResponse========>', productResponse)

            // const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${token}`,
            //   },
            //   body: JSON.stringify({
            //     categories: categoryValue,
            //     name: data.get('name'),
            //     source: 'clone',
            //     image: data.get('image'),
            //     description: data.get('description'),
            //     authorName: data.get('authorName'),
            //     // userId: JSON.parse(token).id,
            //     status: 'PROGRESS',
            //   }),
            // })
            // const productData = await productResponse.json()

            // Send each chapter
            if (crawled) {
              for (const chapter of crawled.chapters) {
                createChapter &&
                  (await createChapter(
                    JSON.stringify({
                      productId: productResponse.data.id,
                      chapterName: data.get(`chapterName${chapter.chapterNumber}`),
                      content: data.get(`content${chapter.chapterNumber}`),
                      chapterNumber: data.get(`chapterNumber${chapter.chapterNumber}`),
                    }),
                  ))
              }
              // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter`, {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     productId: productResponse.id,
              //     chapterName: data.get(`chapterName${chapter.chapterNumber}`),
              //     content: data.get(`content${chapter.chapterNumber}`),
              //     chapterNumber: data.get(`chapterNumber${chapter.chapterNumber}`),
              //   }),
            }
          }
        }
        // setRefresh(true)
      } else {
        const result =
          create &&
          (await create(
            JSON.stringify({
              categories: categoryValue,
              name: data.get('name'),
              source: 'new',
              image: data.get('image'),
              description: data.get('description'),
              authorName: data.get('authorName'),
              // userId: JSON.parse(token).id,
              status: 'PROGRESS',
            }),
          ))

        console.log('result========>', result)

        if (result?.statusCode) {
          toast.error(result?.message)
        } else {
          router.push('/products-management')
          toast.success('Tạo thành công truyện')
        }
        // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: JSON.stringify({
        //     categories: categoryValue,
        //     name: data.get('name'),
        //     source: 'new',
        //     image: data.get('image'),
        //     description: data.get('description'),
        //     authorName: data.get('authorName'),
        //     // userId: JSON.parse(token).id,
        //     status: 'PROGRESS',
        //   }),
        // })
        // handleClose()
        // setRefresh(true)
      }
    } catch (error) {}

    // setCrawled(null)
  }

  // useLayoutEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
  //       const data = await response.json()
  //       setCategories(data)
  //     } catch (error) {
  //       console.error('Failed to fetch categories', error)
  //     }
  //   }

  //   fetchCategories()
  // }, [])

  useEffect(() => {
    console.log('Crawled data updated:', crawled)
  }, [crawled])

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
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
                control={<Radio checked={crawlUrl === 'truyenhd'} onChange={handleChangeCrawl} value="truyenhd" />}
                label="truyenhd"
              />
              <FormControlLabel
                control={<Radio checked={crawlUrl === 'truyenfull'} onChange={handleChangeCrawl} value="truyenfull" />}
                label="truyenfull"
              />
              <FormControlLabel
                control={<Radio checked={crawlUrl === 'china'} onChange={handleChangeCrawl} value="china" />}
                label="jjwxc"
              />
            </RadioGroup>
          </FormControl>
          <TextField required fullWidth id="link" label="A link which you want to crawl" name="link" autoFocus />
          {crawled && (
            <Box className="mt-1">
              <TextField
                required
                id="name"
                label="Name"
                fullWidth
                name="name"
                defaultValue={crawled?.name || ''}
                autoComplete="name"
              />
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
              <TextField
                required
                id="description"
                label="Description"
                defaultValue={crawled?.description || ''}
                fullWidth
                name="description"
              />
              <TextField
                required
                fullWidth
                id="authorName"
                defaultValue={crawled?.author || ''}
                label="Author Name"
                name="authorName"
              />
              <TextField
                required
                id="image"
                fullWidth
                defaultValue={crawled?.image || ''}
                label="Image"
                placeholder="Put the image's link from gg to display for product"
                name="image"
              />
              <Typography variant="h5">Chapters</Typography>
              {crawled?.chapters.map((v, index) => (
                <Box key={index}>
                  <div className="w-[100%]">
                    <Divider />
                  </div>
                  <TextField
                    required
                    type="number"
                    fullWidth
                    id="chapterNumber"
                    defaultValue={v?.chapterNumber || ''}
                    label="Chapter Number"
                    name={`chapterNumber${index + 1}`}
                  />
                  <TextField
                    required
                    fullWidth
                    id="chapterName"
                    defaultValue={v?.chapterName || ''}
                    label="Chapter Name"
                    name={`chapterName${index + 1}`}
                  />
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
                </Box>
              ))}
            </Box>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            defaultValue={defaultValue?.name}
          />
          <Autocomplete
            disablePortal
            id="categories"
            fullWidth
            multiple
            options={categories}
            getOptionLabel={option => option.name}
            renderInput={params => <TextField {...params} label="Categories" required />}
            // onChange={(e, val) => setCategoryValue(val.map(v => v.id))}
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
      <Button type="submit">Create</Button>
    </Box>
  )
}
