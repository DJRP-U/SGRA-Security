"use client";
import { clearUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default function LogoutPage () {

    clearUserSession();

    redirect("/");

}