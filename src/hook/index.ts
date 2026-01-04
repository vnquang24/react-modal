import { useEffect, useCallback, useRef } from 'react'
import { TagType } from './tag'
import { useModalStore, useModalActions, store } from '../store'

export type Any = string | number | boolean | object | undefined | Record<string, any>

export interface DisclosureHookProps<O> {
  tag: TagType
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onToggle?: () => void
  onChange?: (isOpen: boolean) => void
  onOk?: (output?: O) => void
  onCancel?: () => void
}

export const useDisclosure = <Input = Any, Output = Any>(
  disclosureHook: DisclosureHookProps<Output>
) => {
  const tag = disclosureHook.tag
  
  // Use refs to store callbacks to avoid stale closures
  const disclosureHookRef = useRef(disclosureHook)
  disclosureHookRef.current = disclosureHook

  const inputState = useModalStore(
    (state) => state.modalTags[tag]?.input
  ) as Input
  const outputState = useModalStore(
    (state) => state.modalTags[tag]?.output
  ) as Output
  const clearDisclosureTag = useModalActions(
    (actions) => actions.clearModalTag
  )

  const onOpenAction = useModalActions((actions) => actions.openModal)
  const okAction = useModalActions((actions) => actions.okModal)
  const onCloseAction = useModalActions((actions) => actions.closeModal)
  const onToggleAction = useModalActions((actions) => actions.toggleModal)

  const updateInput = useCallback((input?: Input) => {
    // If input is a function, call it and set the result as input
    let processedInput = input
    if (processedInput && typeof processedInput == 'object' && 'preventDefault' in processedInput) {
      processedInput = undefined
    }
    onOpenAction(tag, processedInput as Any)
  }, [tag, onOpenAction])

  const onOpen = useCallback((input?: Input) => {
    updateInput(input)
    disclosureHookRef.current?.onOpen?.()
  }, [updateInput])

  const onClose = useCallback(() => {
    onCloseAction(tag)
    disclosureHookRef.current?.onClose?.()
  }, [tag, onCloseAction])

  const onToggle = useCallback(() => {
    onToggleAction(tag)
    disclosureHookRef.current?.onToggle?.()
  }, [tag, onToggleAction])

  const onOk = useCallback((output?: Output) => {
    disclosureHookRef.current?.onOk?.(output)
    okAction(tag, output as Any)
  }, [tag, okAction])

  const onChange = useCallback((isOpen: boolean) => {
    if (isOpen) {
      onOpen()
    } else {
      onClose()
    }
    disclosureHookRef.current?.onChange?.(isOpen)
  }, [onOpen, onClose])

  useEffect(() => {
    return () => {
      clearDisclosureTag(tag)
    }
  }, [tag, clearDisclosureTag])

  useEffect(() => {
    if (outputState) {
      onOk(outputState as Output)
    }
  }, [outputState, onOk])

  return {
    isOpen: !!inputState,
    input: typeof inputState === 'boolean' ? undefined : inputState,
    onOpen,
    onClose,
    onToggle,
    onOk,
    onChange,
    updateInput,
    store
  }
}
