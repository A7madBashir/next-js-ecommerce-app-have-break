import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";
import signIntoFirebaseWithClerk from "@/lib/firebase-auth";

export async function POST(request: NextRequest) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Process the webhook data here
  console.log("Webhook received:", body);

  auth()
    .getToken({ template: "integration_firebase" })
    .then((token) => signIntoFirebaseWithClerk(token!));

  return NextResponse.json(
    { message: "User to firebase auth processed successfully" },
    { status: 200 }
  );
}
