"use server";

import { signIn, signOut } from "@/auth";
import { RegisterUserUseCase } from "@/application/user/register-user.use-case";
import { PrismaUserRepository } from "@/infrastructure/user/prisma-user.repository";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

// ── Schémas de validation ────────────────────────────────────────────────────

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

// ── Types ────────────────────────────────────────────────────────────────────

export type ActionState = {
  error?: string;
  success?: string;
};

// ── Actions ──────────────────────────────────────────────────────────────────

export async function register(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const repo = new PrismaUserRepository();
    await new RegisterUserUseCase(repo).execute(parsed.data);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Une erreur est survenue" };
  }

  redirect("/login?registered=1");
}

export async function login(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Email ou mot de passe incorrect" };
    }
    throw err; // laisse Next.js gérer le redirect
  }

  return {};
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
