import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export default async function LoginPage() {
  const session = await verifySession();

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary-light">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
