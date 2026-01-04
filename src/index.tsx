import * as React from 'react'
import { ModalWrapper } from './provider'

type ModalComponent = React.FunctionComponent<any> | React.ComponentType<any>

export type ReactHookModalProviderProps = {
  children: React.ReactNode
  modals: Record<string, ModalComponent>
}

export const ReactHookModalProvider = ({
  children,
  modals
}: ReactHookModalProviderProps) => {
  return (
    <React.Fragment>
      <ModalWrapper modals={modals} />
      {children}
    </React.Fragment>
  )
}

export * from './hook'
export * from './provider'
