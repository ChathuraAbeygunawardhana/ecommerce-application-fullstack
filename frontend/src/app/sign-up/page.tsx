"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { AuthForm } from "@/components/organisms/AuthForm";
import { useSignUp } from "@/lib/hooks/useAuth";
import type { AuthResponse } from "@/lib/services/authService";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const signUpMutation = useSignUp();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        signUpMutation.mutate(
            { name, email, password },
            {
                onSuccess: (data: AuthResponse) => {
                    setSuccess("Account created successfully! You can now sign in.");
                    console.log("Sign up success:", data);
                    setName("");
                    setEmail("");
                    setPassword("");
                },
                onError: (err: Error) => {
                    setError(err.message);
                }
            }
        );
    };

    const formFields = [
        {
            label: "Full Name",
            type: "text",
            value: name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
            placeholder: "John Doe"
        },
        {
            label: "Email",
            type: "email",
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
            placeholder: "you@example.com"
        },
        {
            label: "Password",
            type: "password",
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
            placeholder: "••••••••"
        }
    ];

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Sign up to get started"
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkHref="/sign-in"
        >
            <AuthForm
                fields={formFields}
                onSubmit={handleSubmit}
                submitLabel="Sign Up"
                error={error}
                success={success}
            />
        </AuthLayout>
    );
}
