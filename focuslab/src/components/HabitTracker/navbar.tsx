import React from 'react';

type Props = {
    breadcrumb?: string[];
    title?: string;
    userName?: string;
    userRole?: string;
    avatarUrl?: string;
    showNotification?: boolean;
    onNotificationClick?: () => void;
};

const Navbar: React.FC<Props> = ({
    breadcrumb = ['Vishal', 'Monthly Chart'],
    title = 'Monthly Chart',
    userName = 'Vishal Raghav',
    userRole = 'Pro Member',
    avatarUrl,
    showNotification = true,
    onNotificationClick
}) => {
    return (
        <div className="w-full px-6 py-4 bg-white shadow-sm rounded-md flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* breadcrumb */}
                <nav className="text-sm text-gray-500 flex items-center gap-2 select-none">
                    <span className="text-gray-600">{breadcrumb[0]}</span>
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-gray-900">{title}</span>
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

                    <div className="relative">
                        <img
                            src={avatarUrl ?? 'https://avatars.githubusercontent.com/u/1?v=4'}
                            alt={userName}
                            className="w-10 h-10 rounded-full ring-2 ring-green-400 object-cover"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;