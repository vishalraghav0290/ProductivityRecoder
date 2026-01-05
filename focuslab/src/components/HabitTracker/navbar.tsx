import React from 'react';
import focus from '../../../public/focus.png';
import { Link } from 'react-router-dom';

type Props = {
    userName?: string;
    userRole?: string;
    avatarUrl?: string;
    showNotification?: boolean;
    onNotificationClick?: () => void;
    onLogout?: () => void;
};

const Navbar: React.FC<Props> = ({
    userName = 'Vishal Raghav',
    userRole = 'Pro Member',
    avatarUrl,
    showNotification = true,
    onNotificationClick,
    onLogout
}) => {
    const handleLogout = () => {
        if (onLogout) return onLogout();
        try {
            localStorage.removeItem('focuslab_current_user');
        } catch (e) {
            // ignore
        }
        window.location.href = '/';
    };

    return (
        <div className="w-full px-6 py-4 bg-white shadow-sm flex items-center justify-between rounded-2xl">
            <div className="flex items-center gap-4">
                {/* breadcrumb */}
                <nav className="text-sm text-gray-500 flex items-center gap-2 select-none">
                    <img src={focus} alt="Focus Labs" className="h-8 w-auto" />
                    <div className="font-Audiowide font-900 text-2xl">Focus Labs</div>
                </nav>
            </div>

            <div className="flex items-center gap-4">
                {showNotification && (
                    <button
                        onClick={onNotificationClick}
                        aria-label="Notifications"
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a4 4 0 00-4 4v2.586l-.707.707A1 1 0 005 11h10a1 1 0 00.707-1.707L15 8.586V6a4 4 0 00-4-4z" />
                            <path d="M7 13a3 3 0 006 0H7z" />
                        </svg>
                    </button>
                )}

                <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right leading-tight">
                        <div className="text-sm font-medium text-gray-800">{userName}</div>
                        <div className="text-xs text-gray-500">{userRole}</div>
                    </div>

                    {/* Use Link so navigation works without hooks and is accessible */}
                    <Link to="/profile" aria-label="Open profile" className="relative">
                        <img
                            src={avatarUrl ?? 'https://avatars.githubusercontent.com/u/1?v=4'}
                            alt={userName}
                            className="w-10 h-10 rounded-full ring-2 ring-green-400 object-cover"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                    </Link>

                    <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">Log out</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;