"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { AuthForm } from "@/components/organisms/AuthForm";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        try {
            const response = await fetch("http://localhost:8000/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to sign in");
            }

            const data = await response.json();
            setSuccess("Signed in successfully!");
            console.log("Sign in success:", data);
            
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/");
        } catch (err) {
            setError((err as Error).message);
        }
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
