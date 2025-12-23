
//সেটা জাভাস্ক্রিপ্টে একটি cookie configuration object

export const cookieOptions = {
    httpOnly: true,
    // For cross-domain cookies (frontend on GoDaddy, backend on Render), use secure=true and sameSite=None
    secure: true,  // Must be true for sameSite=None to work
    sameSite: "None",  // Required for cross-domain cookies
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: '/'  // Make cookie available for all routes
}
