import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import {
  render, 
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"

import { MainPage } from "../components/main-page"

const fakeQuotes = [
  { quote: "Gah, I did need to do some homework!"},
  { quote: "Jejeje something happen to me!"},
  { quote: "Shut up, brain. I got friends now. I don't nedd you anymore"},
]

const server = setupServer(
  rest.get("/quotes", (req, res, ctx) => {
    return res(ctx.json(fakeQuotes))
  })
)

beforeEach(() => render (<MainPage />))

//Enable API moking before test
beforeAll(() => server.listen())

//Disable API mocking after the tests are done
afterAll(() => server.close())


describe ("Quote List", () => {
  it("must contain quote value", async () => {
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole("listitem")
    const [fakeOne, fakeTwo, fakeThird] = fakeQuotes
    expect(firstQuote.textContent).toBe("Gah, I did need to do some homework!")
    expect(secondQuote.textContent).toBe("Jejeje something happen to me!")
    expect(thirdQuote.textContent).toBe("Shut up, brain. I got friends now. I don't nedd you anymore")
  })
})