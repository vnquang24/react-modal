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
  
  // LUÔN render tất cả modals - KHÔNG conditional render
  // Modal components tự control hiển thị qua isOpen prop
  const allModals = useMemo(() => {
    return Object.entries(modals).map(([tag, Modal]) => {
      try {
        return <Modal key={tag} />
      } catch (error) {
        return null
      }
    })
  }, [modals])  // Chỉ phụ thuộc vào modals object, KHÔNG phụ thuộc modalTags
  
  return <React.Fragment>{allModals}</React.Fragment>
})
