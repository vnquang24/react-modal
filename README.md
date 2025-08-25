# React Hook Disclosure Modal Example

This repository demonstrates how to use **`react-hook-disclosure-modal`** to manage multiple modals in a React application with a clean, hook-based API.  

The library provides:  
- A `ReactHookModalProvider` to manage registered modals.  
- A `useDisclosure` hook to open, close, and pass data into modals.  
- Support for multiple modals, each uniquely identified by a `tag`.  

---

## Installation

```bash
npm install react-hook-disclosure-modal
# or
yarn add react-hook-disclosure-modal
# or
pnpm add react-hook-disclosure-modal
````

---

## Usage

### 1. Define Your Modals

Each modal is registered with a unique `tag`.
The `useDisclosure` hook gives you:

* `isOpen` → boolean to control modal visibility
* `onOpen` → function to open modal (with optional input)
* `onClose` → function to close modal
* `input` → optional data passed to the modal

```tsx
import React from 'react'
import { Modal } from 'your-ui-library'
import { useDisclosure } from 'react-hook-disclosure-modal'

const ModalOne = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'ModalOne' })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Modal One
    </Modal>
  )
}

const ModalTwo = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'ModalTwo' })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Modal Two
    </Modal>
  )
}

const ModalThree = () => {
  const { isOpen, onClose, input } = useDisclosure<string>({
    tag: 'ModalThree',
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Hello, this is {input}
    </Modal>
  )
}
```

---

### 2. Register Modals in the Provider

The `ReactHookModalProvider` manages which modals are available globally.
You just need to pass an array of modal components to it.

```tsx
import React from 'react'
import {
  ReactHookModalProvider,
  useDisclosure
} from 'react-hook-disclosure-modal'
import { Button } from 'your-ui-library'

import { ModalOne, ModalTwo, ModalThree } from './modals'

const modals = [ModalOne, ModalTwo, ModalThree]

const App = () => {
  const { onOpen: onOpenOne } = useDisclosure({ tag: 'ModalOne' })
  const { onOpen: onOpenTwo } = useDisclosure({ tag: 'ModalTwo' })
  const { onOpen: onOpenThree } = useDisclosure<string>({ tag: 'ModalThree' })

  return (
    <ReactHookModalProvider modals={modals}>
      <h1>Hello world</h1>
      <Button onClick={onOpenOne}>Open Modal One</Button>
      <Button onClick={onOpenTwo}>Open Modal Two</Button>
      <Button onClick={() => onOpenThree('The third modal')}>
        Open Modal Three
      </Button>
    </ReactHookModalProvider>
  )
}

export default App
```

---

## Features

✅ Simple API with `useDisclosure`
✅ Manage multiple modals with unique tags
✅ Pass dynamic data into modals (`input`)
✅ Works with any UI library (`Modal` component is pluggable)

---

## Example Flow

* **Modal One**: Opens with static content.
* **Modal Two**: Opens independently.
* **Modal Three**: Receives dynamic text via `onOpen('The third modal')`.

---

## License

MIT © [hoangnh2912](https://github.com/hoangnh2912)
