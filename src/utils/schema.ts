import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .email("L'email n'est pas valide"),
  password: z.string({ required_error: 'Le mot de passe est requis' }),
});
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .email("L'email n'est pas valide"),
});

export const authRegisterSchema = z
  .object({
    firstName: z.string().nonempty('Le prénom est requis'),
    lastName: z.string().nonempty('Le nom est requis'),
    email: z
      .string()
      .nonempty("L'email est requis")
      .email("L'email n'est pas valide"),

    password: z
      .string()
      .min(7, 'Le mot de passe doit contenir au moins 7 caractères')
      .max(34, 'Le mot de passe ne peut pas dépasser 34 caractères')
      .nonempty('Le mot de passe est requis'),

    confirmPassword: z
      .string()
      .nonempty('La confirmation du mot de passe est requise'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(7, 'Le mot de passe doit contenir au moins 7 caractères')
      .max(34, 'Le mot de passe ne peut pas dépasser 34 caractères')
      .nonempty('Le mot de passe est requis'),

    confirmPassword: z
      .string()
      .nonempty('La confirmation du mot de passe est requise'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const AddDrinkDTOSchema = z.object({
  userId: z.string().describe("Identifiant de l'utilisateur"),
  drinkTypeSlug: z
    .string()
    .refine(
      (val) => val !== 'Select your drink',
      'Veuillez sélectionner un type de boisson'
    )
    .describe('Slug du type de boisson'),
  litersConsumed: z
    .number()
    .min(0.1, 'La quantité consommée ne peut pas être négative')
    .describe('Quantité consommée en litres'),
  drinkDate: z.date({
    required_error: 'A date of birth is required.',
  }),
  customType: z
    .string()
    .optional()
    .nullable()
    .describe('Type de boisson personnalisé (si applicable)'),
});
