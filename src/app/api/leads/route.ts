import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email) || email.length > 320) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // 1. Store in Database
    let leadId = Math.floor(Math.random() * 10000);
    try {
      const [lead] = await db
        .insert(leads)
        .values({
          name,
          email,
          phone: phone || null,
          service: service || null,
          message: message ? `Budget: ${budget}\nMessage: ${message}` : `Budget: ${budget}`,
        })
        .returning({ id: leads.id });

      if (lead?.id) leadId = lead.id;
    } catch {
      // Ignore DB errors if DB is unconfigured
    }

    // 2. Email Dispatch via Formspree/Webhook directly to manick1323@gmail.com
    try {
      await fetch("https://formspree.io/f/mqakdqor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _to: "manick1323@gmail.com",
          _subject: `New Lead from ManickVerse: ${name}`,
          name,
          email,
          phone: phone || "Not provided",
          service: service || "General Inquiry",
          budget: budget || "Not specified",
          message: message || "No custom message",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silently continue if external webhook is slow
    }

    return NextResponse.json({ success: true, id: leadId }, { status: 201 });
  } catch (error) {
    console.error("Failed to save lead", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or WhatsApp us directly." },
      { status: 500 },
    );
  }
}
