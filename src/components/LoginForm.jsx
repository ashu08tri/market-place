"use client"
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import BeatLoader from "react-spinners/BeatLoader";

function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('User Logged in Successfully!');
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
      router.push('/');
    } catch (err) {
      setLoading(false);
      toast.error(`Login Failed: ${err.message}`);
    }
  };

  return (
    <>
      <Toaster closeButton position="bottom-right" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col w-[50vh] md:w-[30vw]">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="uppercase text-sm tracking-wider px-16 py-3 bg-black text-white hover:bg-white border border-black hover:text-black"
            disabled={loading}
          >
            {loading ? <BeatLoader loading={loading} size={10} color='white'
              aria-label="Loading Spinner"
              data-testid="loader" /> : 'Login'}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
