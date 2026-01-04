# React Hook Disclosure Modal

[![npm version](https://img.shields.io/npm/v/@helloworldqq/react-modal.svg)](https://www.npmjs.com/package/@helloworldqq/react-modal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Thư viện React hook mạnh mẽ và linh hoạt để quản lý modal với API khai báo rõ ràng. Hoàn hảo cho các ứng dụng cần quản lý nhiều modal với khả năng truyền dữ liệu.

**Tương thích với React 16.8+, 17, 18 và 19 (bao gồm 19.2.3)** và hoạt động tốt với các thư viện UI như **Ant Design 6**, **Material UI**, **Chakra UI**, v.v.

---

## Mục Lục

- [Cài Đặt](#cài-đặt)
- [Bắt Đầu Nhanh](#bắt-đầu-nhanh)
- [Tài Liệu API](#tài-liệu-api)
  - [ReactHookModalProvider](#reacthookmodalprovider)
  - [useDisclosure Hook](#usedisclosure-hook)
  - [Các Tùy Chọn Hook (DisclosureHookProps)](#các-tùy-chọn-hook-disclosurehookprops)
  - [Giá Trị Trả Về Của Hook](#giá-trị-trả-về-của-hook)
- [Sử Dụng Nâng Cao](#sử-dụng-nâng-cao)
  - [Truyền Dữ Liệu Vào Modal](#truyền-dữ-liệu-vào-modal)
  - [Trả Dữ Liệu Từ Modal (onOk)](#trả-dữ-liệu-từ-modal-onok)
  - [Sử Dụng Callbacks](#sử-dụng-callbacks)
  - [Hỗ Trợ TypeScript](#hỗ-trợ-typescript)
- [Ví Dụ](#ví-dụ)
  - [Modal Cơ Bản](#modal-cơ-bản)
  - [Modal Xác Nhận](#modal-xác-nhận)
  - [Modal Form Với Trả Dữ Liệu](#modal-form-với-trả-dữ-liệu)
  - [Với Ant Design 6](#với-ant-design-6)
- [Tương Thích](#tương-thích)
- [Giấy Phép](#giấy-phép)

---

## Cài Đặt

```bash
npm install @helloworldqq/react-modal
# hoặc
yarn add @helloworldqq/react-modal
# hoặc
pnpm add @helloworldqq/react-modal
```

---

## Bắt Đầu Nhanh

```tsx
import React from 'react'
import { ReactHookModalProvider, useDisclosure } from '@helloworldqq/react-modal'
import { Modal, Button } from 'antd'

// 1. Định nghĩa component modal của bạn
const MyModal = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'MyModal' })
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose} title="Modal Của Tôi">
      Xin chào!
    </Modal>
  )
}

// 2. Đăng ký modals và sử dụng
const modals = { MyModal }

const App = () => {
  const { onOpen } = useDisclosure({ tag: 'MyModal' })
  
  return (
    <ReactHookModalProvider modals={modals}>
      <Button onClick={onOpen}>Mở Modal</Button>
    </ReactHookModalProvider>
  )
}
```

---

## Tài Liệu API

### ReactHookModalProvider

Component provider quản lý tất cả các modal đã đăng ký.

```tsx
<ReactHookModalProvider modals={modals}>
  {children}
</ReactHookModalProvider>
```

| Prop | Kiểu | Bắt buộc | Mô tả |
|------|------|----------|-------|
| `modals` | `Record<string, React.ComponentType>` | ✅ | Object chứa các component modal, key là tag |
| `children` | `React.ReactNode` | ✅ | Các component con của ứng dụng |

---

### useDisclosure Hook

Hook chính để điều khiển trạng thái modal.

```tsx
const disclosure = useDisclosure<Input, Output>(options)
```

#### Kiểu Generic

| Kiểu | Mặc định | Mô tả |
|------|----------|-------|
| `Input` | `Any` | Kiểu dữ liệu truyền VÀO modal qua `onOpen(input)` |
| `Output` | `Any` | Kiểu dữ liệu trả về TỪ modal qua `onOk(output)` |

---

### Các Tùy Chọn Hook (DisclosureHookProps)

```tsx
interface DisclosureHookProps<Output> {
  tag: string           // Bắt buộc: Định danh duy nhất cho modal
  isOpen?: boolean      // Tùy chọn: Trạng thái mở ban đầu
  onOpen?: () => void   // Tùy chọn: Callback khi modal mở
  onClose?: () => void  // Tùy chọn: Callback khi modal đóng
  onToggle?: () => void // Tùy chọn: Callback khi modal chuyển đổi trạng thái
  onChange?: (isOpen: boolean) => void  // Tùy chọn: Callback khi trạng thái thay đổi
  onOk?: (output?: Output) => void      // Tùy chọn: Callback khi onOk được gọi
  onCancel?: () => void // Tùy chọn: Callback khi hủy
}
```

| Tùy chọn | Kiểu | Bắt buộc | Mô tả |
|----------|------|----------|-------|
| `tag` | `string` | ✅ | Định danh duy nhất cho modal. Phải khớp với key trong object `modals` |
| `isOpen` | `boolean` | ❌ | Trạng thái mở ban đầu (ít khi cần) |
| `onOpen` | `() => void` | ❌ | Callback được kích hoạt khi modal mở |
| `onClose` | `() => void` | ❌ | Callback được kích hoạt khi modal đóng |
| `onToggle` | `() => void` | ❌ | Callback được kích hoạt khi modal chuyển đổi trạng thái |
| `onChange` | `(isOpen: boolean) => void` | ❌ | Callback được kích hoạt khi trạng thái mở thay đổi |
| `onOk` | `(output?: Output) => void` | ❌ | Callback được kích hoạt khi `onOk` được gọi với dữ liệu output |
| `onCancel` | `() => void` | ❌ | Callback được kích hoạt khi hủy |

---

### Giá Trị Trả Về Của Hook

```tsx
const {
  isOpen,      // boolean: Trạng thái mở hiện tại
  input,       // Input | undefined: Dữ liệu được truyền vào modal
  onOpen,      // (input?: Input) => void: Mở modal
  onClose,     // () => void: Đóng modal
  onToggle,    // () => void: Chuyển đổi trạng thái modal
  onOk,        // (output?: Output) => void: Xác nhận và truyền dữ liệu về
  onChange,    // (isOpen: boolean) => void: Đặt trạng thái mở trực tiếp
  updateInput, // (input?: Input) => void: Cập nhật input mà không kích hoạt callback onOpen
  store        // Store: Truy cập trực tiếp store (sử dụng nâng cao)
} = useDisclosure(options)
```

| Giá trị trả về | Kiểu | Mô tả |
|----------------|------|-------|
| `isOpen` | `boolean` | Modal có đang mở hay không |
| `input` | `Input \| undefined` | Dữ liệu được truyền vào modal qua `onOpen(data)` |
| `onOpen` | `(input?: Input) => void` | Mở modal, có thể kèm dữ liệu input |
| `onClose` | `() => void` | Đóng modal |
| `onToggle` | `() => void` | Chuyển đổi trạng thái mở/đóng của modal |
| `onOk` | `(output?: Output) => void` | Đóng modal và kích hoạt callback `onOk` với output |
| `onChange` | `(isOpen: boolean) => void` | Đặt trạng thái mở trực tiếp |
| `updateInput` | `(input?: Input) => void` | Cập nhật dữ liệu input mà không kích hoạt callbacks |
| `store` | `Store` | Truy cập trực tiếp TanStack Store (nâng cao) |

---

## Sử Dụng Nâng Cao

### Truyền Dữ Liệu Vào Modal

Truyền dữ liệu khi mở modal:

```tsx
// Component cha
const { onOpen } = useDisclosure<UserData>({ tag: 'EditUserModal' })

// Mở với dữ liệu
onOpen({ id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' })

// Bên trong modal
const EditUserModal = () => {
  const { isOpen, input, onClose } = useDisclosure<UserData>({ tag: 'EditUserModal' })
  
  return (
    <Modal open={isOpen} onCancel={onClose}>
      <p>Đang chỉnh sửa: {input?.name}</p>
      <p>Email: {input?.email}</p>
    </Modal>
  )
}
```

---

### Trả Dữ Liệu Từ Modal (onOk)

Trả dữ liệu từ modal về component cha:

```tsx
// Component cha - nhận dữ liệu qua callback onOk
const { onOpen } = useDisclosure<void, FormData>({
  tag: 'FormModal',
  onOk: (result) => {
    console.log('Form đã gửi:', result)
    // result được định kiểu là FormData
  }
})

// Bên trong modal - gửi dữ liệu về
const FormModal = () => {
  const { isOpen, onClose, onOk } = useDisclosure<void, FormData>({ tag: 'FormModal' })
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
  
  const handleSubmit = () => {
    onOk(formData)  // Kích hoạt callback onOk ở component cha
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

### Sử Dụng Callbacks

Tất cả các callback vòng đời:

```tsx
const { onOpen, onClose } = useDisclosure({
  tag: 'MyModal',
  
  // Được gọi khi modal mở
  onOpen: () => {
    console.log('Modal đã mở')
    analytics.track('modal_opened')
  },
  
  // Được gọi khi modal đóng
  onClose: () => {
    console.log('Modal đã đóng')
    form.reset()
  },
  
  // Được gọi khi modal chuyển đổi trạng thái
  onToggle: () => {
    console.log('Modal đã chuyển đổi trạng thái')
  },
  
  // Được gọi khi trạng thái mở thay đổi (cả hai hướng)
  onChange: (isOpen) => {
    console.log('Trạng thái modal đã thay đổi:', isOpen)
  },
  
  // Được gọi khi onOk được kích hoạt với dữ liệu
  onOk: (output) => {
    console.log('Modal đã xác nhận với:', output)
    saveData(output)
  },
  
  // Được gọi khi hủy
  onCancel: () => {
    console.log('Modal đã bị hủy')
  }
})
```

---

### Hỗ Trợ TypeScript

Hỗ trợ TypeScript đầy đủ với generics:

```tsx
// Định nghĩa các kiểu của bạn
interface UserInput {
  userId: number
  mode: 'edit' | 'view'
}

interface UserOutput {
  name: string
  email: string
  saved: boolean
}

// Sử dụng với generics
const { onOpen, input } = useDisclosure<UserInput, UserOutput>({
  tag: 'UserModal',
  onOk: (output) => {
    // output được định kiểu là UserOutput | undefined
    if (output?.saved) {
      toast.success(`Đã lưu ${output.name}`)
    }
  }
})

// TypeScript biết các kiểu
onOpen({ userId: 1, mode: 'edit' })  // ✅ Đúng
onOpen({ wrong: 'data' })             // ❌ Lỗi kiểu
```

---

## Ví Dụ

### Modal Cơ Bản

```tsx
import { Modal, Button } from 'antd'
import { useDisclosure } from '@helloworldqq/react-modal'

const BasicModal = () => {
  const { isOpen, onClose } = useDisclosure({ tag: 'BasicModal' })
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose} 
      onOk={onClose}
      title="Modal Cơ Bản"
    >
      <p>Đây là modal cơ bản không có truyền dữ liệu.</p>
    </Modal>
  )
}

// Sử dụng
const { onOpen } = useDisclosure({ tag: 'BasicModal' })
<Button onClick={onOpen}>Mở Modal Cơ Bản</Button>
```

---

### Modal Xác Nhận

```tsx
const ConfirmDeleteModal = () => {
  const { isOpen, input, onClose, onOk } = useDisclosure<{ itemId: number; itemName: string }, boolean>({
    tag: 'ConfirmDelete'
  })
  
  const handleConfirm = () => {
    onOk(true)  // Trả về true để chỉ ra đã xác nhận
    onClose()
  }
  
  const handleCancel = () => {
    onOk(false) // Trả về false để chỉ ra đã hủy
    onClose()
  }
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={handleCancel}
      onOk={handleConfirm}
      title="Xác Nhận Xóa"
      okText="Xóa"
      okType="danger"
    >
      <p>Bạn có chắc chắn muốn xóa "{input?.itemName}" không?</p>
    </Modal>
  )
}

// Sử dụng
const { onOpen } = useDisclosure<{ itemId: number; itemName: string }, boolean>({
  tag: 'ConfirmDelete',
  onOk: (confirmed) => {
    if (confirmed) {
      deleteItem(itemId)
      toast.success('Đã xóa thành công!')
    }
  }
})

<Button danger onClick={() => onOpen({ itemId: 123, itemName: 'Mục của tôi' })}>
  Xóa Mục
</Button>
```

---

### Modal Form Với Trả Dữ Liệu

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
    onOk(values)  // Trả dữ liệu form về component cha
    onClose()
    form.resetFields()
  }
  
  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose}
      onOk={handleSubmit}
      title={input?.initialData ? 'Chỉnh Sửa Người Dùng' : 'Tạo Người Dùng'}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

// Sử dụng - Tạo người dùng mới
const { onOpen: openCreate } = useDisclosure<FormInput, FormOutput>({
  tag: 'UserForm',
  onOk: (userData) => {
    createUser(userData)
    toast.success('Đã tạo người dùng!')
  }
})

// Sử dụng - Chỉnh sửa người dùng hiện có
const { onOpen: openEdit } = useDisclosure<FormInput, FormOutput>({
  tag: 'UserForm',
  onOk: (userData) => {
    updateUser(userId, userData)
    toast.success('Đã cập nhật người dùng!')
  }
})

<Button onClick={() => openCreate({})}>Tạo Người Dùng</Button>
<Button onClick={() => openEdit({ initialData: existingUser })}>Chỉnh Sửa Người Dùng</Button>
```

---

### Với Ant Design 6

Ví dụ hoàn chỉnh với Ant Design 6:

```tsx
import React from 'react'
import { Modal, Button, Space, Form, Input, message } from 'antd'
import { ReactHookModalProvider, useDisclosure } from '@helloworldqq/react-modal'

// Các Component Modal
const WelcomeModal = () => {
  const { isOpen, onClose, input } = useDisclosure<{ username: string }>({
    tag: 'WelcomeModal'
  })
  
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onClose} title="Chào Mừng!">
      <p>Xin chào, {input?.username}! Chào mừng bạn đến với ứng dụng của chúng tôi.</p>
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
    <Modal open={isOpen} onCancel={onClose} onOk={handleSave} title="Cài Đặt">
      <p>Cấu hình cài đặt của bạn tại đây...</p>
    </Modal>
  )
}

// Đăng ký tất cả modals
const modals = {
  WelcomeModal,
  SettingsModal
}

// Ứng dụng chính
const App = () => {
  const { onOpen: openWelcome } = useDisclosure<{ username: string }>({
    tag: 'WelcomeModal'
  })
  
  const { onOpen: openSettings } = useDisclosure<void, { theme: string }>({
    tag: 'SettingsModal',
    onOk: (settings) => {
      message.success(`Đã đổi theme sang: ${settings?.theme}`)
    }
  })
  
  return (
    <ReactHookModalProvider modals={modals}>
      <Space>
        <Button type="primary" onClick={() => openWelcome({ username: 'Nguyễn Văn A' })}>
          Hiển Thị Chào Mừng
        </Button>
        <Button onClick={openSettings}>
          Mở Cài Đặt
        </Button>
      </Space>
    </ReactHookModalProvider>
  )
}

export default App
```

---

## Tương Thích

| Phiên bản React | Hỗ trợ |
|-----------------|--------|
| 16.8+           | ✅     |
| 17.x            | ✅     |
| 18.x            | ✅     |
| 19.x            | ✅     |

| Thư viện UI     | Đã test |
|-----------------|---------|
| Ant Design 6    | ✅      |
| Material UI 5+  | ✅      |
| Chakra UI 2+    | ✅      |
| Headless UI     | ✅      |
| Radix UI        | ✅      |
| Modal tự viết   | ✅      |

---

## Dependencies

- `@tanstack/react-store` - Để quản lý state

---

## Giấy Phép

MIT © [vnquang24](https://github.com/vnquang24)
