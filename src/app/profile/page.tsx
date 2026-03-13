import { auth } from "@/auth";
import ProfileDashboard from "@/components/ProfileDashboard";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return <ProfileDashboard user={session.user} />;
}

