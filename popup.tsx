import { useState } from "react"

import { useStorage } from "@plasmohq/storage"

import "./assets/css/style.css"
import "./assets/css/popup.css"

import { Button } from "~components/Button"
import { RAINDROP_TOKEN_KEY, SAVE_COUNT_KEY } from "~constants"

function IndexPopup() {
  const [raindropToken] = useStorage(RAINDROP_TOKEN_KEY)
  const [saveCount] = useStorage(SAVE_COUNT_KEY)

  const handleOptionsClick = () => {
    chrome.runtime.openOptionsPage()
  }

  if (!raindropToken) {
    return (
      <div className="text-white p-6 flex flex-col items-center justify-center">
        <p className="mb-4">You need a Raindrop token for the app to work</p>
        <Button onClick={handleOptionsClick}>Open Settings</Button>
      </div>
    )
  }

  return (
    <div className="text-white p-6 flex flex-col items-center justify-center">
      <p className="text-2xl">{saveCount || "No"} articles saved</p>
    </div>
  )
}

export default IndexPopup
