import { Suspense } from "react";
import { LoginForm } from "./login-form";

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;
  return <LoginForm justRegistered={registered === "1"} />;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  return (
    <Suspense fallback={<LoginForm justRegistered={false} />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
