import { z } from "zod";

const isValidCPF = (cpf?: string) => {
    return !cpf || /^\d{11}$/.test(cpf);
};

const isValidPhone = (phone?: string) => {
    return !phone || /^\d{10,11}$/.test(phone);
};

export const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    cpf: z.string()
        .min(1, "CPF é obrigatório")
        .refine(isValidCPF, "CPF deve ter exatamente 11 dígitos"),
    phone: z.string()
        .optional()
        .refine(isValidPhone, "Telefone deve ter entre 10 e 11 dígitos"),
    address: z.string().optional(),
});

export type UserFormInputs = z.infer<typeof schema>;