export type User = {
  id: number
  name: string
  email: string
  cpf: string
  phone?: string
  address?: string
}

export interface DeleteDialogProps {
  open: boolean
  userToDelete: User | null
  onClose: () => void
  onConfirm: (id: number) => void
}
