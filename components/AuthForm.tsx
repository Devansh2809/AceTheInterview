"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
};

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                toast.success("Account created successfully. Please sign in.");

                router.push("/sign-in");
            }
            else
            {
                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    };
    const isSignIn=type==="sign-in";
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="Logo" height={32} width={38} />
                    <h2 className="text-primary-100">AceTheInterview</h2>
                </div>

                <h3>Practice job interviews with AI</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {!isSignIn && (
                        <FormField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Your Name"
                            type="text"
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Email address"
                        type="email"
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Your Secure Pssword"
                        type="password"
                    />
                    <Button className="btn" type="submit">{isSignIn?'Ace It':'Create an Account'}</Button>
                </form>
            </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
        </div>
        </div>
    )
}
export default AuthForm
