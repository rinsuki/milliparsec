import Express from 'express'
import supertest from 'supertest'
import { json, ReqWithBody } from '../src/index'

describe('Express middleware test', () => {
  it('should parse JSON body', (done) => {
    const app = Express()

    app.use(json())

    app.post('/', async (req: ReqWithBody, res, next) => {
      res.setHeader('Content-Type', 'application/json')
      res.json(req.body)
    })

    app.listen()

    const request = supertest(app)

    request
      .post('/')
      .send({ hello: 'world' })
      .set('Accept', 'application/json')
      .expect(200, {
        hello: 'world',
      })
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})
