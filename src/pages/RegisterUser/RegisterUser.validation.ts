import { z } from "zod";

export const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    cpf: z.string().nonempty("CPF é obrigatório"),
    phone: z.string().optional(),
    address: z.string().optional(),
  });

  export type UserFormInputs = z.infer<typeof schema>;