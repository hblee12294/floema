import 'dotenv/config'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'
import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const port = 4000
const apiEndpoint = process.env.PRISMIC_ENDPOINT
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

const client = prismic.createClient(apiEndpoint, {
  fetch,
  accessToken,
})

app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }

  next()
})

app.set('views', join(__dirname, '../views'))

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const document = await client.getSingle('home')

  document.data.body.forEach(console.log)

  res.render('pages/home')
})

app.get('/about', async (req, res) => {
  const about = await client.getSingle('about')

  about.data.body.forEach(console.log)

  res.render('pages/about', {
    about,
  })
})

app.get('/collection', (req, res) => {
  res.render('pages/collection')
})

app.get('/detail/:uid', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log(`Running at localhost:${port}`)
})
