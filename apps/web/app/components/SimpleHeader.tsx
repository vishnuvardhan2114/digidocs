"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserButton from "./UserButton";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SimpleHeader = () => {
    const navItems = [
        {
            name: "Services",
            link: "/services",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Blog",
            link: "/blog",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const handleMobileMenuToggle = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const handleCloseMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleNavigateToLogin = useCallback(() => {
        router.push("/sign-in");
    }, [router]);

    const handleMobileLoginClick = useCallback(() => {
        handleCloseMobileMenu();
        handleNavigateToLogin();
    }, [handleCloseMobileMenu, handleNavigateToLogin]);

    return (
        <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/assets/logo/digidocs.png"
                            alt="DigiDocs"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="text-gray-700 hover:text-[#222222] font-normal text-base transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleNavigateToLogin}
                                    className="text-gray-700 hover:text-[#222222] font-normal text-base transition-colors"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={handleMobileMenuToggle}
                        className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    onClick={handleCloseMobileMenu}
                                    className="text-gray-700 hover:text-[#222222] font-normal text-base transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-4">
                                    <UserButton />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleMobileLoginClick}
                                        className="w-full text-gray-700 hover:text-[#222222] font-normal text-base py-2 transition-colors"
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default SimpleHeader;
