"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { AuthForm } from "@/components/organisms/AuthForm";
import { useSignIn } from "@/lib/hooks/useAuth";
import type { AuthResponse } from "@/lib/services/authService";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const signInMutation = useSignIn();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        signInMutation.mutate(
            { email, password },
            {
                onSuccess: (data: AuthResponse) => {
                    setSuccess("Signed in successfully!");
                    console.log("Sign in success:", data);
                    router.push("/");
                },
                onError: (err: Error) => {
                    setError(err.message);
                }
            }
        );
    };

    const formFields = [
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
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
            footerText="Don't have an account?"
            footerLinkText="Sign up"
            footerLinkHref="/sign-up"
        >
            <AuthForm
                fields={formFields}
                onSubmit={handleSubmit}
                submitLabel="Sign In"
                error={error}
                success={success}
            />
        </AuthLayout>
    );
}
