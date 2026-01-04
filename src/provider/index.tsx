import React, { useMemo, memo } from 'react'
import { useModalStore, State } from '../store'

type ModalComponent = React.FunctionComponent<any> | React.ComponentType<any>

export interface ModalWrapperProps {
  modals: Record<string, ModalComponent>
}

export const ModalWrapper = memo(function ModalWrapper({
  modals
}: ModalWrapperProps) {
  const modalTags = useModalStore((state: State) => state.modalTags)
  
  const modalOpened = useMemo(() => {
    return Object.entries(modals)
      .filter(([tag]) => !!modalTags[tag]?.input)
      .map(([tag, Modal]) => <Modal key={tag} />)
  }, [modals, modalTags])
  
  return <React.Fragment>{modalOpened}</React.Fragment>
})
