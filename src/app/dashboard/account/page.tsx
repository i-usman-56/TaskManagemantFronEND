import { redirect } from "next/navigation";

export default function AccountPage() {
  // Redirect to account-info as the default page
  redirect("/dashboard/account/account-info");
}
