import type { MouseEventHandler } from "react"

import { useStorage } from "@plasmohq/storage"

import { Alert } from "~components/Alert"
import { Button } from "~components/Button"
import { Input } from "~components/Input"
import { RAINDROP_TOKEN_KEY } from "~constants"
import { useDisclosure } from "~hooks/useDisclosure"

import "./assets/css/style.css"

function OptionsIndex() {
  const [raindropToken, , { setStoreValue, setRenderValue }] = useStorage(
    RAINDROP_TOKEN_KEY,
    ""
  )
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    setStoreValue()
    onOpen()
  }

  return (
    <div className="h-full text-white py-10">
      <div className="max-w-screen-md mx-auto flex flex-col">
        <h1 className="text-5xl font-bold mb-8">Settings</h1>

        {isOpen && (
          <Alert
            message="Settings updated!"
            onClose={onClose}
            className="mb-8"
          />
        )}

        <form>
          <Input
            name="token"
            label="Raindrop Token"
            value={raindropToken}
            onChange={setRenderValue}
            className="mb-4"
          />

          <Button colorScheme="success" onClick={handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OptionsIndex
