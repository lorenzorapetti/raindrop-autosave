import { useCallback, useState } from "react"

export interface UseDisclosureProps {
  defaultIsOpen?: boolean
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const [isOpen, setIsOpen] = useState(props.defaultIsOpen || false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  }
}
