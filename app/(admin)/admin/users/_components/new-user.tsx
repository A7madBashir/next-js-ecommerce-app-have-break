"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type initialState = {
  isAdmin: string;
  password: string;
  userName: string;
};

const NewUser = () => {
  const router = useRouter();
  const paramas = useParams();
  const categoryId = paramas.userId as string;

  const checkDisabled = categoryId ? true : false;
  const initialState: initialState = {
    isAdmin: "User",
    password: "",
    userName: "",
  };

  const [formData, setFormData] = useState<initialState>(initialState);
  const [errors, setErrors] = useState<initialState>({
    isAdmin: "",
    password: "",
    userName: "",
  });

  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/clerk/users/${categoryId}`);
      const mergedData = {
        isAdmin: data.user.unsafeMetadata.isAdmin ? "Admin" : "User",
        password: "",
        userName: data.user.username ? data.user.username : data.user.firstName,
      };
      setFormData(mergedData);
      return data;
    },
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    setErrors({
      isAdmin: "",
      password: "",
      userName: "",
    });

    if (
      !categoryId &&

        !passwordRegex.test(formData.password)
    ) {
      if (!passwordRegex.test(formData.password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must have, one uppercase letter, one number, and special character.",
        }));
      }
      return;
    }
    try {
      if (categoryId) {
        const res = await axios.put(`/api/clerk/users/${categoryId}`, formData);
        toast.success("User succesfully edited.");
        router.push("/admin/users");
      } else {
        const res = await axios.post(`/api/clerk/users/`, formData);
        toast.success("Created user.");
        router.push("/admin/users");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="flex gap-10 max-md:flex-col">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="username" className="font-semibold">
              User Name
            </label>
            <Input
              disabled={checkDisabled}
              value={formData.userName}
              minLength={3}
              type="text"
              name="username"
              id="username"
              size={40}
              required
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <Input
              disabled={checkDisabled}
              value={categoryId ? "*********" : formData.password}
              type="password"
              name="password"
              size={40}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <label htmlFor="role" className="font-semibold">
              Role
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-md:w-full"
              name="role"
              id="role"
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.value })
              }
              value={formData.isAdmin}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 px-7 bg-green-600"
          variant="default"
        >
          {categoryId ? "Edit" : "Create"}
        </Button>
        <Link
          className="mt-4 px-5 py-3 rounded mx-3 text-red-600 border border-red-600"
          href={"/admin/users"}
        >
          Cancel
        </Link>
      </form>
    </>
  );
};

export default NewUser;
