import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        password: '',
        agree: false, // Tambahkan properti untuk checkbox
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="full_name" value="Full Name" />

                    <TextInput
                        id="full_name"
                        name="full_name"
                        value={data.full_name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('full_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.full_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Checkbox for "I agree to terms and privacy" */}
                <div className="mt-4">
                    <label htmlFor="agree" className="flex items-center">
                        <input
                            id="agree"
                            type="checkbox"
                            checked={data.agree}
                            onChange={(e) => setData('agree', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            required
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            I agree to the{' '}
                            <Link
                                href="/terms"
                                className="text-indigo-600 underline hover:text-indigo-800"
                                target="_blank"
                            >
                                terms
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="text-indigo-600 underline hover:text-indigo-800"
                                target="_blank"
                            >
                                privacy policy
                            </Link>
                            .
                        </span>
                    </label>

                    <InputError message={errors.agree} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
