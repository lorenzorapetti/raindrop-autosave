import { Readability, isProbablyReaderable } from "@mozilla/readability"
import ky from "ky"
import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

import {
  RAINDROP_ENDPOINT,
  RAINDROP_TOKEN_KEY,
  SAVE_COUNT_KEY
} from "~constants"
import type { Collection, ListResponse, Raindrop, SingleResponse } from "~types"

export const config: PlasmoContentScript = {}

window.addEventListener("load", async () => {
  const storage = new Storage()
  const token = await storage.get(RAINDROP_TOKEN_KEY)

  if (!token || !isProbablyReaderable(document)) {
    return
  }

  const api = ky.create({
    prefixUrl: RAINDROP_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const collections = await api
    .get("collections")
    .json<ListResponse<Collection>>()
  let collection = collections.items.find((item) => item.title === "Autosave")

  if (!collection) {
    const createCollectionRes = await api
      .post("collection", {
        json: {
          view: "list",
          title: "Autosave"
        }
      })
      .json<SingleResponse<Collection>>()

    collection = createCollectionRes.item
  }

  if (!collection) {
    console.error("Cannot create or find Autosave collection")
  }

  // Strip querystring
  const currentLink = document.location.href.split("?")[0].split("#")[0]
  const searchLink = currentLink.replace(/^https?:\/\//, "")

  const raindrops = await api
    .get(`raindrops/${collection._id}`, {
      searchParams: {
        search: `link:${searchLink}`
      }
    })
    .json<ListResponse<Raindrop>>()

  // Avoid duplicates
  if (raindrops.items.length > 0) {
    return
  }

  const documentClone = document.cloneNode(true) as Document
  const article = new Readability(documentClone).parse()

  await api.post("raindrop", {
    json: {
      pleaseParse: {},
      collection: {
        $id: collection._id
      },
      title: article.title,
      link: currentLink
    }
  })

  const saveCount = (await storage.get(SAVE_COUNT_KEY)) || "0"
  await storage.set(SAVE_COUNT_KEY, (parseInt(saveCount, 10) + 1).toString())
})
