# React Hook Disclosure Modal

[![npm version](https://img.shields.io/npm/v/react-hook-disclosure-modal.svg)](https://www.npmjs.com/package/react-hook-disclosure-modal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful and flexible React hook library for managing modals with a clean, declarative API. Perfect for applications that need to manage multiple modals with data passing capabilities.

**Compatible with React 16.8+, 17, 18, and 19 (including 19.2.3)** and works seamlessly with UI libraries like **Ant Design 6**, **Material UI**, **Chakra UI**, etc.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [ReactHookModalProvider](#reacthookmodalprovider)
  - [useDisclosure Hook](#usedisclosure-hook)
  - [Hook Options (DisclosureHookProps)](#hook-options-disclosurehookprops)
  - [Hook Return Values](#hook-return-values)
- [Advanced Usage](#advanced-usage)
  - [Passing Data to Modals](#passing-data-to-modals)
  - [Returning Data from Modals (onOk)](#returning-data-from-modals-onok)
  - [Using Callbacks](#using-callbacks)
  - [TypeScript Support](#typescript-support)
- [Examples](#examples)
  - [Basic Modal](#basic-modal)
  - [Confirmation Modal](#confirmation-modal)
  - [Form Modal with Data Return](#form-modal-with-data-return)
  - [With Ant Design 6](#with-ant-design-6)
- [Compatibility](#compatibility)
- [License](#license)

---

## Installation

```bash
npm install react-hook-disclosure-modal
# or
yarn add react-hook-disclosure-modal
# or
pnpm add react-hook-disclosure-modal
```

---

## Quick Start

```tsx
import React from 'react'
import { ReactHookModalProvider, useDisclosure } from 'react-hook-disclosure-modal'
import { Modal, Button } from 'antd'

// 1. Define your modal component
const MyModal = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'MyModal' })
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose} title="My Modal">
      Hello World!
    </Modal>
  )
}

// 2. Register modals and use them
const modals = { MyModal }

const App = () => {
  const { onOpen } = useDisclosure({ tag: 'MyModal' })
  
  return (
    <ReactHookModalProvider modals={modals}>
      <Button onClick={onOpen}>Open Modal</Button>
    </ReactHookModalProvider>
  )
}
```

---

## API Reference

### ReactHookModalProvider

The provider component that manages all registered modals.

```tsx
<ReactHookModalProvider modals={modals}>
  {children}
</ReactHookModalProvider>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `modals` | `Record<string, React.ComponentType>` | ✅ | Object with modal components, keys are the tags |
| `children` | `React.ReactNode` | ✅ | Your application components |

---

### useDisclosure Hook

The main hook to control modal state.

```tsx
const disclosure = useDisclosure<Input, Output>(options)
```

#### Generic Types

| Type | Default | Description |
|------|---------|-------------|
| `Input` | `Any` | Type of data passed TO the modal via `onOpen(input)` |
| `Output` | `Any` | Type of data returned FROM the modal via `onOk(output)` |

---

### Hook Options (DisclosureHookProps)

```tsx
interface DisclosureHookProps<Output> {
  tag: string           // Required: Unique identifier for the modal
  isOpen?: boolean      // Optional: Initial open state
  onOpen?: () => void   // Optional: Callback when modal opens
  onClose?: () => void  // Optional: Callback when modal closes
  onToggle?: () => void // Optional: Callback when modal toggles
  onChange?: (isOpen: boolean) => void  // Optional: Callback when state changes
  onOk?: (output?: Output) => void      // Optional: Callback when onOk is called
  onCancel?: () => void // Optional: Callback when cancelled
}
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `tag` | `string` | ✅ | Unique identifier for the modal. Must match the key in `modals` object |
| `isOpen` | `boolean` | ❌ | Initial open state (rarely needed) |
| `onOpen` | `() => void` | ❌ | Callback triggered when modal opens |
| `onClose` | `() => void` | ❌ | Callback triggered when modal closes |
| `onToggle` | `() => void` | ❌ | Callback triggered when modal toggles |
| `onChange` | `(isOpen: boolean) => void` | ❌ | Callback triggered when open state changes |
| `onOk` | `(output?: Output) => void` | ❌ | Callback triggered when `onOk` is called with output data |
| `onCancel` | `() => void` | ❌ | Callback triggered when cancelled |

---

### Hook Return Values

```tsx
const {
  isOpen,      // boolean: Current open state
  input,       // Input | undefined: Data passed to modal
  onOpen,      // (input?: Input) => void: Open the modal
  onClose,     // () => void: Close the modal
  onToggle,    // () => void: Toggle modal state
  onOk,        // (output?: Output) => void: Confirm and pass data back
  onChange,    // (isOpen: boolean) => void: Set open state directly
  updateInput, // (input?: Input) => void: Update input without triggering onOpen callback
  store        // Store: Direct access to the store (advanced usage)
} = useDisclosure(options)
```

| Return Value | Type | Description |
|--------------|------|-------------|
| `isOpen` | `boolean` | Whether the modal is currently open |
| `input` | `Input \| undefined` | Data passed to the modal via `onOpen(data)` |
| `onOpen` | `(input?: Input) => void` | Opens the modal, optionally with input data |
| `onClose` | `() => void` | Closes the modal |
| `onToggle` | `() => void` | Toggles the modal open/closed |
| `onOk` | `(output?: Output) => void` | Closes modal and triggers `onOk` callback with output |
| `onChange` | `(isOpen: boolean) => void` | Directly set the open state |
| `updateInput` | `(input?: Input) => void` | Update input data without triggering callbacks |
| `store` | `Store` | Direct access to TanStack Store (advanced) |

---

## Advanced Usage

### Passing Data to Modals

Pass data when opening a modal:

```tsx
// Parent component
const { onOpen } = useDisclosure<UserData>({ tag: 'EditUserModal' })

// Open with data
onOpen({ id: 1, name: 'John', email: 'john@example.com' })

// Inside the modal
const EditUserModal = () => {
  const { isOpen, input, onClose } = useDisclosure<UserData>({ tag: 'EditUserModal' })
  
  return (
    <Modal open={isOpen} onCancel={onClose}>
      <p>Editing: {input?.name}</p>
      <p>Email: {input?.email}</p>
    </Modal>
  )
}
```

---

### Returning Data from Modals (onOk)

Return data from a modal to the parent component:

```tsx
// Parent component - receives data via onOk callback
const { onOpen } = useDisclosure<void, FormData>({
  tag: 'FormModal',
  onOk: (result) => {
    console.log('Form submitted:', result)
    // result is typed as FormData
  }
})

// Inside the modal - sends data back
const FormModal = () => {
  const { isOpen, onClose, onOk } = useDisclosure<void, FormData>({ tag: 'FormModal' })
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
  
  const handleSubmit = () => {
    onOk(formData)  // This triggers the onOk callback in parent
    onClose()
  }
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={handleSubmit}>
      <input 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
      />
    </Modal>
  )
}
```

---

### Using Callbacks

All lifecycle callbacks:

```tsx
const { onOpen, onClose } = useDisclosure({
  tag: 'MyModal',
  
  // Called when modal opens
  onOpen: () => {
    console.log('Modal opened')
    analytics.track('modal_opened')
  },
  
  // Called when modal closes
  onClose: () => {
    console.log('Modal closed')
    form.reset()
  },
  
  // Called when modal toggles
  onToggle: () => {
    console.log('Modal toggled')
  },
  
  // Called when open state changes (either way)
  onChange: (isOpen) => {
    console.log('Modal state changed:', isOpen)
  },
  
  // Called when onOk is triggered with data
  onOk: (output) => {
    console.log('Modal confirmed with:', output)
    saveData(output)
  },
  
  // Called when cancelled
  onCancel: () => {
    console.log('Modal cancelled')
  }
})
```

---

### TypeScript Support

Full TypeScript support with generics:

```tsx
// Define your types
interface UserInput {
  userId: number
  mode: 'edit' | 'view'
}

interface UserOutput {
  name: string
  email: string
  saved: boolean
}

// Use with generics
const { onOpen, input } = useDisclosure<UserInput, UserOutput>({
  tag: 'UserModal',
  onOk: (output) => {
    // output is typed as UserOutput | undefined
    if (output?.saved) {
      toast.success(`Saved ${output.name}`)
    }
  }
})

// TypeScript knows the types
onOpen({ userId: 1, mode: 'edit' })  // ✅ Correct
onOpen({ wrong: 'data' })             // ❌ Type error
```

---

## Examples

### Basic Modal

```tsx
import { Modal, Button } from 'antd'
import { useDisclosure } from 'react-hook-disclosure-modal'

const BasicModal = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'BasicModal' })
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose} 
      onOk={onClose}
      title="Basic Modal"
    >
      <p>This is a basic modal with no data passing.</p>
    </Modal>
  )
}

// Usage
const { onOpen } = useDisclosure({ tag: 'BasicModal' })
<Button onClick={onOpen}>Open Basic Modal</Button>
```

---

### Confirmation Modal

```tsx
const ConfirmDeleteModal = () => {
  const { isOpen, input, onClose, onOk } = useDisclosure<{ itemId: number; itemName: string }, boolean>({
    tag: 'ConfirmDelete'
  })
  
  const handleConfirm = () => {
    onOk(true)  // Return true to indicate confirmation
    onClose()
  }
  
  const handleCancel = () => {
    onOk(false) // Return false to indicate cancellation
    onClose()
  }
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={handleCancel}
      onOk={handleConfirm}
      title="Confirm Delete"
      okText="Delete"
      okType="danger"
    >
      <p>Are you sure you want to delete "{input?.itemName}"?</p>
    </Modal>
  )
}

// Usage
const { onOpen } = useDisclosure<{ itemId: number; itemName: string }, boolean>({
  tag: 'ConfirmDelete',
  onOk: (confirmed) => {
    if (confirmed) {
      deleteItem(itemId)
      toast.success('Item deleted!')
    }
  }
})

<Button danger onClick={() => onOpen({ itemId: 123, itemName: 'My Item' })}>
  Delete Item
</Button>
```

---

### Form Modal with Data Return

```tsx
interface FormInput {
  initialData?: { name: string; email: string }
}

interface FormOutput {
  name: string
  email: string
}

const UserFormModal = () => {
  const { isOpen, input, onClose, onOk } = useDisclosure<FormInput, FormOutput>({
    tag: 'UserForm'
  })
  
  const [form] = Form.useForm()
  
  useEffect(() => {
    if (isOpen && input?.initialData) {
      form.setFieldsValue(input.initialData)
    }
  }, [isOpen, input])
  
  const handleSubmit = async () => {
    const values = await form.validateFields()
    onOk(values)  // Return form data to parent
    onClose()
    form.resetFields()
  }
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose}
      onOk={handleSubmit}
      title={input?.initialData ? 'Edit User' : 'Create User'}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

// Usage - Create new user
const { onOpen: openCreate } = useDisclosure<FormInput, FormOutput>({
  tag: 'UserForm',
  onOk: (userData) => {
    createUser(userData)
    toast.success('User created!')
  }
})

// Usage - Edit existing user
const { onOpen: openEdit } = useDisclosure<FormInput, FormOutput>({
  tag: 'UserForm',
  onOk: (userData) => {
    updateUser(userId, userData)
    toast.success('User updated!')
  }
})

<Button onClick={() => openCreate({})}>Create User</Button>
<Button onClick={() => openEdit({ initialData: existingUser })}>Edit User</Button>
```

---

### With Ant Design 6

Complete example with Ant Design 6:

```tsx
import React from 'react'
import { Modal, Button, Space, Form, Input, message } from 'antd'
import { ReactHookModalProvider, useDisclosure } from 'react-hook-disclosure-modal'

// Modal Components
const WelcomeModal = () => {
  const { isOpen, onClose, input } = useDisclosure<{ username: string }>({
    tag: 'WelcomeModal'
  })
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose} title="Welcome!">
      <p>Hello, {input?.username}! Welcome to our application.</p>
    </Modal>
  )
}

const SettingsModal = () => {
  const { isOpen, onClose, onOk } = useDisclosure<void, { theme: string }>({
    tag: 'SettingsModal'
  })
  
  const handleSave = () => {
    onOk({ theme: 'dark' })
    onClose()
  }
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={handleSave} title="Settings">
      <p>Configure your settings here...</p>
    </Modal>
  )
}

// Register all modals
const modals = {
  WelcomeModal,
  SettingsModal
}

// Main App
const App = () => {
  const { onOpen: openWelcome } = useDisclosure<{ username: string }>({
    tag: 'WelcomeModal'
  })
  
  const { onOpen: openSettings } = useDisclosure<void, { theme: string }>({
    tag: 'SettingsModal',
    onOk: (settings) => {
      message.success(`Theme changed to: ${settings?.theme}`)
    }
  })
  
  return (
    <ReactHookModalProvider modals={modals}>
      <Space>
        <Button type="primary" onClick={() => openWelcome({ username: 'John' })}>
          Show Welcome
        </Button>
        <Button onClick={openSettings}>
          Open Settings
        </Button>
      </Space>
    </ReactHookModalProvider>
  )
}

export default App
```

---

## Compatibility

| React Version | Supported |
|---------------|-----------|
| 16.8+         | ✅        |
| 17.x          | ✅        |
| 18.x          | ✅        |
| 19.x          | ✅        |

| UI Library      | Tested |
|-----------------|--------|
| Ant Design 6    | ✅     |
| Material UI 5+  | ✅     |
| Chakra UI 2+    | ✅     |
| Headless UI     | ✅     |
| Radix UI        | ✅     |
| Custom Modals   | ✅     |

---

## Dependencies

- `@tanstack/react-store` - For state management

---

## License

MIT © [vnquang24](https://github.com/vnquang24)
