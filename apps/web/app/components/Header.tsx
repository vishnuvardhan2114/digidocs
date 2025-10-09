"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@ui/components/ui/resizable-navbar";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserButton from "./UserButton";
import { ArrowUpRight } from "lucide-react";

const Header = () => {
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

    // Memoized handlers
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

    const handleGetStartedClick = useCallback(() => {
        handleCloseMobileMenu();
        // TODO: Add navigation route when available
    }, [handleCloseMobileMenu]);
    return (
        <div className="fixed top-4 left-0 right-0 w-full max-w-7xl mx-auto z-50 px-4">
            <Navbar className="">
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <UserButton />
                                <NavbarButton
                                    className="rounded-full flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md transition-colors"
                                    variant="primary"
                                    onClick={handleGetStartedClick}
                                >
                                    Get Started <ArrowUpRight className="w-4 h-4" />
                                </NavbarButton>
                            </>
                        ) : (
                            <>
                                <NavbarButton variant="secondary" onClick={handleNavigateToLogin} className="rounded-full">
                                    Login
                                </NavbarButton>
                                <NavbarButton variant="primary" onClick={handleGetStartedClick} className="rounded-full">
                                    Get Started
                                </NavbarButton>
                            </>
                        )}
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={handleMobileMenuToggle}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={handleCloseMobileMenu}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={handleCloseMobileMenu}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        {isAuthenticated ? (
                            <div className="flex w-full justify-center pt-4">
                                <UserButton />
                                <NavbarButton
                                    onClick={handleGetStartedClick}
                                    variant="primary"
                                    className="w-full rounded-full"
                                >
                                    Get Started
                                </NavbarButton>
                            </div>
                        ) : (
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    onClick={handleMobileLoginClick}
                                    variant="primary"
                                    className="w-full rounded-full"
                                >
                                    Login
                                </NavbarButton>
                                <NavbarButton
                                    onClick={handleGetStartedClick}
                                    variant="primary"
                                    className="w-full rounded-full"
                                >
                                    Get Started
                                </NavbarButton>
                            </div>
                        )}
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
};

export default Header;