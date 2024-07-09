import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and manage your budget with ease.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
