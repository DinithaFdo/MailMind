"use client";

import React from "react";
import MailSectionNavBar from "./MailSectionNavBar";
import UserDetailsPopupForm from "@/components/shared/dashboard/reusable/UserDetailsPopupForm"; 

export default function MailSection() {
  return (
    <div>
      <UserDetailsPopupForm /> 
      <MailSectionNavBar />
    </div>
  );
}
