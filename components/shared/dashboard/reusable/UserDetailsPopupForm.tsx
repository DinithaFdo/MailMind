"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface UserDetailsForm {
  name: string;
  occupation: string;
  allowBrowserAlerts: boolean;
  allowWhatsappAlerts: boolean;
  whatsappNumber: string;
  allowTextAlerts: boolean;
  phoneNumber: string;
}

const UserDetailsPopupForm: React.FC = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UserDetailsForm>({
    name: "",
    occupation: "",
    allowBrowserAlerts: false,
    allowWhatsappAlerts: false,
    whatsappNumber: "",
    allowTextAlerts: false,
    phoneNumber: "",
  });

  useEffect(() => {
    const checkDetails = async () => {
      if (!user) return;
      const res = await fetch(`/api/user-details/${user.id}`);
      if (res.status === 404) {
        setOpen(true);
      }
    };
    checkDetails();
  }, [user]);

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, clerkUserId: user?.id };
      await axios.post("/api/user-details", payload);
      setOpen(false);
    } catch (err) {
      console.error("Error saving user details", err);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" className="col-span-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="occupation" className="text-right">Occupation</Label>
            <Input id="occupation" className="col-span-3" value={formData.occupation} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Receive Browser Alerts</Label>
            <Switch checked={formData.allowBrowserAlerts} onCheckedChange={(val) => setFormData({ ...formData, allowBrowserAlerts: val })} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Receive WhatsApp Alerts</Label>
            <Switch checked={formData.allowWhatsappAlerts} onCheckedChange={(val) => setFormData({ ...formData, allowWhatsappAlerts: val })} />
          </div>

          <Input
            placeholder="WhatsApp Number"
            disabled={!formData.allowWhatsappAlerts}
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
          />

          <div className="flex items-center justify-between">
            <Label>Receive Text Message Alerts</Label>
            <Switch checked={formData.allowTextAlerts} onCheckedChange={(val) => setFormData({ ...formData, allowTextAlerts: val })} />
          </div>

          <Input
            placeholder="Phone Number"
            disabled={!formData.allowTextAlerts}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>

        <Button className="w-full bg-indigo-500 mt-4" onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsPopupForm;