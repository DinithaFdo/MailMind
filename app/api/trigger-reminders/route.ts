import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reminder from "@/server/models/Reminder";
import UserDetails from "@/server/models/UserDetails";
import { sendWhatsappReminder } from "@/lib/sendWhatsappReminder";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];

    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes();

    const allowedTimes = [
      `${currentHour}:${(currentMinute - 1).toString().padStart(2, "0")}`,
      `${currentHour}:${currentMinute.toString().padStart(2, "0")}`,
      `${currentHour}:${(currentMinute + 1).toString().padStart(2, "0")}`,
    ];

    console.log("⏰ Time now:", now.toISOString());
    console.log("🔍 Checking reminders for:", currentDate, allowedTimes);

    const dueReminders = await Reminder.find({
      date: currentDate,
      time: { $in: allowedTimes },
      isCompleted: false,
    });

    console.log("🔍 Found reminders to process:", dueReminders.length);

    for (const reminder of dueReminders) {
      const userDetails = await UserDetails.findOne({ clerkUserId: reminder.clerkUserId });
      console.log("🔍 Reminder:", reminder.title, "User:", userDetails?.whatsappNumber);

      if (
        userDetails?.allowWhatsappAlerts &&
        userDetails?.whatsappNumber?.trim()
      ) {
        // ✅ Delay WhatsApp message by 50 seconds
        setTimeout(async () => {
          const result = await sendWhatsappReminder({
            phoneNumber: userDetails.whatsappNumber.replace("+", ""),
            templateName: "reminder_alert",
            variables: [
              reminder.title,
              reminder.description,
              `${reminder.date} ${reminder.time}`
            ]
          });

          console.log("📨 WhatsApp Send Result:", result);
        }, 50000); // 50,000ms = 50 seconds
      }


      reminder.isCompleted = true;
      await reminder.save();
    }

    return NextResponse.json({ success: true, count: dueReminders.length });
  } catch (err) {
    console.error("❌ Trigger Error:", err);
    return NextResponse.json({ message: "Error triggering reminders" }, { status: 500 });
  }
}
