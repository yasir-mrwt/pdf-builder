import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useRouter } from "../utils/router";

const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setTimeout(() => {
      const userData = {
        name: formData.email.split("@")[0],
        email: formData.email,
      };

      login(userData);
      showToast("Logged in successfully!", "success");
      navigate("home");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-500 font-light">
            Login to your account
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-2">{errors.email}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-0 py-4 border-b-2 border-gray-200 focus:border-gray-900 outline-none text-lg transition-colors bg-transparent placeholder:text-gray-400"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-2">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="group w-full px-8 py-5 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 mt-12"
          >
            Login to Account
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <p className="text-center text-gray-600 pt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("signup")}
              className="text-gray-900 font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
