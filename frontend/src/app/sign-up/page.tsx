"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { AuthForm } from "@/components/organisms/AuthForm";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8000/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to sign up");
            }

            const data = await response.json();
            setSuccess("Account created successfully! You can now sign in.");
            console.log("Sign up success:", data);
            
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError((err as Error).message);
        }
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
